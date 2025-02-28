# 💘 Couple Palace Quiz - Frontend

**🚀 연애 가치관 테스트 웹앱 (Frontend Repository)**  
이 프로젝트는 사용자의 연애 가치관을 분석하고 닉네임을 생성하는 웹 애플리케이션입니다.

---

## 📌 프로젝트 세팅 방법

### 1️⃣ **프로젝트 클론**
```bash
git clone https://github.com/YOUR-REPO/couple-palace-frontend.git
cd couple-palace-frontend
```

### 2️⃣ **패키지 설치**
> 📌 **Node.js 20 이상 필요**  
> Node.js 버전을 확인하려면 다음 명령어를 사용하세요:
```bash
node -v
```
> 버전이 20 미만이면 [Node.js 공식 사이트](https://nodejs.org/)에서 업데이트해주세요.

```bash
yarn
```
또는
```bash
npm install
```

### 3️⃣ **개발 서버 실행**
```bash
yarn dev
```
또는
```bash
npm run dev
```
> **기본 실행 주소:** `http://localhost:5173`

---

## 📌 프로젝트 구조
```
📂 src
 ┣ 📂 components       # UI 컴포넌트 모음
 ┃ ┣ 📜 ProgressBar.jsx   # 퀴즈 진행 바
 ┃ ┣ 📜 QuizQuestion.jsx  # 퀴즈 질문 컴포넌트
 ┃ ┗ 📜 UserForm.jsx      # 사용자 정보 입력 폼
 ┣ 📂 pages            # 각 페이지별 컴포넌트
 ┃ ┣ 📜 HomePage.jsx      # 메인 페이지
 ┃ ┣ 📜 QuizPage.jsx      # 퀴즈 페이지
 ┃ ┣ 📜 UserInputPage.jsx # 사용자 입력 페이지
 ┃ ┗ 📜 ResultPage.jsx    # 결과 페이지
 ┣ 📂 store            # 상태 관리 (Zustand 사용)
 ┃ ┗ 📜 quizStore.js
 ┣ 📂 api              # API 연동 폴더
 ┃ ┗ 📜 submitQuiz.js
 ┣ 📂 assets           # 이미지 및 아이콘
 ┣ 📜 App.jsx          # 라우팅 설정
 ┣ 📜 main.jsx         # 앱 진입점
 ┣ 📜 index.css        # 글로벌 스타일
 ┣ 📜 vite.config.js   # Vite 설정 파일
┗ 📜 README.md         # 프로젝트 가이드
```

---

## 📌 프로젝트 주요 기능

### ✅ **1. 퀴즈 진행**
- 사용자가 **한 페이지당 하나의 질문**을 풀며 진행
- **진행도 표시 (Progress Bar)**
- 모든 질문을 완료하면 **사용자 정보 입력 페이지로 이동**

### ✅ **2. 사용자 입력**
- 사용자가 **이름, 직업, 프로필 사진** 입력
- 입력 완료 후 **서버로 데이터를 한 번에 전송**

### ✅ **3. 결과 페이지**
- 서버에서 닉네임 및 성향 분석 결과를 반환
- **결과 화면 렌더링 & 공유 기능 제공 (SNS 공유 가능)**

---

## 📌 사용 기술 스택
| 기술        | 설명 |
|------------|--------------------------------|
| **React**  | UI 개발 |
| **Vite**   | 빠른 빌드 환경 |
| **React Router** | 페이지 이동 (퀴즈 진행) |
| **Zustand** | 전역 상태 관리 |
| **Tailwind CSS** | 반응형 스타일링 |
| **Framer Motion** | 페이지 전환 애니메이션 |

---

## 📌 협업 규칙

### 1️⃣ **Branch 전략**
- `main` → 배포용 브랜치
- `dev` → 개발 브랜치
- 새로운 기능 추가 시 `feature/기능명` 브랜치에서 작업 후 `dev`로 PR 요청

### 2️⃣ **Commit 메시지 규칙**
- `feat: 퀴즈 페이지 UI 추가`
- `fix: 버튼 스타일 수정`
- `chore: 불필요한 코드 정리`

---

## 📌 기여 방법
1. 이 프로젝트를 클론합니다.
2. `dev` 브랜치에서 새로운 기능을 개발합니다.
3. PR을 요청합니다.

💡 **문의:** 팀 채팅 또는 GitHub Issues 활용!

---

🚀 **이제 `yarn dev` 실행 후 개발을 시작하세요!** 🎉