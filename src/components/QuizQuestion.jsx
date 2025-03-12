import React from "react";

const QuizQuestion = ({ quiz, onSelect }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">
        {quiz.question_idx}. {quiz.question}
      </h2>
      <div className="w-full flex flex-col gap-3">
        {quiz.answer.map((option, index) => (
          <button
            key={index}
            className="w-full py-3 px-4 bg-gray-100 rounded-lg hover:bg-blue-500 hover:text-white transition"
            onClick={() => onSelect(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;