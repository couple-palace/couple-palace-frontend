import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import profileGenerate from "../api/profileGenerate";
import usePhotoStore from "../store/photoStore";
import useQuizStore from "../store/quizStore";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
import profileBackground from "../assets/profile_background.png";
import generateProfileCard from "../utils/profileCardGenerator";

const ResultPage = () => {
  const navigate = useNavigate();
  const questionsList = useQuizStore((state) => state.questionsList);
  const userData = useUserStore((state) => state.userData);
  const photoData = usePhotoStore((state) => state.photoData);
  const [profileResult, setProfileResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [profileCardImage, setProfileCardImage] = useState(null);
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);

  // 프로필 데이터 생성
  useEffect(() => {
    const generateProfileData = async () => {
      if (questionsList.length >= 1) {
        try {
          setIsLoading(true);
          const response = await profileGenerate(questionsList, userData?.job);
          setProfileResult(response.data);
        } catch (error) {
          setError("프로필 생성 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("질문 데이터가 없습니다. 처음부터 다시 시작해주세요.");
        setIsLoading(false);
      }
    };

    generateProfileData();
  }, [questionsList, userData]);

  // 사진 URL 생성
  useEffect(() => {
    if (photoData && photoData instanceof Blob) {
      const url = URL.createObjectURL(photoData);
      setPhotoURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoData]);

  // 프로필 카드 이미지 생성
  useEffect(() => {
    const generateCard = async () => {
      if (userData && profileResult && photoURL) {
        try {
          setIsGeneratingCard(true);
          const cardImage = await generateProfileCard(userData, profileResult, photoURL);
          setProfileCardImage(cardImage);
        } catch (error) {
          console.error("카드 생성 오류:", error);
          setError("프로필 카드 생성 중 오류가 발생했습니다.");
        } finally {
          setIsGeneratingCard(false);
        }
      }
    };

    generateCard();
  }, [userData, profileResult, photoURL]);

  // 프로필 카드 저장
  const handleSaveCard = () => {
    if (profileCardImage) {
      const link = document.createElement("a");
      link.href = profileCardImage;
      link.download = `${userData.name || "프로필"}_카드.png`;
      link.click();
    }
  };

  return (
    <motion.div
      className="min-h-screen w-full flex flex-col items-center bg-cover bg-center pb-10"
      style={{ backgroundImage: `url(${profileBackground})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {error && (
        <div className="p-4 bg-red-500 text-white rounded-lg mt-6 max-w-sm">
          {error}
          <button
            className="mt-3 px-4 py-2 bg-white text-red-500 rounded-lg text-sm"
            onClick={() => navigate("/")}
          >
            다시 시작하기
          </button>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <div className="w-12 h-12 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-base">결과를 생성 중입니다...</p>
        </div>
      )}

      {!isLoading && !error && profileCardImage && (
        <motion.div
          className="flex flex-col items-center w-full max-w-md px-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-white text-2xl font-bold mb-6 text-center">
            당신만의 프로필 카드
          </h1>

          {/* 생성된 프로필 카드 이미지 */}
          <div className="w-full flex justify-center mb-6">
            <img
              src={profileCardImage}
              alt="프로필 카드"
              className="w-full max-w-[1024px] rounded-lg shadow-lg"
            />
          </div>

          {/* 버튼 그룹 */}
          <div className="flex flex-col w-full space-y-3">
            <button
              onClick={handleSaveCard}
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              카드 저장하기
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="bg-gray-700/50 backdrop-blur-sm text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700/70 transition-colors"
            >
              처음으로 돌아가기
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultPage;
