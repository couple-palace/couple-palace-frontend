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
    <div className="w-full flex flex-col items-center px-4 py-6 text-center">
      {/* 진행 바 */}
      <ProgressBar progress={currentQuestion + 1} total={quizData.length} />

      {/* 문제 카드 */}
      <div className="mt-6 w-full max-w-[400px] bg-white shadow-md rounded-xl border-2 border-gray-200 px-6 py-8">
        <p className="text-gray-600 text-sm font-semibold">
          {currentQuestion + 1} / {quizData.length}
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-2">
          {quizData[currentQuestion].question}
        </h2>
      </div>

      {/* 옵션 버튼 - 간격 문제 해결안됨 */}
      <div className="mt-6 w-full max-w-[400px] flex flex-col space-y-6">
        {quizData[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className="block h-14 text-lg font-medium border border-gray-300 rounded-lg bg-white hover:bg-blue-500 hover:text-white transition shadow-md"
            style={{ width: "-webkit-fill-available" }} // ✅ width: -webkit-fill-available 적용. 다른 기기의 경우 추가 설정 필요할 수 있음
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
