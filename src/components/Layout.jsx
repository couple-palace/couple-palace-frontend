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
      backgroundColor: "#2A2E3D", // ✅ 배경색 적용
      color: "#F8E9CA", // ✅ 글씨 색 적용
      padding: "20px",
      borderRadius: "10px"
    }}>
      {children}
    </div>
  );
};

export default Layout;
