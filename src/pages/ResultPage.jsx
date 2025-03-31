import React, { useEffect, useMemo, useState } from "react";
import profileGenerate from "../api/profileGenerate";
import usePhotoStore from "../store/photoStore";
import useQuizStore from "../store/quizStore";
import useUserStore from "../store/userStore";

const ResultPage = () => {
  const questionsList = useQuizStore((state) => state.questionsList);
  const userData = useUserStore((state) => state.userData);
  const photoData = usePhotoStore((state) => state.photoData);
  const [profileResult, setProfileResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // photoData가 Blob 객체라면, object URL을 생성 (메모이제이션 적용)
  const photoURL = useMemo(() => {
    return photoData ? URL.createObjectURL(photoData) : null;
  }, [photoData]);

  useEffect(() => {
    const generateProfileData = async () => {
      if (questionsList.length >= 1) {
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
  }, [questionsList, userData.job]);
  
  if (error) {
    return <div className="w-full text-center text-red-500 p-4">{error}</div>;
  }
  
  return (
    <div className="w-full flex flex-col items-center text-center p-4 max-w-3xl mx-auto">
      {/* 사용자 정보 표시 */}
      <div className="mb-6">
        <p className="text-lg">닉네임: {userData.name}</p>
        <p className="text-lg">직업: {userData.job}</p>
      </div>

      {/* 업로드된 이미지 결과 표시 */}
      {photoURL && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-2">내 프로필 사진</h3>
          <img
            src={photoURL}
            alt="업로드 결과"
            className="max-w-full h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* 프로필 생성 결과 */}
      {isLoading ? (
        <div className="text-center p-10">
          <p className="text-xl">결과를 생성 중입니다...</p>
          <p className="mt-2 text-gray-500">잠시만 기다려주세요</p>
        </div>
      ) : profileResult ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">나의 MBTI</h2>
            <p className="text-3xl font-bold text-blue-600">{profileResult.mbti}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">당신의 애칭</h2>
            <p className="text-3xl font-bold text-purple-600">{profileResult.nickname}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">결혼 조건</h2>
            <div className="text-left">
              {profileResult.marriage_conditions.map((condition, index) => (
                <p key={index} className="mb-4 whitespace-pre-line">{condition}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">결과 생성 중입니다</div>
      )}
    </div>
  );
};

export default ResultPage;
