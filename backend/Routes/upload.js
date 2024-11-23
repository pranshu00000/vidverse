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
    ,upload.single('image'),async(req,res)=>{
    const path=req.file.path;
    const {description}=req.body;
    try{

    const result=await  cloudinaryConfig.cloudinary.uploader.upload(path)
        console.log(req.body);
        
        
          // Delete the local file after uploading to Cloudinary
          fs.unlinkSync(path);
      
          uploadData=new ImgUpload({
              thumbnail:result.secure_url,
              description:description
            })
            await uploadData.save()
            // Send Cloudinary URL response
            res.json({ 
                imageUrl: result.secure_url,
                data:uploadData
            });
    
    
  }
  catch(err){
    console.error("error in uploading database",err)
    res.status(500).send({error:'failed to upload data and save image'})
  }
})

module.exports = router;
