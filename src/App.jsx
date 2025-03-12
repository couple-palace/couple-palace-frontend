import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import UserInputPage from "./pages/UserInputPage";
import ResultPage from "./pages/ResultPage";
import Layout from "./components/Layout";
import NameInputPage from "./pages/NameInputPage";

const App = () => {
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
