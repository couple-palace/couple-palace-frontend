import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useUserStore from "../store/userStore";
import usePhotoStore from "../store/photoStore";
import photoBackground from "../api/photoBackground";

const UserInputPage = () => {
  const [job, setJob] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const setUserData = useUserStore((state) => state.setUserData);
  const setPhotoData = usePhotoStore((state) => state.setPhotoData);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // 파일 크기 제한 (5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("이미지 크기는 5MB 이하여야 합니다");
        return;
      }
      
      // 이미지 타입 확인
      if (!selectedFile.type.startsWith('image/')) {
        setError("이미지 파일만 업로드 가능합니다");
        return;
      }
      
      setPhoto(selectedFile);
      setError("");
      
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!job.trim()) {
      setError("직업을 입력해주세요");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      return;
    }
    
    setIsLoading(true);
    
    // 직업은 userData에 저장
    setUserData({ job });

    // 사진은 서버에 업로드
    if (photo) {
      try {
        const response = await photoBackground.uploadPhoto(photo);
        setPhotoData(response.data);
        navigate("/result");
      } catch (error) {
        console.error("사진 업로드 실패:", error);
        setError(`사진 업로드 중 오류: ${error.message}`);
        setIsLoading(false);
      }
    } else {
      // 사진이 없어도 다음 페이지로 이동
      navigate("/result");
    }
  };

  return (
    <motion.div 
      className="min-h-screen w-full flex flex-col items-center p-6 bg-gradient-to-b from-[#2a1b3d] to-[#1a0b2e] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-full max-w-md mt-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2 text-center bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-transparent bg-clip-text">
          프로필 정보
        </h1>
        <p className="text-center text-[#F8E9CA]/70 mb-8">거의 다 왔어요! 마지막 단계입니다</p>
        
        {/* 입력 폼 */}
        <motion.div 
          className="bg-[#1C2333]/70 backdrop-blur-sm border border-[#F8E9CA]/20 rounded-xl p-6 shadow-lg mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* 직업 입력 */}
          <div className="mb-6">
            <label className="block text-[#F8E9CA] text-sm font-medium mb-2">
              직업 
              <span className="text-[#FFD700] ml-1">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="당신의 직업을 입력해주세요"
                className={`custom-input ${isShaking ? 'shake' : ''}`}
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
              {job && (
                <motion.span 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#F8E9CA]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  ✓
                </motion.span>
              )}
            </div>
          </div>
          
          {/* 사진 업로드 */}
          <div>
            <label className="block text-[#F8E9CA] text-sm font-medium mb-2">
              프로필 사진 (선택사항)
            </label>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-[#F8E9CA]/30 rounded-xl p-4 bg-[#2A1B3D]/30 hover:bg-[#2A1B3D]/50 transition-colors duration-300 cursor-pointer relative overflow-hidden" onClick={() => document.getElementById('photoUpload').click()}>
              <input
                id="photoUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              
              {photoPreview ? (
                <div className="relative w-full max-w-[160px] mx-auto">
                  <img 
                    src={photoPreview} 
                    alt="미리보기" 
                    className="w-full h-auto max-h-24 object-contain rounded-lg"
                  />
                  <div className="absolute top-1 right-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setPhoto(null);
                        setPhotoPreview(null);
                      }}
                      className="bg-[#2A1B3D]/70 hover:bg-[#2A1B3D] p-1 rounded-full"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center space-y-2">
                  <svg className="w-12 h-12 text-[#F8E9CA]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p className="text-[#F8E9CA]/70">클릭하여 이미지 업로드</p>
                  <p className="text-xs text-[#F8E9CA]/50">png, jpg, heic, heif 파일만 올려주세요</p>
                </div>
              )}
            </div>
          </div>
          
          {/* 에러 메시지 */}
          {error && (
            <motion.div 
              className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg text-red-300 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
        </motion.div>
        
        {/* 버튼 */}
        <motion.button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] py-4 text-lg font-bold rounded-xl shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}`}
          whileHover={!isLoading ? { scale: 1.03 } : {}}
          whileTap={!isLoading ? { scale: 0.98 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-[#2A2E3D]/30 border-t-[#2A2E3D] rounded-full animate-spin mr-2"></div>
              처리 중...
            </div>
          ) : '프로필 생성하기'}
        </motion.button>
        
        <motion.p 
          className="text-center mt-4 text-xs text-[#F8E9CA]/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          입력한 정보는 결과 화면에만 사용되며 저장되지 않습니다
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default UserInputPage;
