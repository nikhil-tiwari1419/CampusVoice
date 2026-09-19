import config from '../config/config.js';
import { generateAccesToken, generateRefreshToken } from '../utils/token.js';
import refreshTokenModel from '../model/refreshToken.model.js';
import { performLogout } from '../utils/logoutHelper.js';

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
        console.error("Error in googleCallback:", error);
        res.redirect(`${config.CLIENT_URL}/login?error=server_error`);
    }
};

export const getProfile = (req, res) => {
    res.json({ user: req.user });
};

export const logOut = async (req, res) => {
    try {
        return await performLogout(req.res);
    } catch (error) {
        console.error("OAuth logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
};


export default { googleCallback, logOut, getProfile }

