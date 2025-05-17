"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoPreview from "@/components/VideoPreview";

interface Video {
  _id: string;
  thumbnail: string;
  description: string;
  video: string;
}

const Homepg: React.FC = () => {
  const [preview, setPreview] = useState<Video[]>([]);
  const [filtered, setFiltered] = useState<Video[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isNavigating, setIsNavigating] = useState(false);
  useEffect(() => {
    const fetchPreviews = async () => {
      try {
        const res = await axios.get<Video[]>(
          "http://localhost:8000/api/home/view"
        );
        setPreview(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching videos", err);
      } 
    };
    fetchPreviews();
  }, []);
useEffect(() => {
  if (query.trim() === "") {
    setFiltered(preview);
  } else {
    const lower = query.toLowerCase();
    const results = preview.filter((item) =>
      item.description.toLowerCase().includes(lower)
    );
    setFiltered(results);
  }
}, [query, preview]);




  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#120014] via-[rgb(18,0,20)] to-[#6db1e5] text-white">
      <div className="flex ">
        <main className="flex-1 p-6">
          <div>
            <div className="relative w-80">
              <span className="absolute top-2 left-2 flex items-center">
                <svg
                  className="w-7 h-7 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-12 pl-10 pr-4 py-2 rounded-full bg-[#1E293B] text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#475569]"
              />
            <div className="text-2xl my-5 font-bold mb-6">Recommended Videos</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            Video Card
  {filtered.map((item, key) => (
    <div key={key}>
      <VideoPreview
        id={item._id}
        video={item.video}
        thumbnail={item.thumbnail}
        description={item.description}
        onClick={() => setIsNavigating(true)}
      />
    </div>
  ))}

          </div>
        </main>
      </div>
      {isNavigating && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-solid"></div>
  </div>
)}
    </div>
    
  );
};

export default Homepg;
