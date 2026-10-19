// 1. 패미컴 콘솔 본체 도트 (Status: 8-BIT / 0%)
export function PixelFamicomConsole() {
  return (
    <svg
      viewBox="0 0 26 18"
      className="w-10 h-7 shrink-0"
      shapeRendering="crispEdges"
    >
      {/* 본체 하우징 (크림) */}
      <rect x="2" y="3" width="22" height="13" fill="#FAF7EE" />
      <rect x="1" y="5" width="24" height="9" fill="#FAF7EE" />
      {/* 상단/측면 버건디 밴드 */}
      <rect x="3" y="2" width="20" height="2" fill="#8D1426" />
      <rect x="1" y="5" width="2" height="9" fill="#8D1426" />
      <rect x="23" y="5" width="2" height="9" fill="#8D1426" />
      {/* 팩 삽입구 (카트리지 장착 상태) */}
      <rect x="5" y="4" width="16" height="3" fill="#2D1B18" />
      <rect x="7" y="2" width="12" height="3" fill="#8D1426" />
      {/* 스위치 & 슬라이더 레버 */}
      <rect x="4" y="9" width="3" height="3" fill="#8D1426" />
      <rect x="11" y="8" width="4" height="4" fill="#8D1426" />
      <rect x="12" y="9" width="2" height="2" fill="#DCA836" />
      <rect x="19" y="9" width="3" height="3" fill="#8D1426" />
      {/* 외곽선 */}
      <rect x="2" y="1" width="22" height="1" fill="#2D1B18" />
      <rect x="0" y="5" width="1" height="9" fill="#2D1B18" />
      <rect x="25" y="5" width="1" height="9" fill="#2D1B18" />
      <rect x="2" y="16" width="22" height="1" fill="#2D1B18" />
    </svg>
  );
}

// 2. 패미컴 하드웨어 드라이브 도트 (Favorite Hardware: 160 mm/s) - 에러 원인 해결
export function PixelFamicomHardware() {
  return (
    <svg
      viewBox="0 0 26 18"
      className="w-10 h-7 shrink-0"
      shapeRendering="crispEdges"
    >
      {/* 상단 드라이브 베이스 */}
      <rect x="5" y="2" width="16" height="7" fill="#64748B" />
      <rect x="7" y="4" width="12" height="2" fill="#DCA836" />
      {/* 하단 거치대 */}
      <rect x="2" y="9" width="22" height="7" fill="#8D1426" />
      <rect x="4" y="11" width="18" height="3" fill="#DCA836" />
      <rect x="6" y="12" width="2" height="1" fill="#2D1B18" />
      <rect x="16" y="12" width="2" height="1" fill="#8D1426" />
      <rect x="19" y="12" width="2" height="1" fill="#8D1426" />
      {/* 외곽선 */}
      <rect x="4" y="1" width="18" height="1" fill="#2D1B18" />
      <rect x="1" y="9" width="1" height="7" fill="#2D1B18" />
      <rect x="24" y="9" width="1" height="7" fill="#2D1B18" />
      <rect x="2" y="16" width="22" height="1" fill="#2D1B18" />
    </svg>
  );
}

// 3. 푸터용 미니 패미컴 컨트롤러 도트
export function PixelMiniController() {
  return (
    <svg
      viewBox="0 0 28 14"
      className="w-8 h-4 shrink-0"
      shapeRendering="crispEdges"
    >
      <rect x="1" y="2" width="26" height="10" fill="#8D1426" />
      <rect x="3" y="4" width="22" height="6" fill="#DCA836" />
      <rect x="5" y="5" width="4" height="4" fill="#2D1B18" />
      <rect x="18" y="6" width="2" height="2" fill="#8D1426" />
      <rect x="22" y="6" width="2" height="2" fill="#8D1426" />
      <rect x="1" y="1" width="26" height="1" fill="#2D1B18" />
      <rect x="1" y="12" width="26" height="1" fill="#2D1B18" />
    </svg>
  );
}

// 4. Tech/Security 육각형 반도체 칩셋 배지
export function HexChip({ title, theme }) {
  const themes = {
    gold: { bg: "fill-[#DCA836]", text: "text-[#2D1B18]" },
    green: { bg: "fill-[#10B981]", text: "text-white" },
    dark: { bg: "fill-[#1E293B]", text: "text-[#38BDF8]" },
  };

  const currentTheme = themes[theme] || themes.gold;

  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-18 h-14 sm:w-20 sm:h-16 flex items-center justify-center font-black text-xs ${currentTheme.text}`}
      >
        <svg
          viewBox="0 0 100 86"
          className="absolute inset-0 w-full h-full drop-shadow-[2px_2px_0px_#2D1B18]"
        >
          <polygon
            points="25,2 75,2 98,43 75,84 25,84 2,43"
            className={currentTheme.bg}
            stroke="#2D1B18"
            strokeWidth="4"
          />
          <polygon
            points="28,6 72,6 93,43 72,80 28,80 7,43"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
        </svg>
        <span className="relative z-10 text-[11px] font-black tracking-tight text-center px-1">
          {title}
        </span>
      </div>
    </div>
  );
}
