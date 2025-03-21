const express=require('express')
const fs=require('fs')
const multer=require('multer')
const ImgUpload=require('../Model/ImgUpload.js')
const authenticateToken = require('../middleware/authenticateToken.js')
const cloudinaryConfig=require('../Cloudinary/cloudinaryConfig.js')

require('dotenv').config()

const router=express.Router()


  const upload=multer({dest:'temp/'})

  router.post('/upload'
    // ,authenticateToken
    ,upload.fields([{name:'image',maxCount:1},{name:'video',maxCount:1}]),
    async(req,res)=>{
    const imagePath=req.files['image']?req.files['image'][0].path:null;
    const videoPath=req.files['video']?req.files['video'][0].path:null;
    const {description}=req.body;
    try{
      let imageUrl=null;
      let videoUrl=null;

      if(imagePath){
        const imageResult=await cloudinaryConfig.cloudinary.uploader.upload(imagePath);
        imageUrl=imageResult.secure_url
        fs.unlinkSync(imagePath);

      }

      if(videoPath){
        const videoResult=await cloudinaryConfig.cloudinary.uploader.upload(videoPath, { resource_type: 'video' });
        videoUrl=videoResult.secure_url
        fs.unlinkSync(videoPath)
      }
      
        const  uploadData=new ImgUpload({
              thumbnail:imageUrl,
              video:videoUrl,
              description:description
            })
            await uploadData.save()
            // Send Cloudinary URL response
            res.json({ 
                data:uploadData
            });
    
    
  }
  catch(err){
    console.error("error in uploading database",err)
    res.status(500).send({error:'failed to upload data and save mediaf'})
  }
})

module.exports = router;
