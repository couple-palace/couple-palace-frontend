import axios from "axios";

// 단순화된 함수로 재작성
const generateProfile = async (quizData, job) => {
  // 입력 데이터 검증
  if (!quizData || !quizData.length) {
    console.error("퀴즈 데이터가 비어있습니다");
    throw new Error("EMPTY_QUIZ_DATA");
  }
  
  if (!job) {
    console.error("직업 정보가 없습니다");
    throw new Error("EMPTY_JOB");
  }

  const profileData = {
    job,
    questionsList: quizData,
  };
  
  console.log("프로필 생성 API 요청 시작", profileData);
  
  try {
    // API 호출 단순화
    const response = await axios.post(`/api/v1/profile/generate/pf`, profileData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("프로필 생성 API 요청 성공");
    return response;
  } catch (error) {
    console.error("프로필 생성 API 요청 실패:", error);
    throw error;
  }
};

export default generateProfile;
