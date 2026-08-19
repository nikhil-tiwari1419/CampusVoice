import mongoose from mongoose

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },

});


branchSchema.index({ name: 1, program: 1 }, { unique: true });

module.exports = mongoose.model('Branch', branchSchema)