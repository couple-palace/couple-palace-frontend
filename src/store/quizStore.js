import { create } from "zustand";

const useQuizStore = create((set) => ({
  questionsList: [],
  setAnswer: (question_idx, answer_idx, type) =>
    set((state) => {
      // Check if this question_idx already exists in the array
      const existingIndex = state.questionsList.findIndex(
        (item) => item.question_idx === question_idx
      );
      
      // If question_idx already exists, update that entry instead of adding a new one
      if (existingIndex !== -1) {
        const updatedList = [...state.questionsList];
        updatedList[existingIndex] = { question_idx, answer_idx, type };
        return { questionsList: updatedList };
      }
      
      // Otherwise, add a new entry
      return {
        questionsList: [
          ...state.questionsList,
          { question_idx, answer_idx, type },
        ],
      };
    }),
  resetQuestions: () =>
    set(() => ({
      questionsList: [],
    })),
}));

export default useQuizStore;