import { create } from "zustand";

const useQuizStore = create((set) => ({
  answers: [],
  userData: { name: "", job: "", photo: "" },
  setAnswer: (question, answer) =>
    set((state) => ({
      answers: [...state.answers, { question, answer }],
    })),
  setUserData: (data) => set({ userData: data }),
}));

export default useQuizStore;