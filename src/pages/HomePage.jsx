import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">연애 가치관 테스트</h1>
      <p className="text-lg mb-6 text-center">연애 가치관을 분석하고 나만의 닉네임을 찾아보세요!</p>
      <button
        onClick={() => navigate("/user-input")}
        className="bg-[#F8E9CA] text-[#2A2E3D] px-8 py-4 w-full max-w-sm rounded-lg text-lg font-semibold transform hover:scale-105 transition-transform duration-200"
      >
        퀴즈 시작하기
      </button>
    </Layout>
  );
};

export default HomePage;
