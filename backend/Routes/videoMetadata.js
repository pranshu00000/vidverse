const express=require('express')
const ImgUpload=require('../Model/ImgUpload')

router=express()

router.get('/metadata/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const data=await ImgUpload.findById(id)
        if (!data) {
            return res.status(404).json({ message: 'Video not found' });
          }
        res.status(200).json(data)
    }catch(err){
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format' });
          }
          res.status(500).json({ message: err.message });
            }
})

module.exports=router;