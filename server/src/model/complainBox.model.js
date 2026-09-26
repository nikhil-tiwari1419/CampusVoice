import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Batch',
        required: true
    },
    categories: {
        type: String,
        enum: ['Hostel & Mess', 'Academics', 'Campus Techinical', 'Infrastructure', 'Anti-Ragging', 'Other Support'],
        required: true
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
    isAnonymous: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['new', 'inprogress', 'resolved'],
        default: 'new'
    }
}, { timestamps: true });

const complaintModel = mongoose.model('Complaint', complaintSchema);
export default complaintModel;