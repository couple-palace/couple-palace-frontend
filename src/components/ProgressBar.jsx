import React from "react";
import { motion } from "framer-motion";

const ProgressBar = ({ progress, total }) => {
  const percentage = (progress / total) * 100;
  console.log("Progress:", progress, "Total:", total, "Percentage:", percentage); // 디버깅 로그

  return (
    <div className="w-full bg-gray-300 rounded-full h-6 shadow-md border border-gray-400 relative">
      {/* ✅ 진행 바 애니메이션 적용 (높이 키우고, width를 숫자로 변환) */}
      <motion.div
        className="h-6 bg-green-500 rounded-full"
        initial={{ width: "0%" }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{ minWidth: "5%" }} // ✅ 최소 크기 지정 (너무 작아서 안 보이는 경우 방지)
      >
        {/* ✅ 스트라이프 패턴 효과 */}
        <div className="absolute inset-0 bg-stripe opacity-30 animate-stripe"></div>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
