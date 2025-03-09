import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#2A2E3D] text-[#F8E9CA] flex flex-col items-center justify-center w-full max-w-[500px] mx-auto p-4">
      {children}
    </div>
  );
};

export default Layout;
