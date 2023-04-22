import jwt from "jsonwebtoken";
import { SECRET_Key } from "../controller/UserController.js";
const validateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401);
            throw new Error();
        }
        const decoded = jwt.verify(token, SECRET_Key);
        console.log(decoded);
        req.token = decoded;
        console.log(req);
        next();
    }
    catch (error) {
        console.log(error);
    }
};
export { validateUser };
