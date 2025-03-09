// export const fetchNickname = async (answers) => {
//   try {
//     const response = await fetch("http://server.couplegungjeon.store/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ answers }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch nickname");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching nickname:", error);
//     return { nickname: "기본 닉네임" }; // 오류 발생 시 기본 닉네임 제공
//   }
// };

export const fetchNickname = async (answers) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ nickname: "🔥 감성적인 마케터" });
    }, 1000); // 1초 후 가짜 데이터 반환
  });
};

