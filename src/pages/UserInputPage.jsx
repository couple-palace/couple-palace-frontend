import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import usePhotoStore from "../store/photoStore";
import photoBackground from "../api/photoBackground";

const UserInputPage = () => {
  const [job, setJob] = useState("");
  const [photo, setPhoto] = useState(null);
  const setUserData = useUserStore((state) => state.setUserData);
  const setPhotoData = usePhotoStore((state) => state.setPhotoData);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // 직업은 userData에 저장 (서버에 보내지 않음)
    setUserData({ job });

    // 사진은 서버에 업로드하고, 응답 데이터를 photoStore에 저장
    if (photo) {
      try {
        const response = await photoBackground.uploadPhoto(photo);
        setPhotoData(response.data);
      } catch (error) {
        console.error("사진 업로드 실패:", error);
      }
    }
    navigate("/result");
  };

  return (
    <div className="w-full flex flex-col items-center text-center">
      <h1 className="text-2xl font-bold mb-4">프로필 정보 입력</h1>
      <div className="w-full flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="직업을 입력하세요"
          className="w-full p-3 border rounded-lg"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <input
          type="file"
          className="w-full p-3"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
        <button
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSubmit}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default UserInputPage;
