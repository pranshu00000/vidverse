
import React from 'react';
import Link from 'next/link';  
import Image from 'next/image';

const Header = () => {
  return (
    <nav className="bg-purple-500 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button className="text-white focus:outline-none">
          <Image className="h-9 w-9" src="/logo.png" width={20} height={20} alt="Logo" />
        </button>
        <h1 className="text-xl font-bold">VidVerse</h1>
      </div>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 rounded-full bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {/* Use next/link to navigate between pages (SSG or SSR-friendly) */}
        <Link href="/upload">
          <button className="text-white focus:outline-none flex gap-3 bg-purple-700 rounded-xl w-32 justify-center items-center h-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 border rounded-xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <p className="text-xl font-semibold">create</p>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
