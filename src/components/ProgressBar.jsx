import React from "react";

const ProgressBar = ({ progress, total }) => {
  return (
    <div className="w-full max-w-[400px] h-2 bg-[#F8E9CA]/20 rounded-full mt-4">
      <div
        className="h-full bg-[#F8E9CA] rounded-full transition-all duration-300"
        style={{ width: `${(progress / total) * 100}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
