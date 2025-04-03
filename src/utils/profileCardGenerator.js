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
  
  // 이미지 비율 유지하면서 최대 크기 제한
  // 원본 이미지 비율 계산
  const profileAspectRatio = profileImg.width / profileImg.height;
  
  // 기본적으로 너비는 overlay의 70%로 설정
  let profileWidth = overlayWidth * 0.7;
  // 해당 너비에 맞는 높이 계산 (비율 유지)
  let profileHeight = profileWidth / profileAspectRatio;
  
  // 계산된 높이가 overlay 높이의 90%를 초과하는지 확인
  if (profileHeight > overlayHeight * 0.9) {
    // 높이가 제한을 초과하면, 높이를 90%로 제한하고 너비 재계산
    profileHeight = overlayHeight * 0.9;
    profileWidth = profileHeight * profileAspectRatio; // 비율 유지
  }
  
  // 중앙 정렬 및 맨 밑 맞춤 계산
  const profileX = (overlayWidth - profileWidth) / 2;
  const profileY = overlayHeight - profileHeight;

  // STEP 2: background와 image-1 합성
  ctx.drawImage(backgroundImg, 0, 0, CARD_WIDTH, CARD_HEIGHT); // 배경
  ctx.drawImage(overlayImg, 0, 0, overlayWidth, overlayHeight); // overlay
  ctx.drawImage(profileImg, profileX, profileY, profileWidth, profileHeight); // profile

  // STEP 3: 텍스트 추가
  const textX = 50; // 텍스트 시작 X 좌표
  let textY = overlayHeight + 50; // 텍스트 시작 Y 좌표
  const lineHeight = 40; // 줄 간격

  ctx.fillStyle = "#FFFFFF"; // 텍스트 색상
  ctx.font = "50px Arial";
  ctx.fillText(`${userData.name} ${profileData.nickname}`, textX, textY);
  textY += lineHeight;

  ctx.font = "65px Arial";
  ctx.fillText("결혼가치관", textX, textY);
  textY += lineHeight;

  profileData.marriage_conditions.forEach((condition) => {
    ctx.fillText(condition, textX, textY);
    textY += lineHeight;
  });

  ctx.font = "50px Arial";
  ctx.fillText("MBTI", textX, textY);
  textY += lineHeight;

  ctx.font = "45px Arial";
  ctx.fillText(profileData.mbti, textX, textY);

  // 최종 이미지 반환
  return canvas.toDataURL("image/png");
};

export default generateProfileCard;
