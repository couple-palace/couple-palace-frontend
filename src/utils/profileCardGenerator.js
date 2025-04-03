import profileBackground from "../assets/profile_background.png";
import profileOverlay from "../assets/profile_overlay.png";

/**
 * 마크다운 텍스트를 파싱하여 스타일 정보를 추출하는 함수
 * @param {string} text - 마크다운 포맷의 텍스트
 * @returns {Array} - 텍스트 조각과 스타일 정보 배열
 */
const parseMarkdown = (text) => {
  if (!text) return [];

  const segments = [];
  let currentIndex = 0;
  
  // 볼드체 (**text**)
  const boldRegex = /\*\*(.*?)\*\*/g;
  let boldMatch;
  while ((boldMatch = boldRegex.exec(text)) !== null) {
    const startPos = boldMatch.index;
    const endPos = boldMatch.index + boldMatch[0].length;

    // 볼드 마크 이전의 일반 텍스트
    if (startPos > currentIndex) {
      segments.push({ 
        text: text.substring(currentIndex, startPos),
        isBold: false,
        isItalic: false 
      });
    }

    // 볼드 처리된 텍스트
    segments.push({ 
      text: boldMatch[1], 
      isBold: true,
      isItalic: false 
    });

    currentIndex = endPos;
  }

  // 이탤릭체 (*text*)
  const italicRegex = /\*(.*?)\*/g;
  let italicMatch;
  let remainingText = text.substring(currentIndex);
  let offset = currentIndex;
  currentIndex = 0;

  while ((italicMatch = italicRegex.exec(remainingText)) !== null) {
    const startPos = italicMatch.index;
    const endPos = italicMatch.index + italicMatch[0].length;

    // 이탤릭 마크 이전의 일반 텍스트
    if (startPos > currentIndex) {
      segments.push({ 
        text: remainingText.substring(currentIndex, startPos),
        isBold: false,
        isItalic: false 
      });
    }

    // 이탤릭 처리된 텍스트
    segments.push({ 
      text: italicMatch[1], 
      isBold: false,
      isItalic: true 
    });

    currentIndex = endPos;
  }

  // 남은 텍스트 처리
  if (currentIndex < remainingText.length) {
    segments.push({ 
      text: remainingText.substring(currentIndex),
      isBold: false,
      isItalic: false 
    });
  }

  // 파싱된 세그먼트가 없는 경우 원본 텍스트를 그대로 세그먼트로 반환
  if (segments.length === 0) {
    segments.push({ 
      text: text,
      isBold: false,
      isItalic: false 
    });
  }

  return segments;
};

/**
 * 텍스트를 주어진 최대 너비에 맞게 줄바꿈하는 함수
 * @param {CanvasRenderingContext2D} ctx - Canvas Context
 * @param {string} text - 원본 텍스트
 * @param {number} maxWidth - 최대 너비
 * @returns {string[]} 줄바꿈된 텍스트 배열
 */
const wrapText = (ctx, text, maxWidth) => {
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + ' ' + word).width;
    
    if (width < maxWidth) {
      currentLine += ' ' + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  
  lines.push(currentLine);
  return lines;
};

/**
 * 마크다운이 포함된 텍스트를 캔버스에 렌더링하는 함수
 * @param {CanvasRenderingContext2D} ctx - Canvas Context
 * @param {string} text - 마크다운 형식의 텍스트
 * @param {number} x - x 좌표
 * @param {number} y - y 좌표
 * @param {number} maxWidth - 최대 너비
 * @param {string} baseFont - 기본 폰트 설정
 * @returns {number} - 다음 텍스트 y 위치
 */
const renderMarkdownText = (ctx, text, x, y, maxWidth, baseFont) => {
  const segments = parseMarkdown(text);
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  let currentLineWidth = 0;
  
  // 줄바꿈 처리
  for (const word of words) {
    ctx.font = baseFont; // 측정을 위한 기본 폰트
    const wordWidth = ctx.measureText(word + ' ').width;
    
    if (currentLineWidth + wordWidth <= maxWidth) {
      currentLine += word + ' ';
      currentLineWidth += wordWidth;
    } else {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
      currentLineWidth = wordWidth;
    }
  }
  
  if (currentLine.trim() !== '') {
    lines.push(currentLine.trim());
  }
  
  // 각 줄 렌더링
  const originalFont = ctx.font;
  let currentY = y;
  const lineHeight = parseInt(baseFont) * 1.2; // 행간 설정
  
  for (const line of lines) {
    let currentX = x;
    
    // 각 줄에 대해 마크다운 스타일을 적용하여 렌더링
    const lineSegments = parseMarkdown(line);
    for (const segment of lineSegments) {
      if (segment.isBold) {
        ctx.font = baseFont.replace(/(\d+)px/, (match, size) => `bold ${size}px`);
      } else if (segment.isItalic) {
        ctx.font = baseFont.replace(/(\d+)px/, (match, size) => `italic ${size}px`);
      } else {
        ctx.font = baseFont;
      }
      
      ctx.fillText(segment.text, currentX, currentY);
      currentX += ctx.measureText(segment.text).width;
    }
    
    currentY += lineHeight;
  }
  
  ctx.font = originalFont; // 폰트 상태 복원
  return currentY; // 다음 텍스트의 Y 위치 반환
};

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
  const lineHeight = 60; // 줄 간격
  const MAX_TEXT_WIDTH = CARD_WIDTH - 100; // 텍스트 최대 너비

  ctx.fillStyle = "#FFFFFF"; // 텍스트 색상

  // 이름과 닉네임 (마크다운 지원)
  const nameFont = "50px Arial";
  const nameText = `**${userData.name}** ${profileData.nickname}`;
  textY = renderMarkdownText(ctx, nameText, textX, textY, MAX_TEXT_WIDTH, nameFont);
  textY += 20; // 여백 추가

  // 결혼가치관 제목
  const titleFont = "65px Arial";
  textY = renderMarkdownText(ctx, "**결혼가치관**", textX, textY, MAX_TEXT_WIDTH, titleFont);
  
  // 결혼가치관 항목들 (마크다운 지원)
  const conditionFont = "45px Arial";
  profileData.marriage_conditions.forEach((condition) => {
    textY = renderMarkdownText(ctx, condition, textX, textY, MAX_TEXT_WIDTH, conditionFont);
    textY += 10; // 항목 간 여백
  });
  textY += 20; // 섹션 간 여백

  // MBTI 제목 및 값 (마크다운 지원)
  textY = renderMarkdownText(ctx, "**MBTI**", textX, textY, MAX_TEXT_WIDTH, "50px Arial");
  textY = renderMarkdownText(ctx, profileData.mbti, textX, textY, MAX_TEXT_WIDTH, "45px Arial");

  // 최종 이미지 반환
  return canvas.toDataURL("image/png");
};

export default generateProfileCard;
