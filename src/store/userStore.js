import { create } from "zustand";

const useUserStore = create((set) => ({
  userData: { name: "", job: "" },
  // 이름은 userData에 저장(서버에 보내지 않음)
  setUserData: (data) =>
    set((state) => ({
      userData: { ...state.userData, ...data },
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

export default useUserStore;