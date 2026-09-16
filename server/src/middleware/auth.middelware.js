import JsonWebToken from "jsonwebtoken";
import blacklistTokenModel from "../model/blacklistToken.model.js";
import config from "../config/config.js";

async function verifyToken(req, res, next) {
    try {
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
        const decoded = JsonWebToken.verify(accesstoken, config.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        console.error("Auth middelware error:", error.message);
        return res.status(401).json({ success: false, message: 'Invalid or expire token' })
    }
}

function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource"
            });
        }
        next();
    };
}

export { verifyToken, authorize }


