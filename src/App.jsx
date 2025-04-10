import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import NameInputPage from "./pages/NameInputPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import UserInputPage from "./pages/UserInputPage";
import usePhotoData from "./store/photoStore";
import useQuizStore from "./store/quizStore";
import useUserStore from "./store/userStore";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isQuizPage = location.pathname === "/quiz";

  // 🔒 새로고침 방지 (beforeunload 이벤트)
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isQuizPage) {
        e.preventDefault();
        e.returnValue = ""; // 기본 경고 메시지 표시
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () =>
      window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isQuizPage]);

  // 🔒 뒤로가기 방지: dummy history 상태 활용 (popstate 이벤트)
  useEffect(() => {
    // 만약 Quiz 페이지라면 dummy history state를 한 번 추가
    if (isQuizPage) {
      window.history.pushState(null, "", location.pathname);
    }
    const handlePopState = (e) => {
      if (isQuizPage) {
        // 뒤로가기 버튼 클릭 시 프롬프트 표시
        const confirmLeave = window.confirm(
          "정말로 페이지를 떠나시겠습니까? 진행 중인 데이터가 손실될 수 있습니다."
        );
        if (confirmLeave) {
          // 사용자가 떠나는 걸 허용하면, dummy 상태 제거 후 뒤로 이동 허용
          // (여기서는 특별한 처리는 생략하고, 브라우저가 뒤로가도록 함)
          return;
        } else {
          // 사용자가 취소하면, 다시 dummy history state를 추가하여 현재 페이지를 유지
          window.history.pushState(null, "", location.pathname);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isQuizPage, location.pathname]);

  // 🧪 상태 변화 확인용 로그
  useEffect(() => {
    const unsubscribeQuiz = useQuizStore.subscribe((state) => {
      console.log("quizStore updated:", state);
    });
    const unsubscribeUser = useUserStore.subscribe((state) => {
      console.log("userStore updated:", state);
    });
    const unsubscribePhoto = usePhotoData.subscribe((state) => {
      console.log("photoStore updated:", state);
    });

    return () => {
      unsubscribeQuiz();
      unsubscribeUser();
      unsubscribePhoto();
    };
  }, []);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/name-input" element={<NameInputPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/user-input" element={<UserInputPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Layout>
  );
};

export default App;