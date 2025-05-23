import React, { useState, useEffect, useRef } from "react";
import useQuizStore from "../store/quizStore";
import { useNavigate } from "react-router-dom";

// 데이터 구조 변환 함수 추가
const normalizeQuizData = (data) => {
  if (!data || !Array.isArray(data)) return [];
  
  return data.map(item => ({
    ...item,
    // answer 배열을 options 배열로 매핑 (기존 데이터 구조 유지하면서 호환성 추가)
    options: item.answer || item.options || []
  }));
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Add state to track submission
  const [selectedOption, setSelectedOption] = useState(null); // Add state to track selected option
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const resetQuestions = useQuizStore((state) => state.resetQuestions); // resetQuestions 추가
  const navigate = useNavigate();
  const activeButtonRef = useRef(null);

  // 터치 이벤트로 포커스 해제 처리를 위한 핸들러
  const handleTouchStart = (e) => {
    // 터치 이벤트 대상을 저장
    activeButtonRef.current = e.currentTarget;
  };
  
  const handleTouchEnd = (e) => {
    // 터치가 끝나면 모든 포커스 제거
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // 특정 엘리먼트 포커스 해제
    if (activeButtonRef.current) {
      activeButtonRef.current.blur();
    }
    
    // iOS Safari에서 특히 효과적
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100);
  };

  // 포커스 완전 방지를 위한 핸들러
  const preventFocus = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // quizData 로딩 및 유효성 검사
  useEffect(() => {
    // 퀴즈 시작 시 questionsList 초기화
    resetQuestions();

    const loadQuizData = async () => {
      try {
        // 정적 import로 불러오기 시도
        const importedData = await import("../data/quizData").catch(err => {
          console.error("정적 import 실패:", err);
          return { default: null };
        });
        
        let data = importedData.default;
        
        // quizData.js가 default export가 아닌 named export인 경우 대비
        if (!data && importedData.quizData) {
          data = importedData.quizData;
        }
        
        console.log("불러온 퀴즈 데이터:", data);
        
        // 유효한 데이터인지 검증
        if (data && Array.isArray(data) && data.length > 0) {
          // 데이터 구조 정규화 (answer -> options 매핑)
          const normalizedData = normalizeQuizData(data);
          console.log("정규화된 퀴즈 데이터:", normalizedData);
          setQuizData(normalizedData);
        } else {
          console.warn("유효한 퀴즈 데이터가 없습니다.");
          setHasError(true);
        }
      } catch (error) {
        console.error("퀴즈 데이터 로딩 중 오류:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadQuizData();
  }, [resetQuestions]);

  // Reset selected option whenever the question changes
  useEffect(() => {
    setSelectedOption(null);
    // Clear any active focus when question changes
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    
    // 추가: iOS Safari와 일부 Android 브라우저를 위한 지연 blur 처리
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    }, 100);
  }, [currentQuestion]);

  const handleSelect = (optionIndex) => {
    if (!quizData || !quizData[currentQuestion] || isSubmitting) return;
    
    setIsSubmitting(true); // Prevent multiple rapid submissions
    setSelectedOption(optionIndex); // Set the selected option
    
    const selectedQuestion = quizData[currentQuestion];
    setAnswer(selectedQuestion.question_idx, optionIndex, selectedQuestion.type);
    
    // 선택 효과를 위한 짧은 지연
    setTimeout(() => {
      // Remove focus from the button before navigating
      if (activeButtonRef.current && activeButtonRef.current instanceof HTMLElement) {
        activeButtonRef.current.blur();
      }
      
      // 모든 활성 엘리먼트의 포커스 제거 (더 강력한 처리)
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 마지막 질문 후 다음 페이지로 이동
        navigate("/user-input");
      }
      setIsSubmitting(false); // Re-enable submissions after navigation
    }, 300);
  };

  // 진행률 계산
  const progress = quizData && quizData.length 
    ? ((currentQuestion + 1) / quizData.length) * 100 
    : 0;

  // 현재 질문과 선택지 안전하게 접근
  const currentQuizQuestion = quizData && quizData[currentQuestion];
  const questionText = currentQuizQuestion?.question || "질문을 불러오는 중...";
  const options = currentQuizQuestion?.options || [];
  
  // // 디버깅을 위한 데이터 출력
  // console.log("현재 질문:", currentQuestion, currentQuizQuestion);
  // console.log("선택지 배열:", options);

  // 에러 화면
  if (hasError) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-8 text-white">
        <div className="p-6 bg-[#1C2333]/70 backdrop-blur-sm border border-red-500/40 rounded-xl text-center max-w-md">
          <h2 className="text-xl font-medium text-[#F8E9CA] mb-4">퀴즈를 불러오는데 문제가 발생했습니다</h2>
          <p className="text-[#F8E9CA]/70 mb-6">잠시 후 다시 시도해주세요</p>
          <button 
            className="px-6 py-3 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] rounded-xl font-medium webkit-backdrop-fix"
            onClick={() => navigate("/")}
          >
            처음으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 로딩 화면
  if (isLoading || !quizData) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-8  text-white">
        <div className="w-16 h-16 border-4 border-[#F8E9CA]/30 border-t-[#F8E9CA] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F8E9CA]">퀴즈를 불러오는 중...</p>
      </div>
    );
  }

  return (
    
    <div className="w-full min-h-screen flex flex-col items-center justify-center  text-white">
      {/* 질문 전환 */}
      <div className="bg-[#1C2333]/70 p-6 rounded-2xl shadow-lg border border-[#F8E9CA]/10 backdrop-blur-sm">
        <div className="w-full max-w-md flex-grow flex flex-col justify-center">
      <div className="w-full max-w-md mb-8">
        {/* Progress bar */}
        <div style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#1C2333',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '10px',
          border: '1px solid rgba(248, 233, 202, 0.1)'
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#F8E9CA',
            borderRadius: '10px',
            transition: 'width 0.3s ease-out'
          }}></div>
        </div>
        
      </div>
          <div className="mb-8">
            <p className="text-xs text-[#F8E9CA]/60 mb-2">질문 {currentQuestion + 1}</p>
            <h3 className="text-xl font-medium text-[#F8E9CA]">{questionText}</h3>
          </div>

          {/* 선택지 컨테이너 */}
          <div className="flex flex-col min-h-[280px]">
            {options.map((option, idx) => (
              <div
                key={`q${currentQuestion}-opt${idx}`}
                onClick={() => handleSelect(idx)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                role="button"
                aria-label={`선택지: ${option}`}
                spellCheck="false"
                className="quiz-option p-5 bg-[#2A1B3D]/70 hover:bg-[#3D2A50] rounded-xl transition-all duration-200 hover:transform hover:scale-[1.02] active:transform active:scale-[1.05] hover:border-[#F8E9CA]/40 cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;