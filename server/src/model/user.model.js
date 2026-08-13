import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local',
    },
    password: {
        type: String,
        required: function () {
            return this.provider === 'local';
        },
        select: false
    }

}, { timestamps: true });

const userModel = mongoose.model('user', userSchema)

export default userModel;

