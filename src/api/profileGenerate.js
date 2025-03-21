import axios from "axios";

const generateProfile = (quizData) => {
    const profileData = {
        quizResult : quizData,
    };
  return axios.post(`https://server.couplegungjeon.store/api/v1/profile/generate`, profileData);
};

export default generateProfile;
