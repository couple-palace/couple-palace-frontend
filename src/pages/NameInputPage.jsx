import React, { useState } from "react";
import useQuizStore from "../store/quizStore";
import { useNavigate } from "react-router-dom";

const NameInputPage = ({ onNext }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const setStoreName = useQuizStore((state) => state.setName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setStoreName(name); // Zustand에 이름 저장 (userData.name)
      onNext();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[#121826] text-white">
      <div className="w-full max-w-md">
        {/* 제목 및 설명 */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">프로젝트 소개</h2>
          <p className="text-lg opacity-80 mb-3">
            닉네임을 생성하기 위해 이름을 입력해주세요
          </p>
          <p className="text-sm opacity-60">
            결과 화면에서만 사용되며 저장되지 않습니다
          </p>
        </div>

        {/* 입력 폼 */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              required
              placeholder="이름 또는 닉네임을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-5 text-lg bg-[#1C2333] border border-[#F8E9CA]/40 focus:border-[#F8E9CA] outline-none rounded-lg transition-all duration-300 focus:bg-[#1F2A3D] focus:shadow-md placeholder-gray-400"
            />
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            onClick={() => navigate("/quiz")}
            className="w-full bg-[#F8E9CA] text-[#2A2E3D] py-5 text-xl font-bold rounded-lg transition-transform duration-200 hover:scale-[1.05] active:scale-[0.98] shadow-md"
          >
            다음으로
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInputPage;
