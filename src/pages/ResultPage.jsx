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
  const [shareSuccess, setShareSuccess] = useState(false);

  // 중복 호출 방지를 위한 플래그
  const isInitialMount = useRef(true);
  const profileApiRequestStarted = useRef(false);
  const cardGenerationStarted = useRef(false);

  // 프로필 데이터 생성 - 엄격하게 한 번만 호출되도록 z수정
  const generateProfileData = useCallback(async () => {
    // 이미 API 호출이 시작되었으면 중복 호출 방지
    if (profileApiRequestStarted.current) {
      console.log("이미 프로필 API 요청이 시작되었습니다");
      return;
    }

    if (!questionsList || questionsList.length < 1) {
      setError("퀴즈 응답 데이터가 없습니다. 처음부터 다시 시작해주세요.");
      setIsLoading(false);
      return;
    }

    if (!userData || !userData.job) {
      setError("직업 정보가 없습니다. 처음부터 다시 시작해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      profileApiRequestStarted.current = true;
      console.log("프로필 생성 API 호출 시도", {
        questionsList: questionsList,
        job: userData.job,
      });

      // 로컬 스토리지에서 확인
      const cacheKey = `profile-${userData.job}-${questionsList.length}`;
      const cachedResult = sessionStorage.getItem(cacheKey);
      if (cachedResult) {
        console.log("캐시된 결과 사용");
        setProfileResult(JSON.parse(cachedResult));
        setIsLoading(false);
        return;
      }

      const response = await profileGenerate(questionsList, userData.job);
      console.log("프로필 생성 API 호출 성공", response);

      // 응답 캐싱
      if (response && response.data) {
        sessionStorage.setItem(cacheKey, JSON.stringify(response.data));
        setProfileResult(response.data);
      } else {
        throw new Error("API 응답에 데이터가 없습니다");
      }
    } catch (error) {
      console.error("프로필 생성 오류:", error);
      if (error.message === "EMPTY_QUIZ_DATA") {
        setError("퀴즈 데이터가 비어있습니다. 처음부터 다시 시작해주세요.");
      } else if (error.message === "EMPTY_JOB") {
        setError("직업 정보가 없습니다. 처음부터 다시 시작해주세요.");
      } else {
        setError(`프로필 생성 중 오류가 발생했습니다: ${error.message}`);
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
      profileApiRequestStarted.current = false;
      cardGenerationStarted.current = false;
      isInitialMount.current = true;
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
  }, );

  // 프로필 카드 저장
  const handleSaveCard = () => {
    if (profileCardImage) {
      const link = document.createElement("a");
      link.href = profileCardImage;
      link.download = `${userData.name || "프로필"}_카드.png`;
      link.click();
    }
  };

  // 퀴즈 공유 기능
  const handleShare = async () => {
    const shareUrl = "https://www.couplegungjeon.store";
    const shareTitle = "커플궁전 - 당신만의 개성을 담은 연애,결혼 가치관 프로필 카드";
    const shareText = "재미있는 퀴즈로 당신만의 개성이 담긴 커플궁전 프로필을 만들어 드려요";

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      console.error("공유하기 실패:", error);
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
        <div className="p-4 text-white rounded-lg mt-6 w-custom max-w-custom mx-auto">
          {error}
          <button
            className="mt-3 px-4 py-2 bg-white text-white rounded-lg text-sm"
            onClick={() => navigate("/")}
          >
            다시 시작하기
          </button>
        </div>
      )}

      {isLoading && !error && (
        <div className="flex flex-col items-center justify-center h-[70vh] w-custom max-w-custom mx-auto">
          <div className="w-12 h-12 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white text-base">결과를 생성 중입니다...</p>
        </div>
      )}

      {!isLoading && !error && profileCardImage && (
        <motion.div
          className="flex flex-col items-center w-custom max-w-custom mx-auto px-4 mt-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-white text-2xl font-bold mb-6 text-center" style={{ fontFamily: "'HSBombaram', sans-serif" }}>
            {userData.name}님의 
            <div>커플궁전 프로필 카드</div>
          </div>

          <div className="w-full flex justify-center mb-6">
            <img
              src={profileCardImage}
              alt="프로필 카드"
              className="w-full shadow-lg"
            />
          </div>

          <div className="flex flex-col w-full space-y-3">
            <button
              onClick={handleSaveCard}
              className="w-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] py-5 text-xl font-bold rounded-xl shadow-md"
            >
              카드 저장하기
            </button>
            <button
              onClick={handleShare}
              className="w-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] py-5 text-xl font-bold rounded-xl shadow-md"
            >
              퀴즈 공유하기
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="bg-gray-700/50 backdrop-blur-sm text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700/70 transition-colors nav-button"
            >
              처음으로 돌아가기
            </button>
          </div>
        </motion.div>
      )}

      {shareSuccess && (
        <motion.div 
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#F8E9CA] text-[#2A2E3D] px-6 py-3 rounded-full shadow-lg z-50"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          링크가 복사되었어요! 친구들에게 공유해보세요 💌
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResultPage;
