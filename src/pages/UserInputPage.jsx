import React from "react";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const UserInputPage = () => {
  const navigate = useNavigate();
  const handleSubmit = () => navigate("/result");

  return (
    <div className="w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-4">프로필 입력</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default UserInputPage;
