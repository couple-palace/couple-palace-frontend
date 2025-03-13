import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import UserInputPage from "./pages/UserInputPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./components/Layout";
import NameInputPage from "./pages/NameInputPage";
import useQuizStore from "./store/quizStore";
import useUserStore from "./store/userStore";
import usePhotoData from "./store/photoStore";

const App = () => {
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
