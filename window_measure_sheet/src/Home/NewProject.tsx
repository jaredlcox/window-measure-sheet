import React from "react";
import { useNavigate } from "react-router-dom";
import CustomMap from "./CustomMap"; // Renamed import

const NewProject: React.FC = () => {
  const navigate = useNavigate();

  const handleCancelProjectClick = () => {
    navigate("/projects");
  };
  return (
    <div className="flex justify-center items-center h-full w-full relative bg-neutral-200">
      <div className="hidden xl:flex h-full w-full">
        <CustomMap />
      </div>
      <div className="flex w-full h-[95%] rounded-md shadow-lg m-10 p-6 xl:w-1/5 xl:absolute xl:right-0 bg-[#FAF7F5] z-20">
        <form className="flex h-auto w-full flex-col gap-8">
          <div className="flex flex-row w-full h-20 justify-between items-center">
            <h1 className="text-2xl font-bold">Create New Project</h1>
            <button
              onClick={handleCancelProjectClick}
              className="btn btn-secondary text-white rounded-md md:w-auto"
            >
              <p>Cancel</p>
            </button>
          </div>
          <input
            type="text"
            placeholder="Project Name"
            className="input input-bordered w-full rounded-none"
          />
          <label className="input input-bordered flex items-center gap-2 rounded-none">
            Address
            <input type="text" className="grow" placeholder="" />
          </label>
          <label className="input input-bordered flex items-center gap-2 rounded-none">
            City
            <input type="text" className="grow" placeholder="" />
          </label>
          <div className="flex flex-row gap-2 overflow-hidden">
            <label className="input input-bordered flex items-center gap-2 rounded-none w-full sm:w-1/2">
              State
              <input type="text" className="w-full" placeholder="" />
            </label>
            <label className="input input-bordered flex items-center gap-2 rounded-none w-full sm:w-1/2">
              Zip
              <input type="text" className="w-full" placeholder="" />
            </label>
          </div>
          <button className="btn btn-primary text-white rounded-md md:w-auto">
            <p>Create Project</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject;
