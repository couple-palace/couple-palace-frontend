import React from "react";

const Layout = ({ children }) => {
  return (
    <div style={{
      width: "100%",
      maxWidth: "500px",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
      padding: "20px",
      borderRadius: "10px"
    }}>
      {children}
    </div>
  );
};

export default Layout;
