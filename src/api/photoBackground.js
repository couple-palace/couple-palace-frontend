import axios from "axios";

const uploadPhoto = async (photo) => {
  console.log("배경 제거 API 호출 시작", { photoType: photo?.type, photoSize: photo?.size });
  
  try {
    // 입력 데이터 유효성 검증
    if (!photo) {
      console.error("배경 제거 에러: 사진이 없습니다");
      throw new Error("EMPTY_PHOTO_DATA");
    }
    
    if (!(photo instanceof Blob || photo instanceof File)) {
      console.error("배경 제거 에러: 파일 형식이 아닙니다", { photoType: typeof photo });
      throw new Error("INVALID_PHOTO_FORMAT");
    }

    const formData = new FormData();
    formData.append("content_image", photo);
    
    // 전송 시작 로그
    console.log("배경 제거 API 요청 전송", {
      endpoint: "/api/v1/photo/remove/bg",
      contentType: photo.type,
      photoSize: `${(photo.size / 1024).toFixed(2)}KB`
    });

    // API 호출
    const response = await axios.post(`/api/v1/photo/remove/bg`, formData, { 
      responseType: 'blob',
      timeout: 30000, // 타임아웃 30초 설정
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`업로드 진행률: ${percentCompleted}%`);
      }
    });
    
    // 성공 로그
    console.log("배경 제거 API 응답 성공", {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers['content-type'],
      responseSize: response.data.size ? `${(response.data.size / 1024).toFixed(2)}KB` : 'N/A'
    });
    
    return response;
  } catch (error) {
    // 상세 에러 로그
    console.error("배경 제거 API 요청 실패:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data,
      requestConfig: {
        url: error.config?.url,
        method: error.config?.method,
        timeout: error.config?.timeout
      }
    });
    
    // Axios 에러 상세 정보
    if (error.response) {
      console.error("서버 응답 에러:", { 
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data instanceof Blob ? 
          '바이너리 데이터 (blob)' : 
          error.response.data
      });
    } else if (error.request) {
      console.error("요청은 전송되었으나 응답이 없음:", {
        request: error.request.toString()
      });
    } else {
      console.error("요청 설정 중 에러 발생:", {
        message: error.message,
        stack: error.stack
      });
    }
    
    if (error.message.includes('timeout')) {
      throw new Error("TIMEOUT: 서버 응답 시간이 너무 깁니다. 잠시 후 다시 시도해주세요.");
    }
    
    throw error;
  }
};

export default {
  uploadPhoto,
};