import React, { useState } from "react";
import { motion } from "framer-motion";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const NameInputPage = ({ onNext }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const setStoreName = useUserStore((state) => state.setName);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setIsAnimating(true);
      setStoreName(name); // Zustand에 이름 저장
      
      // 애니메이션 효과 후 다음 페이지로
      setTimeout(() => {
        // onNext가 함수인 경우에만 호출
        if (typeof onNext === 'function') {
          onNext();
        }
        navigate("/quiz");
      }, 600);
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md">
        {/* 제목 및 설명 */}
        <motion.div 
          className="text-center mb-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text">
            프로필 만들기
          </h2>
          <p className="text-lg opacity-80 mb-3">
            나만의 특별한 닉네임을 생성하기 위해<br />이름을 알려주세요
          </p>
          <motion.p 
            className="text-sm opacity-60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            결과 화면에서만 사용되며 저장되지 않아요 💫
          </motion.p>
        </motion.div>

        {/* 입력 폼 */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative">
            <motion.input
              type="text"
              required
              placeholder="이름 또는 닉네임을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-5 text-lg bg-[#1C2333]/70 border border-[#F8E9CA]/40 focus:border-[#F8E9CA] outline-none rounded-xl transition-all duration-300 focus:bg-[#1F2A3D] focus:shadow-lg placeholder-gray-400"
              whileFocus={{ scale: 1.01 }}
            />
            {name && (
              <motion.span 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F8E9CA]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✨
              </motion.span>
            )}
          </div>

          {/* 버튼 */}
          <motion.button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] py-5 text-xl font-bold rounded-xl shadow-md ${isAnimating ? 'animate-pulse' : ''}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {isAnimating ? '준비 중...' : '다음으로'}
          </motion.button>
        </motion.form>
      </div>

      <motion.div 
        className="fixed bottom-5 w-full text-center text-xs text-[#F8E9CA]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        재미있는 질문들이 기다리고 있어요
      </motion.div>
    </motion.div>
  );
};

export default NameInputPage;
