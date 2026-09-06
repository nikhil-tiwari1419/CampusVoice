import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Batch',
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
    status: {
        type: String,
        enum: ['new', 'read', 'resolved'],
        default: 'new'
    }
}, { timestamps: true });

const complaintModel = mongoose.model('Complaint', complaintSchema);
export default complaintModel;

