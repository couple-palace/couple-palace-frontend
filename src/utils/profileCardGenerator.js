import profileBackground from "../assets/profile_background.png";
import profileOverlay from "../assets/profile_overlay.png";

/**
 * 프로필 카드 이미지 생성 기능
 * 
 * 이 파일은 다음 요소들을 결합하여 하나의 프로필 카드 이미지를 생성합니다:
 * - 배경 이미지 (profile_background.png)
 * - 오버레이 이미지 (profile_overlay.png)
 * - 사용자 프로필 사진 (배경 제거됨)
 * - 사용자 이름
 * - MBTI, 애칭, 결혼 조건 등 프로필 데이터
 */

/**
 * 프로필 카드 이미지 생성
 * @param {Object} userData - 사용자 데이터 (name, job 등)
 * @param {Object} profileData - 서버에서 받아온 프로필 데이터 (nickname, marriage_conditions, mbti)
 * @param {string} photoURL - 배경 제거된 사용자 사진 URL
 * @returns {Promise<string>} - 생성된 프로필 카드 이미지의 Data URL
 */
const generateProfileCard = async (userData, profileData, photoURL) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // 카드 크기 설정
  const CARD_WIDTH = 1024;
  const CARD_HEIGHT = 1740;
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  // 이미지 로드 함수
  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  // 이미지 로드
  const [backgroundImg, overlayImg, profileImg] = await Promise.all([
    loadImage(profileBackground),
    loadImage(profileOverlay),
    loadImage(photoURL),
  ]);

  // STEP 1: overlay와 profileImg 합성
  const overlayWidth = CARD_WIDTH;
  const overlayHeight = (overlayImg.height / overlayImg.width) * overlayWidth;
  const profileWidth = overlayWidth * 0.6; // overlay의 60% 이하
  const profileHeight = overlayHeight * 0.7; // overlay의 70% 이하
  const profileX = (overlayWidth - profileWidth) / 2; // 중앙 정렬
  const profileY = overlayHeight - profileHeight; // 맨 밑 맞춤

  // STEP 2: background와 image-1 합성
  ctx.drawImage(backgroundImg, 0, 0, CARD_WIDTH, CARD_HEIGHT); // 배경
  ctx.drawImage(overlayImg, 0, 0, overlayWidth, overlayHeight); // overlay
  ctx.drawImage(profileImg, profileX, profileY, profileWidth, profileHeight); // profile

  // STEP 3: 텍스트 추가
  const textX = 50; // 텍스트 시작 X 좌표
  let textY = overlayHeight + 50; // 텍스트 시작 Y 좌표
  const lineHeight = 40; // 줄 간격

  ctx.fillStyle = "#FFFFFF"; // 텍스트 색상
  ctx.font = "20px Arial";
  ctx.fillText(`${userData.name} ${profileData.nickname}`, textX, textY);
  textY += lineHeight;

  ctx.font = "15px Arial";
  ctx.fillText("결혼가치관", textX, textY);
  textY += lineHeight;

  profileData.marriage_conditions.forEach((condition) => {
    ctx.fillText(condition, textX, textY);
    textY += lineHeight;
  });

  ctx.font = "20px Arial";
  ctx.fillText("MBTI", textX, textY);
  textY += lineHeight;

  ctx.font = "15px Arial";
  ctx.fillText(profileData.mbti, textX, textY);

  // 최종 이미지 반환
  return canvas.toDataURL("image/png");
};

export default generateProfileCard;
