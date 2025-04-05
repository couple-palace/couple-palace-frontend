import axios from "axios";

// 요청 중복 방지를 위한 토큰 보관
let requestInProgress = false;
let lastRequestData = null;

const generateProfile = async (quizData, job) => {
  const profileData = {
    job,
    questionsList: quizData,
  };
  
  // 이전과 동일한 요청이거나 이미 요청 중인지 확인
  const currentRequestData = JSON.stringify(profileData);
  if (requestInProgress) {
    console.log("이미 진행 중인 요청이 있습니다.");
    throw new Error("REQUEST_IN_PROGRESS");
  }
  
  if (lastRequestData === currentRequestData) {
    console.log("동일한 요청이 감지되었습니다.");
    throw new Error("DUPLICATE_REQUEST");
  }
  
  try {
    requestInProgress = true;
    lastRequestData = currentRequestData;
    console.log("프로필 생성 API 요청 시작");
    
    const response = await axios.post(`/api/v1/profile/generate/pf`, profileData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("프로필 생성 API 요청 성공");
    return response;
  } finally {
    requestInProgress = false;
  }
};

// 토큰 초기화 메서드 (테스트용)
const resetToken = () => {
  requestInProgress = false;
  lastRequestData = null;
};

export default generateProfile;
export { resetToken };
