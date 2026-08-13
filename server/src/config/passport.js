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
                let existingUser = await userModel.findOne({
                    email: profile.emails[0].value,
                });

                if (!existingUser) {
                    existingUser = await userModel.create({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        isVerified: true,
                        provider: 'google',
                    });
                }

                return done(null, existingUser);
            } catch (err) {
                console.log("Error creating user via Google OAuth:", err);
                return done(err, null);
            }
        }
    )
);

export default passport;