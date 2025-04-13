"use client"
import React from 'react'
import { UseVideo } from '@/context/VideoContext'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface Video{
  id:string;
  thumbnail:string;
  video:string;
  description:string;
}

const Page = () => {
    const {selectedVideo}=UseVideo()
    const [videoData,setVideoData]=useState(selectedVideo)
    const [loading,setLoading]=useState<boolean>(false)
    const [error,setEror]=useState<string | null>(null)
    const params=useParams()
    const id=params.id as string

    const handleVideo=async(id:string)=>{
      setLoading(true)
      try{
        const res=await axios.get<Video>(`http://localhost:8000/api/video/metadata/${id}`);
        console.log(res.data);
        setVideoData(res.data);
        return res.data;
      }catch(err){
        console.error('Error fetching the video',err)
        setEror("Failed to load video")
        return null;
      }finally{
        setLoading(false)
      }
    }

    useEffect(()=>{
      if(!videoData && id ){
        handleVideo(id)
      }
    },[id,videoData])

    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
    if(!videoData) return <div>No video data availab;e</div>

            
    return (
      <div className="bg-violet-50 min-h-screen flex items-center justify-center flex-col p-8 px-4">
  <div className="max-w-4xl w-full space-y-8">
    <div className="aspect-video bg-black rounded-xl shadow-xl overflow-hidden">
      <video 
        src={videoData.video} 
        controls 
        className="w-full h-full object-cover" 
        poster={videoData.thumbnail}
      />
    </div>
    <div className="space-y-4 text-center">
      <h1 className="text-3xl font-bold text-violet-900 mb-2">
        {videoData.description}
      </h1>
      
    </div>
    
    
    
  </div>
</div>
    );
    
}

export default Page