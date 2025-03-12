import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    // question_idx, 선택한 답의 인덱스, type 값을 함께 zustand 스토어에 저장
    setAnswer(selectedQuestion.question_idx, optionIndex, selectedQuestion.type);

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/user-input");
    }
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6 text-center">
      {/* 프로그레스 바 */}
      {/* <ProgressBar progress={currentQuestion + 1} total={quizData.length} /> */}

      {/* AnimatePresence로 질문 전환 애니메이션 적용 */}
      <div className="relative w-full max-w-[400px] mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full"
          >
            <QuizQuestion quiz={quizData[currentQuestion]} onSelect={handleSelect} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
