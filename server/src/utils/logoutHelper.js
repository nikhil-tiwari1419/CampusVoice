// utils/logoutHelper.js
import blacklistToken from "../model/blacklistToken.model.js";
import refreshTokenModel from "../model/refreshToken.model.js";
import config from "../config/config.js";

const isProduction = config.NODE_ENV === "production";

export async function performLogout(req, res) {
    const accesstoken = req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];
    const refreshToken = req.cookies?.refreshToken;

    if (!accesstoken) {
        return res.status(400).json({ success: false, message: "No token found" });
    }

    await blacklistToken.findOneAndUpdate(
        { accesstoken },
        { accesstoken },
        { upsert: true, returnDocument: 'after' },
    );

    if (refreshToken) {
        await refreshTokenModel.deleteOne({ accesstoken: refreshToken });
    }

    res.clearCookie('accesstoken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
    });

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
}

