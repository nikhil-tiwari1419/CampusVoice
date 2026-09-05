import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        enum: ['verify', 'forgot', 'login'],
        required: true
    },
    registration: {
        username:{ type: String, trim:true},
        password:{ type: String }
    },
    expiresAt: {
        type: Date, default: () => new Date(Date.now() + 10 * 60 * 1000)
    }// 10 min
}, {timestamps: true });

// Auto delete expired OTPs
otpSchema.index({expiresAt: 1 }, {expireAfterSeconds: 0});

export default mongoose.model('OTP', otpSchema);

