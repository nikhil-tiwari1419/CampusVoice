import express from "express";
import morgan from "morgan";
import passport from "./config/passport.js";
import cors from "cors";
import googleOauthRoutes from "./routes/oauth.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import config from "../src/config/config.js";

const app = express();

// Allowed origins list
const allowedOrigins = [
  "http://localhost:5173",
  config.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/oauth", googleOauthRoutes);
app.use("/api/auth", authRoutes);

app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) =>
  res.status(204).end()
);

app.get("/", (req, res) => {
  res.send("Hello from server API working");
});

export default app;