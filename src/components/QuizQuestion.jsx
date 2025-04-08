import React from "react";

const QuizQuestion = ({ quiz, onSelect }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">
        {quiz.question_idx}. {quiz.question}
      </h2>
      <div className="w-full flex flex-col gap-3">
        {quiz.answer.map((option, index) => (
          <div
            key={index}
            className="quiz-option w-full py-3 px-4 bg-gray-100 rounded-lg hover:text-white transition cursor-pointer text-center hover:transform hover:scale-[1.02] active:transform active:scale-[1.05]"
            onClick={() => onSelect(index)}
            role="button"
            spellCheck="false"
            aria-label={`선택지: ${option}`}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;