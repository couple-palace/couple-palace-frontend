import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import profileGenerate from "../api/profileGenerate";
import usePhotoStore from "../store/photoStore";
import useQuizStore from "../store/quizStore";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";

const ResultPage = () => {
  const navigate = useNavigate();
  const questionsList = useQuizStore((state) => state.questionsList);
  const userData = useUserStore((state) => state.userData);
  const photoData = usePhotoStore((state) => state.photoData);
  const [profileResult, setProfileResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiCallMade = useRef(false);

  // photoData가 Blob 객체라면, object URL을 생성 (메모이제이션 적용)
  const photoURL = useMemo(() => {
    return photoData ? URL.createObjectURL(photoData) : null;
  }, [photoData]);

  useEffect(() => {
    const generateProfileData = async () => {
      if (questionsList.length >= 1 && !apiCallMade.current) {
        apiCallMade.current = true;
        try {
          setIsLoading(true);
          const response = await profileGenerate(questionsList, userData.job);
          console.log("결과 생성 성공:", response.data);
          setProfileResult(response.data);
        } catch (error) {
          console.error("결과 생성 실패:", error);
          setError("프로필 생성 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    generateProfileData();
  }, []);

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="w-full max-w-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text">
          나만의 커플 궁전 프로필
        </h1>
        
        {/* 오류 표시 */}
        {error && (
          <motion.div 
            className="p-4 mb-6 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>{error}</p>
            <button 
              className="mt-3 px-4 py-2 bg-red-500/30 hover:bg-red-500/40 rounded-lg text-sm"
              onClick={() => navigate("/")}
            >
              다시 시작하기
            </button>
          </motion.div>
        )}
        
        {/* 로딩 표시 */}
        {isLoading && !error && (
          <motion.div 
            className="text-center p-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 border-4 border-[#F8E9CA]/30 border-t-[#F8E9CA] rounded-full animate-spin"></div>
            </div>
            <p className="text-xl text-[#F8E9CA] font-medium">당신만의 프로필을 생성 중...</p>
            <p className="mt-2 text-[#F8E9CA]/70">잠시만 기다려주세요</p>
          </motion.div>
        )}
        
        {/* 결과 표시 - 로딩이 끝나고 결과가 있는 경우 */}
        {!isLoading && !error && profileResult && (
          <motion.div 
            className="w-full space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* 사용자 정보 카드 */}
            <motion.div 
              className="bg-[#1C2333]/80 backdrop-blur-sm border border-[#F8E9CA]/20 rounded-xl p-6 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-[#F8E9CA]">{userData.name}</h2>
                  <p className="text-sm text-[#F8E9CA]/70">{userData.job || "직업 정보 없음"}</p>
                </div>
                <div className="bg-[#F8E9CA] text-[#2A1B3D] px-3 py-1 rounded-full text-sm font-bold">
                  {profileResult.mbti}
                </div>
              </div>
              
              {/* 애칭 표시 */}
              <div className="mt-4 mb-6">
                <p className="text-sm text-[#F8E9CA]/70 mb-1">당신의 애칭</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text">
                  {profileResult.nickname}
                </p>
              </div>
              
              {/* 업로드된 사진 표시 */}
              {photoURL && (
                <motion.div 
                  className="mt-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <p className="text-sm text-[#F8E9CA]/70 mb-2">프로필 사진</p>
                  <div className="relative rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={photoURL}
                      alt="프로필"
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1C2333]/70"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            
            {/* 결혼 조건 카드 */}
            <motion.div 
              className="bg-[#1C2333]/80 backdrop-blur-sm border border-[#F8E9CA]/20 rounded-xl p-6 shadow-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h2 className="text-xl font-bold mb-4 text-[#F8E9CA]">결혼 조건</h2>
              <div className="space-y-4">
                {profileResult.marriage_conditions.map((condition, index) => (
                  <motion.div 
                    key={index}
                    className="p-3 bg-[#2A1B3D]/50 rounded-lg border-l-2 border-[#F8E9CA]/60"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  >
                    <p className="whitespace-pre-line text-[#F8E9CA]/90">{condition}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* 공유 버튼 */}
            <motion.div 
              className="flex justify-center pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.button
                className="bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] px-8 py-3 rounded-xl font-bold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {/* 공유 기능 */}}
              >
                내 프로필 공유하기
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ResultPage;
