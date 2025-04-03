import { create } from "zustand";

const useQuizStore = create((set) => ({
  questionsList: [],
  setAnswer: (question_idx, answer_idx, type) =>
    set((state) => ({
      questionsList: [
        ...state.questionsList,
        { question_idx, answer_idx, type },
      ],
    })),
  resetQuestions: () =>
    set(() => ({
      questionsList: [],
    })),
}));

export default useQuizStore;