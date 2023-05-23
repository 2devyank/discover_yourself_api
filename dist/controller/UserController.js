"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateuser = exports.getuser = exports.loginuser = exports.registeruser = exports.SECRET_Key = void 0;
const Database_js_1 = require("../Database.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET_Key = 'devyanknagpal';
const registeruser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404);
            throw new Error("All fields are mendatory");
        }
        const hashpassword = await bcrypt_1.default.hash(password, 10);
        const result = await Database_js_1.pool.query("INSERT INTO PROFILE (email,password) VALUES($1,$2)", [email, hashpassword]);
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
};
exports.registeruser = registeruser;
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(404);
            throw new Error("email & password are amdatory");
        }
        const user = await Database_js_1.pool.query("SELECT * FROM PROFILE WHERE email=$1 ", [email]);
        if (user && (await bcrypt_1.default.compare(password, user.rows[0].password))) {
            const accessToken = jsonwebtoken_1.default.sign({
                user: {
                    username: user.rows[0].name,
                    email: user.rows[0].email,
                    id: user.rows[0].id
                }
            }, exports.SECRET_Key, { expiresIn: '1h' });
            res.status(200).json({ accessToken });
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.loginuser = loginuser;
const getuser = async (req, res) => {
    try {
        const { id } = res.locals.JwtPayload.user;
        console.log(id);
        const ret = await Database_js_1.pool.query('select * from profile where id=$1', [id]);
        res.json(ret.rows[0]);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getuser = getuser;
const updateuser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, skills, portfoilo, expertise, about, available } = req.body;
        const ret = await Database_js_1.pool.query('update profile set name=$1,email=$2,skills=$3,portfoilo=$4,expertise=$5,about=$6 available=$7 where id=$8', [name, email, skills, portfoilo, expertise, about, available, id]);
        res.json(ret.rows);
    }
    catch (error) {
        console.log(error);
    }
};
exports.updateuser = updateuser;
