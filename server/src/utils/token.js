import jsonwebToken from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import refreshTokenModel from "../model/refreshToken.model.js";
import config from "../config/config.js";
//Access token - short live 15 min
export function generateAccesToken(user) {

    return jsonwebToken.sign(
        {
            id: user._id,
            role: user.role
        },
        config.JWT_SECRET,
        { expiresIn: "15m" }
    )
}

//Refresh Token - long lived 7 days
export async function generateRefreshToken(userId) {
    const accesstoken = uuidv4();
    // console.log("Generated Refresh Token:", accesstoken);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await refreshTokenModel.create({
        accesstoken,
        userId,
        expiresAt,
    });
    return accesstoken;
}

