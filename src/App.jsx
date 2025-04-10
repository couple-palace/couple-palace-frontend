import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (location.pathname === "/quiz") {
        event.preventDefault();
        event.returnValue = ""; // 브라우저 기본 경고 메시지 표시
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    
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
      window.removeEventListener("beforeunload", handleBeforeUnload); // 이벤트 리스너 제거
      unsubscribeQuiz();
      unsubscribeUser();
      unsubscribePhoto();
    };
  }, [location]);

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
