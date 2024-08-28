import React from "react";

const ProjectFeed: React.FC = () => {
  return (
    <div className="h-[4000px]">
      {/* header container */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-col md:flex-row">
          
          <h1 className="md:text-4xl">Project Feed</h1>
          <label className="input input-bordered flex items-center gap-2 outline-sky-200">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <button className="btn btn-primary text-white rounded-md md:w-auto">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="cursor-pointer w-6 rounded-full"
          >
            <path
              fill="currentColor"
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16"
            ></path>
          </svg>
          <p className="">Create Project</p>
        </button>
      </div>
      {/* body */}
      <div></div>
    </div>
  );
};

export default ProjectFeed;
