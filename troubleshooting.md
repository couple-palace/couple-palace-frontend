# Safari(WebKit)의 backdrop-filter 렌더링 버그 트러블슈팅

## 문제 상황

React(Vite) + Tailwind CSS 기반 애플리케이션에서 Safari 17(macOS) 및 iOS 17.4 환경에서만 발생하는 `backdrop-filter` 관련 렌더링 버그를 해결했습니다.

### 버그 현상
- Chrome과 Firefox에서는 정상적으로 표시되는 글래스모피즘 효과(반투명 배경 + blur)가 Safari에서 순백색 배경으로 렌더링됨
- Safari DevTools에서 확인 시 `backdrop-filter: blur(12px)` 값이 `none`으로 처리됨
- 특히 중첩된 UI 요소에서 `backdrop-filter` 속성이 무시되는 현상 발생

### 문제가 발생한 컴포넌트
- `UserInputPage.jsx`의 사진 삭제 버튼
- `HomePage.jsx`, `QuizPage.jsx`, `ResultPage.jsx`의 버튼 컴포넌트들

## 원인 분석

WebKit 엔진(Safari)에서 `backdrop-filter` 속성 처리 시 다음과 같은 문제가 있었습니다:

1. **레이어 처리 문제**: Safari에서는 필터 효과가 적용된 요소에 대해 별도의 렌더링 레이어를 생성하는데, 이 과정에서 중첩된 요소나 특정 CSS 속성 조합이 있을 때 레이어가 제대로 생성되지 않음

2. **투명도와 필터 충돌**: `bg-[색상]/[투명도]`와 `backdrop-filter`가 함께 사용될 때 투명도를 무시하고 배경색을 불투명하게 렌더링함

3. **스택 컨텍스트 격리 실패**: 복잡한 중첩 구조에서 요소의 스택 컨텍스트가 올바르게 격리되지 않음

4. **벤더 프리픽스 이슈**: `-webkit-backdrop-filter`와 표준 `backdrop-filter` 속성이 함께 사용될 때 발생하는 충돌

## 해결 방법

### 1. Tailwind 설정 확장 (tailwind.config.js)

WebKit 버그를 해결하는 커스텀 유틸리티 클래스를 추가했습니다:

```js
plugins: [
  function({ addUtilities }) {
    const newUtilities = {
      '.webkit-backdrop-blur-sm': {
        '-webkit-backdrop-filter': 'blur(4px)',
        'backdrop-filter': 'blur(4px)',
        'transform': 'translateZ(0)',
        'isolation': 'isolate'
      },
      '.webkit-backdrop-blur-md': {
        '-webkit-backdrop-filter': 'blur(12px)',
        'backdrop-filter': 'blur(12px)',
        'transform': 'translateZ(0)',
        'isolation': 'isolate'
      },
      '.webkit-backdrop-blur-lg': {
        '-webkit-backdrop-filter': 'blur(16px)',
        'backdrop-filter': 'blur(16px)',
        'transform': 'translateZ(0)',
        'isolation': 'isolate'
      },
      '.webkit-backdrop-fix': {
        'transform': 'translateZ(0)',
        'isolation': 'isolate',
      },
    }
    addUtilities(newUtilities)
  }
]
```

### 2. CSS 대응 (index.css)

Safari와 iOS 디바이스를 위한 fallback 스타일과 특수 대응을 추가했습니다:

```css
/* Safari backdrop-filter 버그 해결을 위한 스타일 */
@supports ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
  .safari-backdrop-fix {
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    transform: translateZ(0);
    isolation: isolate;
  }
  
  /* Safari에서 backdrop-filter가 작동하지 않을 때 폴백 스타일 */
  @supports not ((-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))) {
    .safari-backdrop-fix {
      background-color: rgba(42, 27, 61, 0.95) !important;
    }
  }
}

/* iOS 기기 특화 스타일 */
@supports (-webkit-touch-callout: none) {
  .photo-delete-button {
    background-color: rgba(42, 27, 61, 0.8) !important;
    border: 1px solid rgba(248, 233, 202, 0.3) !important;
    transform: translateZ(0) !important;
    isolation: isolate !important;
  }
}
```

### 3. 컴포넌트 클래스 수정

각 컴포넌트의 버튼 요소에 다음과 같이 수정사항을 적용했습니다:

1. **UserInputPage.jsx**의 삭제 버튼:
```jsx
<button 
  // ...existing code...
  className="absolute top-0 right-0 transform -translate-y-1/3 translate-x-1/3 
  bg-[#2A1B3D] bg-opacity-80 hover:bg-[#2A1B3D] 
  [-webkit-backdrop-filter:blur(8px)] backdrop-blur-sm 
  [transform:translateZ(0)] isolate
  p-1 rounded-full shadow-md border border-[#F8E9CA]/30 photo-delete-button"
>
  {/* ...existing code... */}
</button>
```

2. **QuizPage.jsx**의 '처음으로 돌아가기' 버튼:
```jsx
<button 
  className="px-6 py-3 bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] rounded-xl font-medium webkit-backdrop-fix"
  onClick={() => navigate("/")}
>
  처음으로 돌아가기
</button>
```

3. **ResultPage.jsx**의 '처음으로 돌아가기' 버튼:
```jsx
<button
  onClick={() => navigate("/")}
  className="bg-gray-700/50 webkit-backdrop-blur-sm text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700/70 transition-colors nav-button webkit-backdrop-fix"
>
  처음으로 돌아가기
</button>
```

4. **HomePage.jsx**의 '시작하기' 버튼:
```jsx
<motion.button 
  onClick={handleStart}
  className="w-full bg-gradient-to-r from-[#F8E9CA] to-[#FFD700] text-[#2A2E3D] py-4 text-xl font-bold rounded-xl webkit-backdrop-fix shadow-lg hover:shadow-xl"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  시작하기
</motion.button>
```

## 적용한 핵심 해결책

1. **벤더 프리픽스 추가**: `-webkit-backdrop-filter` 속성 명시적 추가
2. **하드웨어 가속 활성화**: `transform: translateZ(0)` 적용으로 별도 렌더링 레이어 생성 강제
3. **스택 컨텍스트 격리**: `isolation: isolate` 속성 적용
4. **투명도 처리 방식 변경**: `bg-white/10` 대신 `bg-opacity-80` 사용
5. **그레이스풀 폴백 스타일**: `@supports` 쿼리를 통한 대체 스타일 제공

## 결과

- Safari(macOS), iOS Safari에서도 Chrome, Firefox와 동일하게 글래스모피즘 효과가 정상적으로 표시됨
- 모든 버튼에서 일관된 디자인 적용
- 이전 브라우저를 위한 폴백 스타일 제공으로 호환성 강화

## 참고 자료

- WebKit 버그 추적: [WebKit Bug #242912](https://bugs.webkit.org/show_bug.cgi?id=242912)
- MDN backdrop-filter 문서: [https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- Can I Use - backdrop-filter: [https://caniuse.com/css-backdrop-filter](https://caniuse.com/css-backdrop-filter)