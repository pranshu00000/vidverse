import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null); // To store the uploaded file
  const [description, setDescription] = useState(''); // To store the description
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // To show the uploaded image URL

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // Handle the form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if file and description are provided
    if (!file || !description) {
      alert('Please provide both an image and a description.');
      return;
    }

    const formData = new FormData(); // Create FormData object
    formData.append('image', file); // Append the image
    formData.append('description', description); // Append the description

    try {
      // POST request to the backend API
      const token=localStorage.getItem('authToken')
      const response = await axios.post('/api/img/upload', formData, 
        {
          'Authorization': `Bearer ${token}`, // Pass token in Authorization header
          'Content-Type': 'multipart/form-data', // Set Content-Type for file uploads 
          }
    );

      console.log('Response:', response.data);
      setUploadedImageUrl(response.data.imageUrl); // Set the Cloudinary image URL
    } catch (error) {
      console.error('There was an error uploading the image!', error);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <input 
          type="text" 
          placeholder="Enter description" 
          value={description} 
          onChange={handleDescriptionChange} 
        />
        <button type="submit">Upload</button>
      </form>

      {uploadedImageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImageUrl} alt="Uploaded to Cloudinary" style={{ width: '300px' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
