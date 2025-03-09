import React from "react";

const QuizQuestion = ({ question, options, onSelect }) => {
  return (
    <div className="w-full max-w-[400px] text-center p-6">
      <h2 className="text-2xl font-semibold mb-6">{question}</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className="w-full p-4 bg-[#F8E9CA]/10 rounded-lg text-left hover:bg-[#F8E9CA]/20 transition-colors duration-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
