import axios from "axios";

const uploadPhoto = (photo) => {
  const formData = new FormData();
  formData.append("content_image", photo);

  return axios.post(`/api/v1/photo/remove/bg`, formData, { responseType: 'blob' });
};

export default {
  uploadPhoto,
};