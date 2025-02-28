import React from "react";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const UserInputPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => navigate("/result");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-2xl font-bold mb-6">프로필 입력</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UserInputPage;
