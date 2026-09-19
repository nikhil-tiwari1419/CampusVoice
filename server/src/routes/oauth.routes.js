import express from 'express';
import passport from '../config/passport.js'; // make sure passport is initialized
const router = express.Router();
import { googleCallback, getProfile, logOut } from '../controller/oauth.controller.js';
import { verifyToken } from '../middleware/auth.middelware.js';
import config from '../config/config.js';

router.get("/google", passport.authenticate("google", { scope: ['profile', 'email'], session: false }));

router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.CLIENT_URL}/login`,
}),
    googleCallback
);

router.get("/profile", verifyToken, getProfile);

router.get("/logout", verifyToken, logOut);

export default router;

