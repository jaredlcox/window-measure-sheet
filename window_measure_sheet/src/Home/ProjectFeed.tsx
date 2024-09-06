import React from "react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const ProjectFeed: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateProjectClick = () => {
    navigate('/projects/new');
  };

  return (
    <div className="p-4 md:p-10 flex flex-col flex-grow max-w-full">
      {/* header container */}
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex space-x-4 flex-col md:flex-row flex-wrap">
          <h1 className="md:text-4xl text-2xl">Project Feed</h1>
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
        <button
          className="btn btn-primary text-white rounded-md md:w-auto"
          onClick={handleCreateProjectClick}
        >
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
          <p>Create Project</p>
        </button>
      </div>
      {/* body */}
      <div className="mt-4 mb-4 flex-grow overflow-auto space-y-10 py-4">
        {/* Your project feed content goes here */}
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectFeed;
