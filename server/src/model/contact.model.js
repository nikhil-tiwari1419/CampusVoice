import mongoose from 'mongoose'

const contactSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    subject: {
        type: String,
        default: 'General'
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    status: {
        type: String,
        enum: ['new', 'read', 'resolved'],
        default: 'new'
    }
}, {timestamps: true});

const contactModel = mongoose.model('Contact', contactSchema);
export default contactModel;