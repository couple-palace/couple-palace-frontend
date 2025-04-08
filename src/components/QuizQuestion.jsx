import React from "react";

const QuizQuestion = ({ quiz, onSelect }) => {
  // 포커스 방지 핸들러
  const preventFocus = (e) => {
    e.preventDefault();
  };
  
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">
        {quiz.question_idx}. {quiz.question}
      </h2>
      <div className="w-full flex flex-col gap-3">
        {quiz.answer.map((option, index) => (
          <button
            key={index}
            className="quiz-option w-full py-3 px-4 bg-gray-100 rounded-lg hover:text-white transition"
            onClick={() => onSelect(index)}
            onMouseDown={preventFocus}
            tabIndex="-1"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;