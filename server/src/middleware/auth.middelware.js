import JsonWebToken, { decode } from "jsonwebtoken";
import blacklistTokenModel from "../model/blacklistToken.model.js";
import config from "../config/config.js";

export async function authUser(req, res, next) {
    const accesstoken = req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];

    if (!accesstoken) {
        return res.status(401).json({
            success: false,
            message: "UnAuthorised  Access token not found"
        });
    }

    //Adding blacklist check
    const isBlacklist = await blacklistTokenModel.findOne({ accesstoken });
    if (isBlacklist) {
        return res.status(401).json({
            message: "Token is invalid , please login again"
        });
    }

    try {
        const decoded = JsonWebToken.verify(accesstoken, config.JWT_SECRET);
        const validRoles = ["user", "admin"];

        // console.log("Decoded Token:", decoded);

        if (!validRoles.includes(decoded.role)) {
            return res.status(403).json({
                message: "Unauthorised role"
            })
        }
        req.user = decoded;
        next();

    } catch (error) {
        console.error("Error occoure  in auth middelware ", error);
        return res.status(401).json({
            message: "Unauthorised user middelware error"
        });
    }
}

export async function authAdmin(req, res, next) {
    try {
        const accesstoken = req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];
        if (!accesstoken) {
            return res.status(401).json({
                message: "Unauthorised admin"
            });
        }

        const isBlacklist = await blacklistTokenModel.findOne({ accesstoken });
        if (isBlacklist) {
            return res.status(401).json({ message: "Token invalid, please login again " });
        }

        const decoded = JsonWebToken.verify(accesstoken, config.JWT_SECRET)
        if (decoded.role !== "admin") {
            return res.status(403).json({
                message: "Access denied .Admin only "
            });
        }

        req.user = decoded;
        next();

    } catch (error) {
        console.error("token is invalid for admin please login", error)
        return res.status(401).json({ message: "Invalid token" });
    }
}