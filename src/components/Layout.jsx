import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="w-full max-w-[500px] bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default Layout;
