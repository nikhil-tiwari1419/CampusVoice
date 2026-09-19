import mongoose from 'mongoose'

const voteSchema = new mongoose.Schema({
    complaint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true,
    },

} , {timestamps: true});
// one use only one ovet 
voteSchema.index({ complaint:1, user:1}, {unique:true});

export default mongoose.model('vote',voteSchema);
