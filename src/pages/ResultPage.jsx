import React, { useEffect, useState } from "react";
import useQuizStore from "../store/quizStore";

const ResultPage = () => {
  const [result, setResult] = useState(null);
  const { answers, userData } = useQuizStore();

  useEffect(() => {
    fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers, userData })
    })
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, []);

  if (!result) return <div className="text-center">결과 생성 중...</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">{result.nickname}</h1>
      <p>{result.relationshipStyle}</p>
      <p>{result.marriageConditions}</p>
      <p>{result.mbti}</p>
    </div>
  );
};

export default ResultPage;
