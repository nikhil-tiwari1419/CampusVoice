import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
    accesstoken: {
        type: String,
        required:true,
        unique:true
    },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    },

}, { timestamps: true });


refreshTokenSchema.index({ expiresAt: 1}, {expireAfterSeconds:0});

refreshTokenSchema.index({ userId:1});

export default  mongoose.model("RefreshToken",refreshTokenSchema);


 