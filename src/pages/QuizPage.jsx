import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const setAnswer = useQuizStore((state) => state.setAnswer);
  const navigate = useNavigate();

  // quizData 로딩 및 유효성 검사
  useEffect(() => {
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
  }, []);

  const handleSelect = (optionIndex) => {
    if (!quizData || !quizData[currentQuestion]) return;
    
    const selectedQuestion = quizData[currentQuestion];
    setAnswer(selectedQuestion.question_idx, optionIndex, selectedQuestion.type);
    
    // 선택 효과를 위한 짧은 지연
    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // 마지막 질문 후 다음 페이지로 이동
        navigate("/user-input");
      }
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
  
  // 디버깅을 위한 데이터 출력
  console.log("현재 질문:", currentQuestion, currentQuizQuestion);
  console.log("선택지 배열:", options);

  // 에러 화면
  if (hasError) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-white">
        <div className="p-6 bg-[#1C2333]/70 backdrop-blur-sm border border-red-500/40 rounded-xl text-center max-w-md">
          <h2 className="text-xl font-medium text-[#F8E9CA] mb-4">퀴즈를 불러오는데 문제가 발생했습니다</h2>
          <p className="text-[#F8E9CA]/70 mb-6">잠시 후 다시 시도해주세요</p>
          <button 
            className="px-6 py-3 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] rounded-xl font-medium"
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
      <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-white">
        <div className="w-16 h-16 border-4 border-[#F8E9CA]/30 border-t-[#F8E9CA] rounded-full animate-spin mb-4"></div>
        <p className="text-[#F8E9CA]">퀴즈를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="w-full min-h-screen flex flex-col items-center px-6 py-8 bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* 상단 진행 상태 */}
      <motion.div 
        className="w-full max-w-md mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#F8E9CA]/80">질문 {currentQuestion + 1}/{quizData?.length || 0}</span>
          <span className="text-sm font-medium text-[#F8E9CA]">{Math.round(progress)}%</span>
        </div>
        
        <div className="w-full h-2 bg-[#1C2333] rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700]"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* 애니메이션으로 질문 전환 */}
      <div className="w-full max-w-md flex-grow flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="bg-[#1C2333]/70 p-6 rounded-2xl shadow-lg border border-[#F8E9CA]/10 backdrop-blur-sm"
          >
            <motion.div 
              className="mb-8"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <p className="text-xs text-[#F8E9CA]/60 mb-2">질문 {currentQuestion + 1}</p>
              <h3 className="text-xl font-medium text-[#F8E9CA]">{questionText}</h3>
            </motion.div>

            <div className="space-y-3">
              {options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className="w-full text-left p-4 bg-[#2A1B3D]/70 hover:bg-[#3D2A50] border border-[#F8E9CA]/20 rounded-xl transition-all duration-200"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(61, 42, 80, 0.9)" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.3 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 팁 */}
      <motion.p 
        className="mt-6 text-xs text-center text-[#F8E9CA]/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        정답은 없어요. 자신의 생각을 솔직하게 선택해 주세요
      </motion.p>
    </motion.div>
  );
};

export default QuizPage;
