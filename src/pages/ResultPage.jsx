import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import profileGenerate from "../api/profileGenerate";
import usePhotoStore from "../store/photoStore";
import useQuizStore from "../store/quizStore";
import useUserStore from "../store/userStore";
import { useNavigate } from "react-router-dom";
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
  
  // 중복 호출 방지를 위한 플래그
  const isInitialMount = useRef(true);
  const profileApiRequestStarted = useRef(false);
  const cardGenerationStarted = useRef(false);

  // 프로필 데이터 생성 - 엄격하게 한 번만 호출되도록 수정
  const generateProfileData = useCallback(async () => {
    // 이미 API 호출이 시작되었으면 중복 호출 방지
    if (profileApiRequestStarted.current) {
      console.log("이미 프로필 API 요청이 시작되었습니다");
      return;
    }
    
    if (questionsList.length < 1 || !userData?.job) {
      setError("질문 데이터가 없습니다. 처음부터 다시 시작해주세요.");
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      profileApiRequestStarted.current = true;
      console.log("프로필 생성 API 호출 시도");
      
      // 로컬 스토리지에서 확인
      const cachedResult = sessionStorage.getItem(`profile-${userData.job}-${questionsList.length}`);
      if (cachedResult) {
        console.log("캐시된 결과 사용");
        setProfileResult(JSON.parse(cachedResult));
        setIsLoading(false);
        return;
      }
      
      const response = await profileGenerate(questionsList, userData.job);
      console.log("프로필 생성 API 호출 성공");
      
      // 응답 캐싱
      sessionStorage.setItem(
        `profile-${userData.job}-${questionsList.length}`, 
        JSON.stringify(response.data)
      );
      
      setProfileResult(response.data);
    } catch (error) {
      console.error("프로필 생성 오류:", error);
      // 중복 요청이나 진행 중인 요청은 에러 표시하지 않음
      if (error.message !== "DUPLICATE_REQUEST" && error.message !== "REQUEST_IN_PROGRESS") {
        setError("프로필 생성 중 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [questionsList, userData]);

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      generateProfileData();
    }
    
    return () => {
      // 컴포넌트 언마운트 시 플래그 초기화
      profileApiRequestStarted.current = false;
      cardGenerationStarted.current = false;
      isInitialMount.current = true;
      
      // 세션 스토리지 데이터 지속
    };
  }, [generateProfileData]);

  // 사진 URL 생성
  useEffect(() => {
    if (photoData && photoData instanceof Blob) {
      const url = URL.createObjectURL(photoData);
      setPhotoURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [photoData]);

  // 프로필 카드 이미지 생성 - 한 번만 실행되도록 수정
  useEffect(() => {
    const generateCard = async () => {
      // 모든 데이터가 준비되었고, 아직 카드 생성이 시작되지 않았을 때만 실행
      if (userData && profileResult && photoURL && !cardGenerationStarted.current) {
        try {
          cardGenerationStarted.current = true;
          setIsGeneratingCard(true);
          console.log("프로필 카드 생성 시작");
          const cardImage = await generateProfileCard(userData, profileResult, photoURL);
          setProfileCardImage(cardImage);
        } catch (error) {
          console.error("카드 생성 오류:", error);
          setError("프로필 카드 생성 중 오류가 발생했습니다.");
          cardGenerationStarted.current = false;
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
