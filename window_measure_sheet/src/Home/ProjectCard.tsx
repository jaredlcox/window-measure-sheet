import React from "react";

const ProjectCard: React.FC = () => {
  const address = "4739 Monac Drive, Toledo, OH 43623";
  const apiKey = "AIzaSyAB85Tm0OzIu3pAQAr9cEQVM5z_f_EZpHU"; // Replace with your actual API key
  const streetViewUrl = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${encodeURIComponent(
    address
  )}&key=${apiKey}`;
  return (
    <div className="card lg:card-side border-2 shadow-md h-96 lg:h-44 cursor-pointer hover:shadow-xl">
      <figure className="object-fill">
        <img
          src={streetViewUrl}
          alt="Street View"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Ryan Pingle [12597]</h2>
        <p className="text-base">
          11284 Summerfield Road • Petersburg, MI 49270
        </p>
        <p className="text-sm font-semibold text-gray-400">
          Last updated 8-20-24 by Phil Kraus
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
