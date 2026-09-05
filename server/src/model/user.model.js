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
    },

    // this is i have added here flag 
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
    },
    sem: {
        type: String,

    },
    phone: {
        type: Number,

    }

}, { timestamps: true });

userSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 600, partialFilterExpression: { isVerified: false } }
)

const userModel = mongoose.model('user', userSchema)

export default userModel;

