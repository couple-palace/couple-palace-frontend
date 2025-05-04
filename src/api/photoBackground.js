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

    // 서버 응답 에러 처리
    if (error.response) {
      const status = error.response.status;

      // 클라이언트 오류 (4xx)
      if (status >= 400 && status < 500) {
        console.error("클라이언트 오류 발생:", {
          status,
          data: error.response.data,
        });
        throw new Error(
          "사진 형식이 잘못되었습니다.\n입력 데이터를 확인한 후 다시 시도해주세요."
        );
      }

      // 서버 오류 (5xx)
      if (status >= 500) {
        console.error("서버 내부 오류 발생:", {
          status,
          data: error.response.data,
        });
        throw new Error(
          "사진이 제대로 업로드 되지 않았습니다.\n\n걱정마세요! 새로고침해도\n퀴즈 내용은 유지됩니다.\n페이지를 새로고침한 후\n다시 시도해주세요."
        );
      }
    }

    // 네트워크 오류 또는 요청 전송 실패
    if (error.request) {
      console.error("네트워크 오류 또는 요청 전송 실패:", {
        request: error.request.toString()
      });
      throw new Error(
        "네트워크 오류가 발생했습니다.\n\n인터넷 연결을 확인한 후\n다시 시도해주세요."
      );
    }

    // 기타 예외 처리
    console.error("예기치 못한 오류 발생:", {
      message: error.message,
      stack: error.stack
    });
    throw new Error(
      "알 수 없는 오류가 발생했습니다.\n\n잠시 후 다시 시도해주세요."
    );
  }
};

export default {
  uploadPhoto,
};