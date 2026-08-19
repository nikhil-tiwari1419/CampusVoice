import mongoose from mongoose

const programSchema = new mongoose.Schema({
    name :{ 
        type:String,
        required:true,
        unique:true
    },
    numYears:{
        type:Number,
        required:true,
    },
    hasBranches:{
        type:Boolean,
        default:false
    },
});

module.exports = mongoose.model('Program',programSchema)
