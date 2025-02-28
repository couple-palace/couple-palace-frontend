import React, { useState } from "react";
import useQuizStore from "../store/quizStore";

const UserForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [photo, setPhoto] = useState(null);
  const setUserData = useQuizStore((state) => state.setUserData);

  const handleSubmit = () => {
    setUserData({ name, job, photo });
    onSubmit();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="이름을 입력하세요"
        className="w-full p-3 border rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
  );
};

export default UserForm;
