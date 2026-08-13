import config from '../config/config.js';
import { generateAccesToken, generateRefreshToken } from '../utils/token.js';
import refreshTokenModel from '../model/refreshToken.model.js';
import { get } from 'mongoose';

const isProduction = config.NODE_ENV === "production";
export const googleCallback = async (req, res) => {
    try {
        // refresh old token 
        await refreshTokenModel.deleteMany({ userId: req.user._id });

        const accesstoken = generateAccesToken(req.user);
        const refreshToekn = await generateRefreshToken(req.user._id);

        res.cookie('accesstoken', accesstoken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', refreshToekn, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.redirect(`${config.CLIENT_URL}/oauth-success`);

    } catch (error) {
        console.error("Error in googleCallback:", err);
        res.redirect(`${config.CLIENT_URL}/login?error=server_error`);
    }
};

export const getProfile = (req, res) => {
    res.json({ user: req.user });
};

export const logOut = async (req, res) => {
    try {
        const refreshToekn = req.cookies?.refreshToekn;
        if (!refreshToekn) {
            await refreshTokenModel.deleteOne({ accesstoken: refreshToekn });
        }

        res.clearCookie('accesstoken');
        res.clearCookie('refreshToken');
        res.jaon({ mesage: "Loggout out succesfullu " });
    } catch (error) {
        console.error("Error in logout:", err);
        res.status(500).json({ message: "Logout failed" });
    }
};

export default { googleCallback, logOut, getProfile }

