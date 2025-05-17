'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  // Handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle video file selection
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVideoFile(e.target.files[0]);
    }
  };

  // Handle description input change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  // Handle the form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if image, video, and description are provided
    if (!file || !videoFile || !description) {
      alert('Please provide an image, video, and description.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('video', videoFile);
    formData.append('description', description);

    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:8000/api/img/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      console.log('Response:', response.data);
      setUploadedImageUrl(response.data.imageUrl);
      
      // Set success popup
      setPopupMessage('Upload successful!');
      setShowPopup(true);

      // Reset form
      setFile(null);
      setVideoFile(null);
      setDescription('');
    } catch (error) {
      console.error('There was an error uploading the image!', error);
      
      // Set error popup
      setPopupMessage('Upload failed. Please try again.');
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 relative ">
      <h2 className="text-2xl mb-4">Upload an Image and Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Image:</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full border p-2"
            accept="image/*"
          />
        </div>
        
        <div>
          <label className="block mb-2">Video:</label>
          <input 
            type="file" 
            onChange={handleVideoChange} 
            className="w-full border p-2"
            accept="video/*"
          />
        </div>
        
        <div>
          <label className="block mb-2">Description:</label>
          <input 
            type="text" 
            placeholder="Enter description" 
            value={description} 
            onChange={handleDescriptionChange} 
            className="w-full border p-2"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full p-2 rounded ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {uploadedImageUrl && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Uploaded Image:</h3>
          <Image 
            src={uploadedImageUrl} 
            alt="Uploaded to Cloudinary" 
            className="max-w-full h-auto" 
          />
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h3 className="text-xl mb-4">{popupMessage}</h3>
            <button 
              onClick={closePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        </div>
      )}
    </div>
  );
}