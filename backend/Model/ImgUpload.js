const mongoose=require('mongoose')
 const UploadSchema=new mongoose.Schema({
    thumbnail:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
 },{timestamps:true})
 module.exports=mongoose.model('ImgUpload',UploadSchema)