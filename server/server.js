import dotenv from 'dotenv';
import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import config from "./src/config/config.js";

const PORT = 3000;

async function startServer() {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
        })
    } catch (err) {
        console.log("Error starting server:", err);
    }
}
startServer();

