import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      {/* Fixed progress bar */}
      <div className="fixed inset-x-0 top-0 bg-white z-[9999] p-2">
        <ProgressBar progress={currentQuestion + 1} total={quizData.length} />
      </div>

      {/* Quiz question container - removed absolute positioning */}
      <div className="w-full max-w-[400px] mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-white shadow-md rounded-xl border-2 border-gray-200 px-6 py-8"
          >
            <p className="text-gray-600 text-sm font-semibold">
              {currentQuestion + 1} / {quizData.length}
            </p>
            <h2 className="text-xl font-bold text-gray-800 mt-2">
              {quizData[currentQuestion].question}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Option buttons container - removed absolute positioning */}
      <div className="w-full max-w-[400px] mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`options-${currentQuestion}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex flex-col space-y-6"
          >
            {quizData[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleSelect(index)}
                whileTap={{ scale: 0.95 }}
                className="block h-14 text-lg font-medium border border-gray-300 rounded-lg bg-white hover:bg-blue-500 hover:text-white transition shadow-md"
                style={{ width: "-webkit-fill-available" }}
              >
                {option}
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuizPage;
