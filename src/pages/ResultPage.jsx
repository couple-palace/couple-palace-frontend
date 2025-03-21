import React, { useMemo } from "react";
import useQuizStore from "../store/quizStore";
import useUserStore from "../store/userStore";
import usePhotoStore from "../store/photoStore";

const ResultPage = () => {
  const questionsList = useQuizStore((state) => state.questionsList);
  const userData = useUserStore((state) => state.userData);
  const photoData = usePhotoStore((state) => state.photoData);

  // photoData가 Blob 객체라면, object URL을 생성 (메모이제이션 적용)
  const photoURL = useMemo(() => {
    return photoData ? URL.createObjectURL(photoData) : null;
  }, [photoData]);

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
