import mongoose from "mongoose";

const blackListingSchema = new mongoose.Schema({
    accesstoken: {
        type: String,
        required: true,
        unique: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        expires:'15m'
    }
});

export default mongoose.model('BlacklistToken', blackListingSchema);

