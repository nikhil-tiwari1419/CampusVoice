import JsonWebTokenError, { decode } from "jsonwebtoken";
import bcrypt from "bcryptjs"
import blacklistToken from '../model/blacklistToken.model.js'
import refreshTokenModel from "../model/refreshToken.model.js";
import userModel from "../model/user.model.js";
import config from "../config/config.js";
import otpModel from "../model/otp.model.js";
import { sendWelcomeEmail, sendOTPEmail, sendPasswordResetEmail } from "../utils/mailer.js"
import { generateAccesToken, generateRefreshToken } from "../utils/token.js";


// generate otp 6 digit OTP 
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
const isProduction = process.env.NODE_ENV === 'production';

//resigestrUser
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const isUserAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        });

        if (isUserAlreadyExist) {
            return res.status(409).json({
                success: false,
                message: "Username or email Already exist"
            });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hash,
            role: "user",
            isVerified: false
        });

        // send welcome + verify OTP
        const otp = generateOTP();
        // OTP db se ayega
        await otpModel.create({ email, otp, purpose: 'verify' });

        sendWelcomeEmail(email, username).catch(err => console.log('welcome email failed:', err));
        sendOTPEmail(email, otp).catch(err => console.log('OTP email Failed:', err));

        return res.status(201).json({
            success: true,
            message: "Regesterd! please verify Your  email with OTP sent ",
        });

        const accesstoken = JsonWebTokenError.sign({
            id: user._id,
            role: user.role,
        }, config.JWT_SECRET, { expiresIn: "15m" })

        res.cookie('accesstoken', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000
        })

        return res.status(201).json({
            message: "User regestered succesfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        })

    } catch (error) {
        console.error("Register error", error);
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error occure in reistering the user"
        })
    }
}

// verify function
async function verifyEmail(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                message: "Email and OTP are required"
            });
        }

        const otpRecord = await otpModel.findOne({
            email,
            otp,
            purpose: 'verify',
            expiresAt: {
                $gt: new Date()
            }
        });

        if (!otpRecord) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }

        await userModel.findOneAndUpdate({ email }, { isVerified: true });
        await otpModel.deleteMany({ email, purpose: 'verify' });

        res.status(200).json({
            success: true,
            message: "Email is verified succesFully ! now you can login "
        });

    } catch (error) {
        console.error("Verifyed error", error);
        res.status(500).json({
            message: "Email is nott verifyed "
        });
    }
}

// login function
async function login(req, res) {

    try {
        const { username, email, password } = req.body;
        if (!password || (!username && !email)) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }
        const user = await userModel.findOne({
            $or: [
                ...(username ? [{ username }] : []),
                ...(email ? [{ email }] : [])
            ]
        }).select('+password')

        if (!user) {
            return res.status(401).json({
                message: " Inavlid creadintial , user not found with this username or email"
            });

        }

        const isPassowrdValid = await bcrypt.compare(password, user.password)

        if (!isPassowrdValid) {
            return res.status(401).json({
                message: "Invalid creadintial"
            })
        }
        //is email  verifyed
        if (!user.isVerified) {
            //Resend otp 
            const otp = generateOTP();
            await otpModel.deleteMany({ email: user.email, purpose: "verify" });
            await otpModel.create({ email: user.email, otp, purpose: "verify" });

            sendOTPEmail(user.email, otp, "verify").catch(err => console.error(err));

            return res.status(403).json({
                message: "Email not verified. New OTP sent to your emil."
            });
        }

        //token reating system
        await refreshTokenModel.deleteMany({ userId: user._id });

        const accesstoken = generateAccesToken(user);
        const refreshToken = await generateRefreshToken(user._id)

        //Access token 15 min

        res.cookie('accesstoken', accesstoken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000
        });

        //Refresh token in 7 days
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // background Login email notification 
        // sendLoginEmail(user.email, user.username).catch(err => console.error(err));


        return res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });


    } catch (error) {
        console.error("Error in login ", error)
        res.status(500).json({
            message: "Login function server error"
        });
    }
}

//Refresh token - new token [access token generate]
async function refreshAccessToken(req, res) {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token present , please login" })
        }

        //DB mein check karo
        const storedToken = await refreshTokenModel.findOne({ accesstoken: refreshToken });

        if (!storedToken) {
            //clear bad cookies 
            res.clearCookie('refreshToken');
            return res.status(401).json({
                message: "Invalid refresh token , please login again"
            });
        }

        if (storedToken.expiresAt < new Date()) {
            await refreshTokenModel.deleteOne({ accesstoken: refreshToken });
            res.clearCookie('accesstoken');
            res.clearCookie('refreshToekn');
            return res.status(401).json({ message: "Refresh token expired , please login again " });
        }

        //fetch full user to get role this help when user come to login 
        const user = await userModel.findById(storedToken.userId).select('_id username email role');
        if (!user) {
            await refreshTokenModel.deleteOne({ token: refreshToken });
            res.clearCookie('accesstoken');
            res.clearCookie('refreshToken');
            return res.status(401).json({
                message: "User not found please login again "
            });
        }

        // now role is include to new token 
        await refreshTokenModel.deleteOne({ token: refreshToken });
        const newRefreshToken = await generateRefreshToken(user._id);
        const newAccessToken = generateAccesToken(user);

        res.cookie('accesstoken', newAccessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 15 * 60 * 1000
        });

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: "token refeshed successed"
        });


    } catch (error) {
        console.error("Server errro in refresh toekn part", error)
        res.status(500).json({
            message: "Server errorin refresh toeken function"
        });
    }
}

//logout
async function logOut(req, res) {
    try {
        const accesstoken = req.cookies?.accesstoken || req.headers.authorization?.split(" ")[1];
        const refreshToken = req.cookies?.refreshToken;

        if (!accesstoken) {
            return res.status(400).json({
                message: "No token found"
            });
        }

        //BlacklistToken
        await blacklistToken.findOneAndUpdate(
            { accesstoken },
            { accesstoken },
            { upsert: true, returnDocument: 'after' },
        );

        //Refresh token DB se delete kkaro
        if (refreshToken) {
            await refreshTokenModel.deleteOne({ accesstoken: refreshToken });
        }

        //dono cookies clear 
        res.clearCookie('accesstoken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        });

        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        })

        res.status(200).json({
            message: 'User logout successfully'
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'logout failed', error: error.message
        });
    }
}

//forgot password 
async function forgotPassword(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).json({
                message: "If that email exist, an OTP has been sent"
            })
        };

        const otp = generateOTP();
        await otpModel.deleteMany({ email, purpose: 'forgot' });
        await otpModel.create({ email, otp, purpose: 'forgot' });

        res.status(200).json({ message: "otp sent to your email" });

        sendOTPEmail(email, otp, 'forgot').catch(err => console.error('Otp email failed:', err));

    } catch (error) {
        console.error("Otp function failed", error)
        res.status(500).json({ message: "Server error" });
    }
}

// RESET PASSWORD
async function resetPassword(req, res) {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const otpRecord = await otpModel.findOne({
            email,
            otp,
            purpose: 'forgot',
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hash = await bcrypt.hash(newPassword, 10);

        const user = await userModel.findOneAndUpdate(
            { email },
            { password: hash },
            { new: false }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await otpModel.deleteMany({ email, purpose: 'forgot' });

        res.status(200).json({ message: "Password reset successfully!" });
        sendPasswordResetEmail(email, user.username)
            .catch(err => console.error('Password reset email failed:', err));


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

//IsAuth
async function IsAuth(req, res) {
    try {
        const user = await userModel.findById(req.user.id).select('-password');
        console.log(req.user.id);
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        console.error('Auth check error:', error);
        res.status(500).json({ success: false, message: "error hai is-auth api me ya IsAuth controller me " || error.message });
    }
}

export default { registerUser, verifyEmail, login, logOut, IsAuth, resetPassword, forgotPassword,refreshAccessToken }



