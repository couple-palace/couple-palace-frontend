import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import UserInputPage from "./pages/UserInputPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./components/Layout";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/user-input" element={<UserInputPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
