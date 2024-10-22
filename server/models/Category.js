const mongoose=require("mongoose");
const categortSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    images:{
        type:String,
        require:true
    }
})
exports.Category=mongoose.model('Category',categorySchema);