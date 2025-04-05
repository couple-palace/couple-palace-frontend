import axios from "axios";

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://server.couplegungjeon.store',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // 쿠키 전송 허용
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  config => {
    // CORS 설정을 위한 헤더 추가
    config.headers['Access-Control-Allow-Origin'] = import.meta.env.VITE_CORS_ALLOW_ORIGIN || 'https://couplegungjeon.store';
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
    
    // URL이 `/api`로 시작하고, 배포 환경인 경우
    if (config.url && config.url.startsWith('/api') && import.meta.env.PROD) {
      // 상대 경로를 절대 경로로 변환
      config.url = `${import.meta.env.VITE_API_URL}${config.url}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 오류 처리
apiClient.interceptors.response.use(
  response => response,
  error => {
    // 405 에러 특별 처리
    if (error.response && error.response.status === 405) {
      console.error('405 Method Not Allowed 오류:', error);
      console.error('요청 URL:', error.config.url);
      console.error('요청 메소드:', error.config.method);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
