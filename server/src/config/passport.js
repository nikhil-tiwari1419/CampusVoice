import "dotenv/config";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../model/user.model.js';
import config from "./config.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;
                let existingUser = await userModel.findOne({ email });
                //first step ye hai -> if user hi exist nahi karta 
                if (!existingUser) {
                    const generatedUsername = profile.displayName.replace(/\s+/g, '_').toLowerCase();
                    const newUser = await userModel.create({
                        username: generatedUsername,
                        email,
                        isVerified: true,
                        provider: 'google',
                        role: 'student'
                    });

                    return done(null, newUser);
                }
                // user exist karta hai
                if (existingUser.provider === 'local') {
                    return done(null, false, {
                        message: "This email is already  registered with a password. Please login using email and password."
                    })
                }
                // already a google user - login allow karo
                return done(null, existingUser);

            } catch (error) {
                console.log("Error creating user via Google OAuth");
                return done(error, null);
            }
        }
    )
);

export default passport;
