import React from 'react'

interface Video {
  createdAt: string;
  title: string;
  thumbnail: string;
  description: string;
}

const VideoPreview: React.FC<{ video: Video }> = ({ video }) => {
  // Function to calculate the time difference
  const TimeAgo = ({ createdAt }: { createdAt: string }) => {
    const getTimeAgo = (createdAt: string) => {
      const createdDate = new Date(createdAt); // Convert the createdAt string to a Date object
      const currentDate = new Date(); // Get the current date

      // Calculate the difference in milliseconds
      const timeDifference = currentDate.getTime() - createdDate.getTime();

      // Convert the difference to days
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      if (daysDifference === 0) {
        return "Today";
      } else if (daysDifference === 1) {
        return "1 day ago";
      } else {
        return `${daysDifference} days ago`;
      }
    };

    return <p className='text-sm text-start mx-10'>{getTimeAgo(createdAt)}</p>; // Return the result as a paragraph element
  };

  return (
    <div>
      <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg">
        <img className='h-44 w-80 mx-auto rounded' src={video.thumbnail} alt={video.title} />
        <p className='items-center text-center text-lg font-semibold'>{video.description}</p>
        <TimeAgo createdAt={video.createdAt} />
      </div>
    </div>
  );
}

export default VideoPreview;
