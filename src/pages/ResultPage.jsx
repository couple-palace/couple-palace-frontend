// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout";
// import { fetchNickname } from "../api/submitQuiz";  // ✅ named export 가져오기
// import useQuizStore from "../store/quizStore";

// const ResultPage = () => {
//   const { answers } = useQuizStore();
//   const navigate = useNavigate();
//   const [nickname, setNickname] = useState("로딩 중...");

//   useEffect(() => {
//     const getNickname = async () => {
//       const response = await fetchNickname(answers);
//       setNickname(response.nickname);
//     };
//     getNickname();
//   }, [answers]);

//   return (
//     <Layout>
//       <h2 className="text-3xl font-bold mb-4">당신의 연애 스타일 결과</h2>
//       <p className="text-2xl text-[#F8E9CA] font-semibold mb-2">{nickname}</p>
//       <button
//         onClick={() => navigate("/")}
//         className="w-full bg-[#F8E9CA] text-[#2A2E3D] py-4 rounded-lg"
//       >
//         다시하기
//       </button>
//     </Layout>
//   );
// };

// export default ResultPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { fetchNickname } from "../api/submitQuiz";  
import useQuizStore from "../store/quizStore";

const ResultPage = () => {
  const { answers } = useQuizStore();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("로딩 중...");

  useEffect(() => {
    const getNickname = async () => {
      const response = await fetchNickname(answers);
      setNickname(response.nickname);
    };
    getNickname();
  }, [answers]);

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4">당신의 연애 스타일 결과</h2>
      <p className="text-2xl text-[#F8E9CA] font-semibold mb-2">{nickname}</p>
      <button
        onClick={() => navigate("/")}
        className="w-full bg-[#F8E9CA] text-[#2A2E3D] py-4 rounded-lg"
      >
        다시하기
      </button>
    </Layout>
  );
};

export default ResultPage;
