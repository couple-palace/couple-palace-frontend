import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">💘 Couple Palace 💘</h1>
      <p className="text-lg text-gray-600 text-center mb-8">
        당신의 연애 가치관을 테스트하고 나만의 닉네임을 만들어보세요!
      </p>
      <button
        className="py-3 px-6 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition"
        onClick={() => navigate("/quiz")}
      >
        퀴즈 시작하기 🚀
      </button>
    </div>
  );
};

export default HomePage;
