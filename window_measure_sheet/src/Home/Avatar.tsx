import React from "react";

const Avatar: React.FC = () => {
  return (
    <div className="avatar placeholder hover:cursor-pointer">
      <div className="text-neutral-content w-10 rounded-full" data-theme="cupcake">
        <span className="text-gray-800">PK</span>
      </div>
    </div>
  );
};

export default Avatar;
