import { create } from "zustand";

const usePhotoStore = create((set) => ({
  photoData: null,
  // 사진 데이터는 별도 photoData에 저장(서버로 보냄)
  setPhotoData: (photo) =>
    set(() => ({
      photoData: photo,
    })),
}));

export default usePhotoStore;