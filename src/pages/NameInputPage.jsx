import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const NameInputPage = ({ onNext }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const inputRef = useRef(null);
  const setStoreName = useUserStore((state) => state.setName);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const MAX_NAME_LENGTH = 8; // 이름 최대 길이 상수 정의

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      // 이름이 비어있을 때 흔들림 애니메이션 적용
      setIsShaking(true);
      
      // 애니메이션 후 상태 초기화
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
      
      return;
    }
    
    if (name.length > MAX_NAME_LENGTH) {
      setErrorMsg(`이름은 최대 ${MAX_NAME_LENGTH}자까지만 입력 가능합니다.`);
      setIsShaking(true);
      
      // 애니메이션 후 상태 초기화
      setTimeout(() => {
        setIsShaking(false);
      }, 600);
      
      return;
    }
    
    // 유효한 입력이 있는 경우
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
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen px-6 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-custom max-w-custom mx-auto">
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
            나만의 특별한 프로필을 생성하기 위해<br />이름을 알려주세요
          </p>
          <motion.p 
            className="text-sm opacity-60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            결과 화면에서만 사용되며 저장되지 않아요
          </motion.p>
        </motion.div>

        {/* 입력 폼 - space-y 클래스 제거하고 고정 레이아웃 사용 */}
        <motion.form 
          onSubmit={handleSubmit} 
          className="flex flex-col"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          noValidate
        >
          <div className="mb-8">
            <div className="relative">
              <motion.input
                ref={inputRef}
                type="text"
                placeholder={`이름을 입력해주세요(최대 ${MAX_NAME_LENGTH}자)`}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value.length > MAX_NAME_LENGTH) {
                    setErrorMsg(`이름은 최대 ${MAX_NAME_LENGTH}자까지만 입력 가능합니다.`);
                  } else if (e.target.value.trim()) {
                    setErrorMsg("");
                  }
                }}
                className={`custom-input ${isShaking ? 'shake' : ''}`}
                whileFocus={{ scale: 1.01 }}
                maxLength={MAX_NAME_LENGTH + 5} // 약간의 여유를 두고 입력 제한
              />
              {name && (
                <motion.span 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F8E9CA]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                 
                </motion.span>
              )}
            </div>
            
            {/* 에러 메시지 영역 - 고정 높이로 공간 확보 */}
            <div className="h-6 mt-2">
              <AnimatePresence>
                {errorMsg && (
                  <motion.p 
                    className="text-sm text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
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
        className="fixed bottom-10 w-custom max-w-custom mx-auto text-center text-xs text-[#F8E9CA]/50"
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
