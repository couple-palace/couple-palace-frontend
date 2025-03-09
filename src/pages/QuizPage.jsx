import React from "react";
import { useNavigate } from "react-router-dom";
import useQuizStore from "../store/quizStore";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import QuizQuestion from "../components/QuizQuestion";
import quizData from "../data/quizData";

const QuizPage = () => {
  const { currentQuestion, setAnswer } = useQuizStore();
  const navigate = useNavigate();

  const handleSelect = (option) => {
    setAnswer(quizData[currentQuestion].id, option);

    if (currentQuestion + 1 < quizData.length) {
      setAnswer(currentQuestion + 1);
    } else {
      navigate("/result");
    }
  };

  return (
    <Layout>
      <ProgressBar progress={currentQuestion + 1} total={quizData.length} />
      <QuizQuestion
        question={quizData[currentQuestion].question}
        options={quizData[currentQuestion].options}
        onSelect={handleSelect}
      />
    </Layout>
  );
};

export default QuizPage;
