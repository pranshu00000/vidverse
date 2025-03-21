"use client"

import { createContext, useContext, ReactNode, useState } from 'react';

interface VideoData{
    id:string;
    video:string;
    thumbnail:string;
    description:string;
}

interface VideoContextProps{
    selectedVideo:VideoData | null;
    setSelectedVideo:(video:VideoData) => void;
}

const VideoContext=createContext<VideoContextProps | undefined>(undefined)

export function VideoProvider({children}:{children:ReactNode}){
    const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);

    return(
        <VideoContext.Provider value={{selectedVideo,setSelectedVideo}}>
            {children}
        </VideoContext.Provider>
    )
}

export function UseVideo(){
    const context=useContext(VideoContext)
    if(context==undefined){
        throw new Error('UseVideo must be used within a VideoProvider')
    }
    return context;
}