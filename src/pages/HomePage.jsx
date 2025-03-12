import React from "react";
import { useNavigate } from "react-router-dom";
import profileSample from "@assets/profile_sample.png"; // 이미지 import

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1E1E1E] text-center p-6">
      {/* 타이틀 영역 */}
      <div className="mt-12 mb-10 px-4">
        <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text">
          내가 커플 궁전에 나간다면? 프로필 만들어보기
        </h1>
        <p className="text-lg mb-3 text-[#F8E9CA]/90">
          연애 가치관을 분석하고 나만의 닉네임을 찾아보세요!
        </p>
        <p className="text-sm mb-8 text-[#F8E9CA]/70">
          간단한 퀴즈를 통해 나만의 개성을 담은 커플 궁전 프로필 만들어보기
        </p>
      </div>

      {/* 프로필 결과 예시 */}
      <div className="w-full max-w-sm mb-8">
        <div className="bg-[#F8E9CA]/10 rounded-xl p-4">
        <img
          src={profileSample}
          alt="Profile Example"
          className="rounded-lg mb-4"
          style={{ width: "90%" }}
        />
          <p className="text-center text-sm opacity-80">▲ 프로필 결과 예시</p>
        </div>
      </div>

      {/* 퀴즈 시작 버튼 */}
      <button
        onClick={() => navigate("/name-input")}
        className="bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#1F2937] px-8 py-4 w-full max-w-sm rounded-lg text-lg font-bold shadow-lg shadow-[#F8E9CA]/20 transform hover:scale-105 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-[#F8E9CA]/30"
      >
        <i className="fas fa-play-circle mr-2"></i>
        퀴즈 시작하기
      </button>
    </div>
  );
};

export default HomePage;