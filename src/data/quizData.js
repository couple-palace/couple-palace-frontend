const quizData = [
  {
    question_idx: 1,
    question: "Crush 생겼음. 너의 첫 행동은?",
    answer: [
      "이건 운명이다. DM 보낸다. 아님 대화 걸어야지 (안 하면 내가 뒤짐)",
      "일단 주변 탐색부터. 스토리 염탐 + 지인 통해 성향 분석",
      "친구한테 당장 소개팅 자리 만들어 달라고 함",
      "그냥 혼자 짝사랑하다 그 사람이 애인 생기면 속상해하면서 마음 접음",
    ],
    type: "MBTI",
  },
  {
    question_idx: 2,
    question: "연애할 때 제일 중요한 거?",
    answer: [
      "성격이랑 가치관이 맞아야 함",
      "그냥 나를 좋아해줬으면 좋겠음",
      "같이 있어도 안 피곤한 게 중요함",
      "일단 재미있어야 함",
    ],
    type: "NICK",
  },
  {
    question_idx: 3,
    question: "연인과 싸웠음. 너의 태도는?",
    answer: [
      "일단 미안하다고 하고 화 풀어줌",
      "나 서운했는데...? (근데 너가 먼저 눈치채고 풀어줬어야지)",
      "'이거 왜 싸우는지 논리적으로 설명해봐' (감정보다 논리)",
      "'아니 근데 내가 그걸 말로 해야 해…? ㅋㅋㅋ' (눈치 못 챘다고 더 빡침)",
    ],
    type: "MBTI",
  },
  {
    question_idx: 4,
    question: "연애하면서 가장 듣고 싶은 말은?",
    answer: [
      "너랑 있으면 진짜 안정돼. 같이 있으면 아무 걱정 없음",
      "너랑 있으면 그냥 다른 차원의 세계가 열리는 기분이야",
      "'와 진짜 너만큼 내 기분 잘 맞춰주는 사람 처음 봄'",
      "'우리 둘이 이렇게 만난 거 진짜 온 우주가 계획한 거 아닐까?'",
    ],
    type: "MBTI",
  },
  {
    question_idx: 5,
    question: "연애할 때 나는?",
    answer: [
      "썸이 뭐야? 나는 직진함 (상대방 도망감)",
      "밀당 좀 해야 하는데, 걍 하루 연락 안 해봄",
      "나는 원래 연애에 신중한 타입^^ (안 하는 거 아님)",
      "썸타다가 내가 먼저 정들면 큰일 남",
    ],
    type: "NICK",
  },
  {
    question_idx: 6,
    question: "카톡 스타일은?",
    answer: [
      "답장 0.3초 컷, 근데 대화 짧음",
      "일단 읽고 하루 정도 고민함",
      "답장 안 하고 인스타 스토리는 봄",
      "카톡 확인했는데 깜빡함",
    ],
    type: "NICK",
  },
  {
    question_idx: 7,
    question: "연인과 싸우면 나는?",
    answer: [
      "팩트로 조지고 논리로 해결함",
      "안 풀릴 때까지 개길 거임",
      "말은 안 하는데 표정에서 티 다 남",
      "눈물은 안 나는데 세상이 나한테만 가혹한 것 같음",
    ],
    type: "NICK",
  },
  {
    question_idx: 8,
    question: "연애 유지력은?",
    answer: [
      "한결같이 잘해줌, 근데 너무 한결같음",
      "썸 타다가 갑자기 질려서 끝남",
      "나는 잘 모르겠고 상대방이 떠남",
      "일단 오래가는데 끝이 안 좋음",
    ],
    type: "NICK",
  },
  {
    question_idx: 9,
    question: "내 연애에서 가장 많이 하는 말?",
    answer: [
      "알아서 해 (그게 뭐든 내가 귀찮음)",
      "그건 아니지 않냐?",
      "내가 미안해 ㅠㅠ",
      "근데 이게 진짜 맞는 거야?",
    ],
    type: "NICK",
  },
  {
    question_idx: 10,
    question: "내 연애력은?",
    answer: [
      "연애 안함 (단호)",
      "걍 내 성격이랑 잘 맞는 사람 만나야 됨",
      "잘 모르겠고 그냥 되는 대로 함",
      "나름 잘한다고 생각하는데 ㅇㅇ",
    ],
    type: "NICK",
  },
  {
    question_idx: 11,
    question: "결혼 준비하는 너의 태도는?",
    answer: [
      "예산 정리, 플래너 계약, 신혼집 옵션까지 엑셀 정리 완료. (이미 신혼가전 사전조사 끝남)",
      "아 그거 그냥 결혼식장에서 알아서 해주는 거 아님? (드레스 고르러 가기 전에도 배달시켜 먹음)",
      "'결혼 체크리스트 100개 완성. 하루에 하나씩 해결하면 딱 맞음'",
      "'결혼식은 그냥 둘이서 여행 가서 셀프웨딩 하면 되는 거 아님? 식 귀찮아'",
    ],
    type: "MBTI",
  },
  {
    question_idx: 12,
    question: "결혼하면 주말에 뭐 함?",
    answer: [
      "아무것도 안 함. 주말=누워만 있기. 사람 건들면 죽음",
      "아침부터 옷 입고 나감. 집에 있으면 답답함",
      "각자 할 거 하다가 자연스럽게 저녁에 만나기",
      "주말엔 같이 보내야지. 결혼까지 해놓고 혼자 논다고?",
    ],
    type: "COND",
  },
  {
    question_idx: 13,
    question: "결혼하면 돈 관리는?",
    answer: [
      "각자 관리. 내 돈은 내 거, 네 돈은… 같이 잘 쓰자",
      "공동 계좌 만들어야지. 돈 흐름은 한눈에 보여야 함",
      "내가 관리할래. 근데 너도 카드 한도 모름",
      "돈은 버는 사람이 쓰는 거지. 그게 나든 너든",
    ],
    type: "COND",
  },
  {
    question_idx: 14,
    question: "집안일 분담 어떻게 할 건데?",
    answer: [
      "반반이지. 안 하면 싸움남",
      "그냥 선착순임. 눈치 게임 시작",
      "내가 요리할게, 근데 설거지는 너가 해야지?",
      "집안일? 모르겠고 배달로 해결 가능",
    ],
    type: "COND",
  },
  {
    question_idx: 15,
    question: "애 가질 거임?",
    answer: [
      "응. 근데 한 명만. 둘 이상은 좀…",
      "응. 최소 둘은 있어야지. 외동 외롭잖아",
      "그건 상황 봐야지. 지금은 모르겠음",
      "아니. 내 삶도 벅참. 애까지 볼 여유 없음",
    ],
    type: "COND",
  },
  {
    question_idx: 16,
    question: "배우자 성격 뭐가 중요함?",
    answer: [
      "책임감. 말 바꾸는 사람 싫음",
      "대화 잘 되는 사람. 같이 사는데 말 안 통하면 뭐 하냐",
      "웃기는 사람. 인생 빡센데 결혼도 빡세면 어쩔 거임",
      "그냥 나를 잘 받아주는 사람. 나는 안 바뀜",
    ],
    type: "COND",
  },
  {
    question_idx: 17,
    question: "신혼집 어디 살 건데?",
    answer: [
      "도심 한가운데. 편의시설 필수",
      "조용한 교외. 강아지, 고양이랑 살고 싶음",
      "해외. 한국 벗어나서 살고 싶음",
      "부모님 집 근처. 도움 필요할 수도 있음",
    ],
    type: "COND",
  },
  {
    question_idx: 18,
    question: "배우자 직업 중요함?",
    answer: [
      "중요하지. 안정적인 직업이면 좋겠음",
      "직업보다는 성격. 가치관 맞아야 됨",
      "돈 잘 벌면 솔직히 좋지 않냐?",
      "내가 벌면 됨. 배우자는 상관 없음",
    ],
    type: "COND",
  },
];

export default quizData;
