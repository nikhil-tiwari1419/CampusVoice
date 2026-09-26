import config from '../config/config.js';
import { generateAccesToken, generateRefreshToken } from '../utils/token.js';
import refreshTokenModel from '../model/refreshToken.model.js';
import { performLogout } from '../utils/logoutHelper.js';

const isProduction = config.NODE_ENV === "production";
export const googleCallback = async (req, res) => {
    try {

        // console.log("GOOGLE USER:", req.user);
        // console.log("USER ID:", req.user?._id);

        // refresh old token 
        await refreshTokenModel.deleteMany({ userId: req.user._id });
        // console.log("DELETE OLD TOKEN DONE");

        const accesstoken = generateAccesToken(req.user);
        // console.log("ACCESS TOKEN DONE");

        const refreshToekn = await generateRefreshToken(req.user._id);
        // console.log("REFRESH TOKEN DONE");

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

        return res
            .status(302)
            .set("Location", `${config.CLIENT_URL}/oauth-success`)
            .end();

    } catch (error) {
        // console.error("ERROR IN GOOGLE CALLBACK:", error);
        // console.error("ERROR MESSAGE:", error.message);
        // console.error("ERROR STACK:", error.stack);

        console.error("Error in googleCallback:", error);
        return res.status(302)
            .set("Location", `${config.CLIENT_URL}/login?error=server_error`)
            .end();
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

