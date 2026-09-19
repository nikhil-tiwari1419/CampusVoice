import express from "express";
import morgan from "morgan";
import passport from "./config/passport.js";
import cors from "cors";
import cookieParser from 'cookie-parser'
import config from '../src/config/config.js'

//routes
import googleOauthRoutes from "./routes/oauth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js'
import programRoutes from './routes/program.routes.js'
import adminRoutes from './routes/admin.routes.js'
import SuperadminRoutes from './routes/Superadmin.route.js'
const app = express();

app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/api/oauth', googleOauthRoutes);
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/student', programRoutes)
app.use('/api/admin',adminRoutes)
app.use('/api/superadmin',SuperadminRoutes)

app.get("/", (req, res) => {
  res.send("Hello from server API working");
});

export default app;

