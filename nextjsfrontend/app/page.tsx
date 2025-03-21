'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import VideoPreview from './VideoPreview'; // Ensure VideoPreview is also converted to TSX
import { useRouter } from 'next/navigation';
import VideoPreview from '@/components/VideoPreview';

// Define the type for the video data
interface Video {
  _id: string;
  thumbnail: string;
  description: string;
  video:string;

}

const Homepg: React.FC = () => {
  const [preview, setPreview] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const res = await axios.get<Video[]>('http://localhost:8000/api/home/view');
        setPreview(res.data);
      } catch (err) {
        console.error('Error fetching videos', err);
      }finally {
      setLoading(false);
    }
    };
    fetchPreviews();
  }, []);

  useEffect(() => {
    console.log(preview);
  }, [preview]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-purple-700 p-4 space-y-4">
          <button className="w-full flex items-center space-x-3 text-white hover:bg-purple-700 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Home</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-white hover:bg-purple-700 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span>Trending</span>
          </button>
          <button className="w-full flex items-center space-x-3 text-white hover:bg-purple-700 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>Subscriptions</span>
          </button>
        </aside>

        {/* Video Grid */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-6">Recommended Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            Video Card
            {preview.map((item, key) => (
              <div key={key}>
                <VideoPreview id={item._id} video={item.video} thumbnail={item.thumbnail} description={item.description} />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Homepg;