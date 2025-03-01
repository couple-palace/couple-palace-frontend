import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import QuizQuestion from "../components/QuizQuestion";
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
    <div className="w-full flex flex-col items-center text-center">
      <ProgressBar progress={currentQuestion + 1} total={quizData.length} />
      <QuizQuestion
        question={quizData[currentQuestion].question}
        options={quizData[currentQuestion].options}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default QuizPage;
