import { pool } from "../Database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";
export const SECRET_Key = 'devyanknagpal';
cloudinary.v2.config({
    cloud_name: "deoycapon",
    api_key: "316755458256892",
    api_secret: "DcGs6bxBpnM6pw7UkMjFPXXymps"
});
const registeruser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404);
            throw new Error("All fields are mendatory");
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const result = await pool.query("INSERT INTO PROFILE (email,password) VALUES($1,$2)", [email, hashpassword]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404);
            throw new Error("email & password are amdatory");
        }
        const user = await pool.query("SELECT * FROM PROFILE WHERE email=$1 ", [email]);
        if (user && (await bcrypt.compare(password, user.rows[0].password))) {
            const accessToken = jwt.sign({
                user: {
                    username: user.rows[0].name,
                    email: user.rows[0].email,
                    id: user.rows[0].id
                }
            }, SECRET_Key, { expiresIn: '1h' });
            res.status(200).json({ accessToken });
        }
    }
    catch (error) {
        console.log(error);
    }
};
const getuser = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        console.log(id);
        const ret = await pool.query('select * from profile where id=$1', [id]);
        res.json(ret.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
};
const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, skills, portfoilo, expertise, about } = req.body;
        const ret = await pool.query('update profile set name=$1,email=$2,skills=$3,portfoilo=$4,expertise=$5,about=$6 where id=$7', [name, email, skills, portfoilo, expertise, about, id]);
        res.json(ret.rows);
    }
    catch (error) {
        console.log(error);
    }
};
const uploadimage = async (req, res) => {
    const { img, name, id } = req.body;
    const result = cloudinary.v2.uploader.upload(img);
    result.then((data) => {
        console.log(data);
        console.log(data.secure_url);
        const t = pool.query('update profile set img=$1,name=$2 where id=$3 ', [data.secure_url, name, id]);
        res.json({ message: "updated" });
    }).catch((err) => {
        console.log(err);
    });
};
export { registeruser, loginuser, getuser, uploadimage, updateuser };
