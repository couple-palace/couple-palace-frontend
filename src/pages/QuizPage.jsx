import React, { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import QuizQuestion from "../components/QuizQuestion";
import useQuizStore from "../store/quizStore";
import { useNavigate } from "react-router-dom";

const questions = [
  { question: "연애 스타일을 한마디로?", options: ["직진", "밀당", "느긋함", "쿨함"] },
  { question: "싸우면 어떻게 해결?", options: ["먼저 사과", "기다린다", "논리적으로 풀기", "감정적으로 해결"] },
  { question: "소개팅에서 가장 중요?", options: ["외모", "대화", "분위기", "성격"] }
];

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setAnswer(questions[currentQuestion].question, option);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/user-input");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <ProgressBar progress={currentQuestion + 1} total={questions.length} />
      <QuizQuestion
        question={questions[currentQuestion].question}
        options={questions[currentQuestion].options}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default QuizPage;
