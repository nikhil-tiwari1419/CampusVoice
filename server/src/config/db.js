import mongoose from "mongoose";
import config from './config.js'

async function connectDB() {
    try{
        await mongoose.connect(config.MONGO_URI, {
            dbName: "oathUsers",
        });
        console.log("Connected to MongoDB");    
    }catch(err){
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    }
}
export default connectDB;