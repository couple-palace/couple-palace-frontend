import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profileSample from "@assets/profile_sample.png"; // 이미지 import

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-center p-6">
      {/* 타이틀 영역 */}
      <motion.div 
        className="mt-12 mb-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text">
          나의 커플 궁전 프로필 만들기
        </h1>
        <p className="text-lg mb-3 text-[#F8E9CA]/90">
          연애 가치관을 분석하고 나만의 특별한 닉네임을 찾아보세요!
        </p>
        <p className="text-sm mb-8 text-[#F8E9CA]/70">
          재미있는 퀴즈로 당신만의 개성이 담긴 커플 궁전 프로필을 만들어 드려요
        </p>
      </motion.div>

      {/* 프로필 결과 예시 */}
      <motion.div 
        className="w-full max-w-sm mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bg-[#F8E9CA]/10 rounded-xl p-6 backdrop-blur-sm shadow-lg border border-[#F8E9CA]/20">
          <img
            src={profileSample}
            alt="Profile Example"
            className="rounded-lg mb-4 shadow-md hover:shadow-xl transition-all duration-300"
            style={{ width: "90%", margin: "0 auto" }}
          />
          <p className="text-center text-sm text-[#F8E9CA]/80">✨ 프로필 결과 예시 ✨</p>
        </div>
      </motion.div>

      {/* 퀴즈 시작 버튼 */}
      <motion.button
        onClick={() => navigate("/name-input")}
        className="bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#1F2937] px-8 py-4 w-full max-w-sm rounded-2xl text-lg font-bold shadow-lg shadow-[#F8E9CA]/20 hover:shadow-xl hover:shadow-[#F8E9CA]/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="flex items-center justify-center">
          <i className="fas fa-sparkles mr-2"></i>
          나의 프로필 만들러 가기
        </span>
      </motion.button>
      
      <motion.p 
        className="mt-4 text-xs text-[#F8E9CA]/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        5분 안에 완성되는 나만의 커플 궁전 프로필
      </motion.p>
    </div>
  );
};

export default HomePage;