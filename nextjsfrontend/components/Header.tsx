"use client";

import Link from "next/link";
import Image from "next/image";
import StyledButton from "./StyledButton";



const Header = () => {
  return (
    <nav className="bg-gray-800 py-4 px-12  flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button className="text-white focus:outline-none">
          <Image
            className="h-9 w-9 "
            src="/logo.png"
            width={20}
            height={20}
            alt="Logo"
          />
        </button>
        <h1 className="text-xl font-bold text-white">VidVerse</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/upload">
          <StyledButton />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
