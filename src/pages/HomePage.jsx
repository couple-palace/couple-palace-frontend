import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profileSample from "@assets/profile_sample01.png"; // 이미지 import

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen  text-center p-6">
      {/* 타이틀 영역 */}
      <motion.div 
        className="w-custom max-w-custom mx-auto mt-12 mb-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-3xl mb-4 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text" style={{ fontFamily: "'HSBombaram', sans-serif" }}>
          <div>커플궁전 </div>
          <div>프로필 테스트</div> 
        </div>
        <div className="flex flex-col">
          <div className="text-lg mb-3 flex flex-wrap justify-center text-[#F8E9CA]/90">
            <div>연애, 결혼 가치관을 분석하고 </div>
            <div>커플궁전에 나가보세요!</div>
          </div>
          <div className="text-sm mb-8 flex flex-wrap justify-center text-[#F8E9CA]/70">
            <div>재미있는 퀴즈로 당신만의 개성이 담긴 </div>
            <div>커플궁전 프로필을 만들어 드려요</div>
          </div>
        </div>
   
      </motion.div>

      {/* 프로필 결과 예시 */}
      <motion.div 
        className="w-custom max-w-custom mx-auto mb-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="bg-[#F8E9CA]/10 p-6 backdrop-blur-sm shadow-lg border border-[#F8E9CA]/20">
          <img
            src={profileSample}
            alt="Profile Example"
            className=" mb-4 shadow-md hover:shadow-xl transition-all duration-300"
            style={{ width: "90%", margin: "0 auto" }}
          />
          <p className="text-center text-sm text-[#F8E9CA]/80">프로필 결과 예시</p>
        </div>
      </motion.div>

      {/* 퀴즈 시작 버튼 */}
      <motion.button
        onClick={() => navigate("/name-input")}
        className="w-custom max-w-custom mx-auto bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#1F2937] px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-[#F8E9CA]/20 hover:shadow-xl hover:shadow-[#F8E9CA]/30"
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
        3분 안에 완성되는 나만의 커플 궁전 프로필
      </motion.p>
    </div>
  );
};

export default HomePage;