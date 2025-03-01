import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center ">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">💘 Couple Palace 💘</h1>
      <p className="text-lg text-gray-600 mb-6">
        당신의 연애 가치관을 테스트하고 나만의 닉네임을 만들어보세요!
      </p>
      <button
        className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={() => navigate("/quiz")}
      >
        퀴즈 시작하기 🚀
      </button>
    </div>
  );
};

export default HomePage;
