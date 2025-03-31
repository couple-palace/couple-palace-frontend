import axios from "axios";

const generateProfile = (quizData, job) => {
  const profileData = {
    job,
    questionsList: quizData,
  };
  
  return axios.post(`/api/v1/profile/generate`, profileData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export default generateProfile;
