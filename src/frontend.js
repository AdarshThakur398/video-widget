import React, { useState } from 'react';
import axios from 'axios';

const VideoEmbedGenerator = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [localFile, setLocalFile] = useState(null);
  const [embedCode, setEmbedCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const redirectUrl = 'https://portfolio1-sigma-lake.vercel.app/'; 

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('video/')) {
      setError('Please select a valid video file');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      setLoading(true);
      setError('');

      const uploadResponse = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const embedResponse = await axios.post('http://localhost:3000/api/generate-embed', {
        videoUrl: uploadResponse.data.videoUrl,
        platform: 'local'
      });

      setEmbedCode(embedResponse.data.embedCode);
      setLocalFile(file);
      setVideoUrl('');
    } catch (err) {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const generateEmbedCode = async () => {
    if (!videoUrl.trim()) {
      setError('Please enter a valid video URL');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const platform = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')
        ? 'youtube'
        : videoUrl.includes('dailymotion.com')
          ? 'dailymotion'
          : null;

      if (!platform) {
        setError('Unsupported video platform');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/generate-embed', {
        videoUrl,
        platform
      });

      setEmbedCode(response.data.embedCode);
    } catch (err) {
      setError('Unable to generate embed code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Video Embed Generator</h1>

      <div className="mb-4">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => {
            setVideoUrl(e.target.value);
            setLocalFile(null);
            setEmbedCode('');
          }}
          placeholder="Enter YouTube or Dailymotion URL"
          className="w-full border p-2 mb-2"
        />

        <div className="flex items-center">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="bg-gray-500 text-white px-4 py-2 mr-2 cursor-pointer"
          >
            Upload Local Video
          </label>
          <button
            onClick={generateEmbedCode}
            className="bg-blue-500 text-white px-4 py-2"
          >
            Generate Embed
          </button>
        </div>
      </div>

      {loading && <div className="text-blue-500 mb-4">Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {embedCode && (
        <div className="flex items-start space-x-4 mt-4">
          <div className="flex-1">
            <h2 className="text-xl mb-2">Preview:</h2>
            <div dangerouslySetInnerHTML={{ __html: embedCode }} />
          </div>

      
          <button
            onClick={() => window.open(redirectUrl, '_blank')}
            className="bg-green-500 text-white px-4 py-2 rounded shadow-md"
          >
            Go to Link
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoEmbedGenerator;
