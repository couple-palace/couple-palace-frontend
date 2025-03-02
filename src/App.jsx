import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import UserInputPage from "./pages/UserInputPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./components/Layout";
import AnimatedPage from "./components/AnimatedPage";

const App = () => {
  const location = useLocation(); // 현재 위치 감지

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}> {/*location을 전달해야 Animation 정상 작동 */}
          <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
          <Route path="/quiz" element={<AnimatedPage><QuizPage /></AnimatedPage>} />
          <Route path="/user-input" element={<AnimatedPage><UserInputPage /></AnimatedPage>} />
          <Route path="/result" element={<AnimatedPage><ResultPage /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default App;
