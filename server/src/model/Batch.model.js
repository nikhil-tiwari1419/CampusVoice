import mongoose from mongoose
// models/Batch.js
const batchSchema = new mongoose.Schema({
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        default: null
    }, // null for BCA
    year: {
        type: Number,
        required: true
    },
});

batchSchema.index({ program: 1, branch: 1, year: 1 }, { unique: true });

module.exports = mongoose.model('Batch', batchSchema);

