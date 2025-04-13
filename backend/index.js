const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors')
const app = express();
const dotenv=require('dotenv')
dotenv.config();


app.use(cors())

// Connect to MongoDB
const DB_NAME = "vidverse";

 mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`).then(()=>console.log('connected to mongodb'))
 .catch((err)=>{
    console.error("failed to connect to mongodb",err)
    process.exit(1);
 })
            


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/img',require('./Routes/upload'))
app.use('/api/home',require('./Routes/home'))
app.use('/api/video',require('./Routes/videoMetadata'))
app.get('/',(req,res)=>{
   res.send("This is The Viderse Backend")
})
const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0',() => console.log(`Server running on port ${PORT}`));
