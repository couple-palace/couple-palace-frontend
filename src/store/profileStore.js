import { create } from 'zustand';

const useProfileStore = create((set) => ({
  profileResult: null,
  setProfileResult: (profileResult) => set({ profileResult }),
}));

export default useProfileStore;
