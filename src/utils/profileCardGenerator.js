import profileOverlay from "../assets/profile_overlay.png";
import dividerImage from "../assets/divider.svg"; 

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
  
  // 폰트 크기 추출 및 줄 간격 설정 개선
  const fontSizeMatch = baseFont.match(/(\d+)px/);
  const fontSize = fontSizeMatch ? parseInt(fontSizeMatch[1]) : 35; // 기본값 35px
  const lineHeight = fontSize * 1.8; // 줄 간격을 1.2에서 1.8로 증가
  
  for (const line of lines) {
    let currentX = x;
    
    // 각 줄에 대해 마크다운 스타일을 적용하여 렌더링
    const lineSegments = parseMarkdown(line);
    for (const segment of lineSegments) {
      // 폰트 설정 - 기본 폰트와 동일한 폰트 패밀리 유지
      const fontFamily = baseFont.includes('HSBombaram') ? 'HSBombaram' : 'Maruburi';
      
      if (segment.isBold) {
        ctx.font = baseFont.replace(/(\d+px)(.*)/, (match, size) => `bold ${size} ${fontFamily}`);
      } else if (segment.isItalic) {
        ctx.font = baseFont.replace(/(\d+px)(.*)/, (match, size) => `italic ${size} ${fontFamily}`);
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
  // 먼저 필요한 높이를 계산하기 위한 임시 캔버스 생성
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  
  // 카드 너비는 고정
  const CARD_WIDTH = 1024;
  tempCanvas.width = CARD_WIDTH;
  // 임시로 큰 값 설정
  tempCanvas.height = 3000;
  
  // 폰트 로딩 확인
  await document.fonts.ready;
  console.log('폰트 로딩 완료');

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
  const [overlayImg, profileImg, dividerImg] = await Promise.all([
    loadImage(profileOverlay),
    loadImage(photoURL),
    loadImage(dividerImage),
  ]);

  // overlay 크기 계산
  const overlayWidth = CARD_WIDTH;
  const overlayHeight = (overlayImg.height / overlayImg.width) * overlayWidth;
  
  // 프로필 이미지 크기 계산
  const profileAspectRatio = profileImg.width / profileImg.height;
  let profileWidth = overlayWidth * 0.7;
  let profileHeight = profileWidth / profileAspectRatio;
  
  if (profileHeight > overlayHeight * 0.9) {
    profileHeight = overlayHeight * 0.9;
    profileWidth = profileHeight * profileAspectRatio;
  }
  
  // divider 크기 계산
  const dividerWidth = overlayWidth * 0.3;
  const dividerHeight = (dividerImg.height / dividerImg.width) * dividerWidth;
  
  // 텍스트 렌더링 위치 계산
  const dividerY1 = overlayHeight - dividerHeight - 120;
  const dividerY2 = overlayHeight - dividerHeight - 40;
  
  // STEP 3의 시작 위치 계산
  let textY = overlayHeight + 80;
  const textX = 50;
  const MAX_TEXT_WIDTH = CARD_WIDTH - 100;
  
  // 텍스트 렌더링을 시뮬레이션하여 최종 높이 계산
  tempCtx.font = "50px Maruburi"; // 닉네임 폰트
  textY = renderMarkdownText(tempCtx, `**${profileData.nickname}**`, textX, textY, MAX_TEXT_WIDTH, "50px Maruburi");
  textY += 30;
  
  // 결혼가치관 제목
  textY = renderMarkdownText(tempCtx, "**결혼가치관**", textX, textY, MAX_TEXT_WIDTH, "50px Maruburi");
  textY += 20;
  
  // 결혼가치관 항목들
  profileData.marriage_conditions.forEach((condition) => {
    textY = renderMarkdownText(tempCtx, condition, textX, textY, MAX_TEXT_WIDTH, "35px Maruburi");
    textY += 20;
  });
  textY += 30;
  
  // MBTI 제목 및 값
  textY = renderMarkdownText(tempCtx, "**MBTI**", textX, textY, MAX_TEXT_WIDTH, "50px Maruburi");
  textY += 20;
  textY = renderMarkdownText(tempCtx, profileData.mbti, textX, textY, MAX_TEXT_WIDTH, "35px Maruburi");
  
  // 최종 높이 계산 (마지막 텍스트 위치 + 추가 여백)
  const CARD_HEIGHT = textY + 100; // 마지막 텍스트 아래 100px 여백 추가
  
  // 실제 캔버스 생성 및 크기 설정
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  
  // 배경 그리기
  ctx.fillStyle = '#2A2E3D';
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  
  // 테두리 그리기
  ctx.strokeStyle = 'rgba(247, 223, 28, 0.64)';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, CARD_WIDTH - 6, CARD_HEIGHT - 6);
  
  // Overlay 및 프로필 이미지 그리기
  ctx.drawImage(overlayImg, 0, 0, overlayWidth, overlayHeight);
  
  // 프로필 이미지 위치 계산 및 그리기
  const profileX = (overlayWidth - profileWidth) / 2;
  const profileY = overlayHeight - profileHeight;
  ctx.drawImage(profileImg, profileX, profileY, profileWidth, profileHeight);
  
  // Divider 및 이름 그리기
  if (dividerY1 > 0 && dividerY2 < overlayHeight) {
    ctx.drawImage(dividerImg, (overlayWidth - dividerWidth) / 2, dividerY1, dividerWidth, dividerHeight);
    ctx.drawImage(dividerImg, (overlayWidth - dividerWidth) / 2, dividerY2, dividerWidth, dividerHeight);
    
    // 이름 텍스트 그리기
    const nameFont = "60px HSBombaram";
    const nameText = userData.name || "이름";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.font = nameFont;
    
    const nameX = overlayWidth / 2;
    const nameY = (dividerY1 + dividerHeight + dividerY2) / 2 + 10;
    ctx.fillText(nameText, nameX, nameY);
  }
  
  // 텍스트 추가
  ctx.textAlign = "left";
  textY = overlayHeight + 80; // 초기화
  ctx.fillStyle = "#FFFFFF";
  
  // 닉네임 추가
  textY = renderMarkdownText(ctx, `**${profileData.nickname}**`, textX, textY, MAX_TEXT_WIDTH, "50px Maruburi");
  textY += 30;
  
  // 결혼가치관 제목
  textY = renderMarkdownText(ctx, "**결혼가치관**", textX, textY, MAX_TEXT_WIDTH, "50px Maruburi");
  textY += 20;
  
  // 결혼가치관 항목들
  profileData.marriage_conditions.forEach((condition) => {
    textY = renderMarkdownText(ctx, condition, textX, textY, MAX_TEXT_WIDTH, "35px Maruburi");
    textY += 20;
  });
  textY += 30;
  
  // MBTI 제목 및 값
  textY = renderMarkdownText(ctx, "**MBTI**", textX, textY, MAX_TEXT_WIDTH, "50px Maruburi");
  textY += 20;
  textY = renderMarkdownText(ctx, profileData.mbti, textX, textY, MAX_TEXT_WIDTH, "35px Maruburi");
  
  // 최종 이미지 반환
  return canvas.toDataURL("image/png");
};

export default generateProfileCard;
