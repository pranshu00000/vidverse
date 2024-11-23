import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Homepg = () => {
const [preview,setPreview]=useState([])
 useEffect(() => {
     const fetchPreviews=async()=>{
   try {
        const res= await axios.get('/api/home/view');
        setPreview(res.data)
    }
    catch (err) {
    console.error('error fetching images',err);
   }
     }
   fetchPreviews()
 }, [])
 
  return (
    <div className='bg-slate-500'>
      <div className='text-[75px] text-center font-bold'>Home Page</div>
      <div className='p-7 grid gap-4 grid-cols-4'>
        {preview.map((preview,index)=>(
            <div key={index}>
                <img className='h-60 rounded-lg gap-1 flex items-center justify-center' src={preview.thumbnail} alt={`Uploaded ${index}`} />
                <p className='text-center bg-slate-400 rounded-md'>{preview.description}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Homepg
