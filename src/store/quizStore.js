import { create } from "zustand";

const useQuizStore = create((set) => ({
  questionsList: [],
  userData: { name: "", job: "" },
  photoData: null,
  setAnswer: (question_idx, answer_idx, type) =>
    set((state) => ({
      questionsList: [
        ...state.questionsList,
        { question_idx, answer_idx, type },
      ],
    })),
  // 이름과 직업은 userData에 저장(서버에 보내지 않음)
  setUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data },
    })),
  // 사진 데이터는 별도 photoData에 저장(서버로 보냄)
  setPhotoData: (photo) =>
    set(() => ({
      photoData: photo,
    })),
  setName: (name) =>
    set((state) => ({
      userData: { ...state.userData, name },
    })),
  setJob: (job) =>
    set((state) => ({
      userData: { ...state.userData, job },
    })),
}));

export default useQuizStore;