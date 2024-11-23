const express=require('express')
router=express()
const ImgUpload=require('../Model/ImgUpload.js')

router.get('/view',async(req,res)=>{
    try{
    const data=await ImgUpload.find({})  
    res.status(200).json(data)
    console.log(data.thumbnail);
    

    }catch(err){
        res.status(500).json({msg:'server error',err})
    }

})

module.exports = router;
