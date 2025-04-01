import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ progress, total }) => {
  // 퍼센트 계산 (0으로 나누기 방지)
  const percentage = total > 0 ? (progress / total) * 100 : 0;
  
  // 콘솔 로그로 확인
  console.log("Progress:", progress, "Total:", total, "Percentage:", percentage);

  return (
    <div className="w-full h-3 bg-[#1C2333] rounded-full overflow-hidden shadow-inner border border-[#F8E9CA]/10">
      <motion.div 
        className="h-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] rounded-full shadow-lg relative"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ minWidth: "2%" }} // 최소 너비 설정
      >
        {/* 스트라이프 효과 추가 */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
