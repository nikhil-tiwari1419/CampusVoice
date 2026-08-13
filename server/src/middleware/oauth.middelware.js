import jwt from "jsonwebtoken";
import config from "../config/config.js";


const protect = (req, res, next) => {
    const token = req.cookies?.accesstoken; // pahle cookies check akro

    if (!token) {
        const autHeader = req.headers.authorization;
        if (autHeader && autHeader.startWith("Bearer ")) {
            token = autHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no  token" });
    }

    
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json(
            { message: "Invalid or expired token" }
        );
    }
};

export default protect;
