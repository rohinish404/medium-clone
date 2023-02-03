import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex justify-between items-center max-w-7xl mx-auto p-4">
      <div className="flex items-center px-4">
        <Link href="/">
          <img
            className="w-44 object-contain"
            src="https://miro.medium.com/max/8978/1*s986xIGqhfsN8U--09_AdA.png"
          ></img>
        </Link>
        <ul className="hidden sm:flex items-center">
            <Link href='#about'><li className="ml-4">About</li></Link>
            <Link href='#contact'><li className="ml-4">Contact</li></Link>
            <Link href='#follow'><li className="ml-4 border-green-600 border-2 px-2 rounded-2xl text-white bg-green-600">Follow</li></Link>
        </ul>
      </div>
      <div className="flex">
          <button className="text-green-600">Sign In</button>
          <button className="mx-4 ml-5 border-gray-300 border-2 px-2 rounded-2xl text-green-600">Get Started</button>
      </div>
    </div>
  );
}

export default Navbar;
