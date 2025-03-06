import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import useQuizStore from "../store/quizStore";
import { useNavigate } from "react-router-dom";
import quizData from "../data/quizData"; // quizData 가져오기

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const navigate = useNavigate();

  const handleSelect = (optionIndex) => {
    const selectedQuestion = quizData[currentQuestion];
    setAnswer(selectedQuestion.id, optionIndex); // 문제 ID와 선택한 옵션 인덱스 저장

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/user-input");
    }
  };

  return (
    <div 
      className="w-full flex flex-col items-center px-4 py-6 text-center min-h-screen"
      style={{ backgroundColor: "#2A2E3D", color: "#F8E9CA" }} // ✅ 배경 & 글씨 색 적용
    >
      {/* 진행 바 */}
      <ProgressBar progress={currentQuestion + 1} total={quizData.length} />

      {/* 문제 카드 */}
      <div 
        className="mt-6 w-full max-w-[400px] shadow-md rounded-xl border-2 px-6 py-8"
        style={{ borderColor: "#F8E9CA", color: "#F8E9CA" }} // ✅ 카드 색상 변경
      >
        <p className="text-sm font-semibold" style={{ color: "#F8E9CA" }}>
          {currentQuestion + 1} / {quizData.length}
        </p>
        <h2 className="text-xl font-bold mt-2" style={{ color: "#F8E9CA" }}>
          {quizData[currentQuestion].question}
        </h2>
      </div>

      {/* 옵션 버튼 */}
      <div className="mt-6 w-full max-w-[400px] flex flex-col space-y-6">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className="block h-14 text-lg font-medium border rounded-lg transition shadow-md"
            style={{
              width: "100%",
              backgroundColor: "#F8E9CA", // ✅ 버튼 배경을 밝게
              color: "#2A2E3D", // ✅ 버튼 글씨를 어둡게
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
