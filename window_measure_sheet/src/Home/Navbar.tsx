import React, { useState } from "react";
import Avatar from "./Avatar";
import ProjectFeed from "./ProjectFeed";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar for larger screens */}
      <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-4 hidden md:block fixed top-0 h-screen font-semibold">
        <div className="flex items-center justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="cursor-pointer w-8 rounded-full"
          >
            <path
              fill="currentColor"
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
            ></path>
          </svg>
          <Avatar />
        </div>

        <h1 className="text-md font-bold text-left">Window Measure Sheet</h1>
        <nav className="">
          <a
            href="#"
            className="flex items-center py-2.5 px-2 rounded transition duration-200 hover:bg-gray-700 text-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                fill="currentColor"
                d="M12 15c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4M8 9a4 4 0 0 0 4 4a4 4 0 0 0 4-4m-4.5-7c-.3 0-.5.21-.5.5v3h-1V3s-2.25.86-2.25 3.75c0 0-.75.14-.75 1.25h10c-.05-1.11-.75-1.25-.75-1.25C16.25 3.86 14 3 14 3v2.5h-1v-3c0-.29-.19-.5-.5-.5z"
              ></path>
            </svg>
            Projects
          </a>
          <a
            href="#"
            className="flex items-center py-2.5 px-2 rounded transition duration-200 hover:bg-gray-700 text-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 36 36"
              className="mr-2"
            >
              <path
                fill="currentColor"
                d="M16.4 15.4h3.2v5.2h-3.2z"
                className="clr-i-solid clr-i-solid-path-1"
              ></path>
              <path
                fill="currentColor"
                d="M21 21a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2H2v9a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2v-9H21Z"
                className="clr-i-solid clr-i-solid-path-2"
              ></path>
              <path
                fill="currentColor"
                d="m33.71 12.38l-4.09-4.09a1 1 0 0 0-.7-.29h-5V6.05A2 2 0 0 0 22 4h-8.16A1.92 1.92 0 0 0 12 6.05V8H7.08a1 1 0 0 0-.71.29l-4.08 4.09a1 1 0 0 0-.29.71V17h13v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2h13v-3.92a1 1 0 0 0-.29-.7M22 8h-8V6h8Z"
                className="clr-i-solid clr-i-solid-path-3"
              ></path>
              <path fill="none" d="M0 0h36v36H0z"></path>
            </svg>
            Materials
          </a>
          <a
            href="#"
            className="flex items-center py-2.5 px-2 rounded transition duration-200 hover:bg-gray-700 text-left"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 256 256"
              className="mr-2"
            >
              <path
                fill="currentColor"
                d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88m0 56a32 32 0 1 1-32 32a32 32 0 0 1 32-32"
              ></path>
            </svg>
            Map
          </a>
        </nav>
      </div>

      {/* Top Nav for smaller screens */}
      <div className="bg-gray-800 text-white w-full md:hidden fixed top-0 z-20">
        <div className="flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">Window Measure Sheet</h1>
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Full-screen overlay menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } bg-gray-800 text-white h-screen w-full absolute top-0 left-0 flex flex-col items-center justify-center z-30`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="space-y-6">
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              onClick={toggleMenu}
            >
              Projects
            </a>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              onClick={toggleMenu}
            >
              Materials
            </a>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
              onClick={toggleMenu}
            >
              Map
            </a>
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="text-2xl font-bold mt-[4rem] md:mt-0 h-[4000px] md:ml-64 p-10 w-full">
        <ProjectFeed />
      </div>
    </div>
  );
};

export default Navbar;
