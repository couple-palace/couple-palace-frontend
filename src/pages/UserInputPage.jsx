import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const UserInputPage = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      navigate("/quiz");
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-semibold mb-2">이름을 입력해주세요</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          required
          placeholder="이름 또는 닉네임 입력"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 bg-[#F8E9CA]/10 rounded-lg border border-[#F8E9CA]/20 focus:border-[#F8E9CA] outline-none text-lg"
        />
        <button
          type="submit"
          className="w-full bg-[#F8E9CA] text-[#2A2E3D] py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
        >
          다음으로
        </button>
      </form>
    </Layout>
  );
};

export default UserInputPage;
