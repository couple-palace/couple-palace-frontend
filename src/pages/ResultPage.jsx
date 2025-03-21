import React, { useEffect, useMemo } from "react";
import profileGenerate from "../api/profileGenerate";
import usePhotoStore from "../store/photoStore";
import useQuizStore from "../store/quizStore";
import useUserStore from "../store/userStore";

const ResultPage = () => {
  const questionsList = useQuizStore((state) => state.questionsList);
  const userData = useUserStore((state) => state.userData);
  const photoData = usePhotoStore((state) => state.photoData);

  // photoData가 Blob 객체라면, object URL을 생성 (메모이제이션 적용)
  const photoURL = useMemo(() => {
    return photoData ? URL.createObjectURL(photoData) : null;
  }, [photoData]);

  useEffect(  () => {
    const generateProfile = async () => {

    if (questionsList.length >= 1) {
      try {
        const response = await profileGenerate(
          questionsList,
        );
        console.log("결과 생성 성공:", response);
      }
      catch (error) {
        console.error("결과 생성 실패:", error);
      }
    }
  }
  generateProfile();
}
  , []);
  
  return (
    <div className="w-full flex flex-col items-center text-center">
      {/* 사용자 정보 표시 */}
      <div className="mb-6">
        <p className="text-lg">닉네임: {userData.name}</p>
        <p className="text-lg">직업: {userData.job}</p>
      </div>

      {/* 업로드된 이미지 결과 표시 */}
      {photoURL ? (
        <img
          src={photoURL}
          alt="업로드 결과"
          className="max-w-full h-auto rounded-lg shadow-md"
        />
      ) : (
        <div className="text-center">결과 생성 중입니다</div>
      )}
    </div>
  );
};

export default ResultPage;
