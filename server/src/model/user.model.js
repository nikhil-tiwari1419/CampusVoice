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
        enum: ['student', 'admin', 'super_admin'],
        default: 'student'
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

    // student profile
    isProfileComplete: {
        type: Boolean,
        default: false
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Batch",
    },
    sem: {
        type: Number,
        min:1,
        max:8
    },
    phone: {
        type: Number,
    },

    //admin profile
    managedProgram: {
        type:mongoose.Schema.Types.ObjectId,
        ref : "Program",
        default: null
    },
    managedBranch:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branch",
        default: null
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref :"user",
        default: null
    }

}, { timestamps: true });

userSchema.index(
    { createdAt: 1 },
    { expireAfterSeconds: 300, partialFilterExpression: { isVerified: false } }
)

const userModel = mongoose.model('user', userSchema)
export default userModel;

