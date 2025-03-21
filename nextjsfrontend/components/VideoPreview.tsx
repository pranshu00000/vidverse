"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { UseVideo } from '@/context/VideoContext';
interface VideoPreviewProps{
    thumbnail:string;
    video:string;
    description:string;
    id:string;
}
const VideoPreview:React.FC<VideoPreviewProps> = (prop) => {
    const router=useRouter()
    const {setSelectedVideo}=UseVideo()
    const trimDescription=(description:string)=>{
        if(description.length>32){
            return description.slice(0,100)+"...";
        }
        return description;

    }

    const handleClick=()=>{
        setSelectedVideo({
            id:prop.id,
            thumbnail:prop.thumbnail,
            video:prop.video,
            description:prop.description
        });
        router.push(`/video/${prop.id}`);
    }
  return (
    <div onClick={handleClick} className='h-60  rounded-2xl m-2 flex flex-col justify-start'>
        <img className='h-52 rounded-xl' src={prop.thumbnail} alt="" />
        <h1 className='font-semibold px-3'>{trimDescription(prop.description)}</h1>
    </div>
  )
}

export default VideoPreview