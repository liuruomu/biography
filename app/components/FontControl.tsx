'use client';

import React from 'react';

interface FontControlProps {
  currentLevel: number;
  onChange: (newLevel: number) => void;
}

export const FontControl = ({ currentLevel, onChange }: FontControlProps) => {
  const maxLevel = 4;

  return (
    // 位置：底部居中，或者右下角 (这里改为底部居中，更像阅读器)
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      {/* 容器：深色磨砂玻璃，圆润胶囊，极小的内边距 */}
      <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-lg transition-all hover:bg-black/70">
        {/* 减小按钮 (小 A) */}
        <button
          onClick={() => onChange(Math.max(0, currentLevel - 1))}
          disabled={currentLevel === 0}
          className="w-9 h-9 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 active:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="缩小字体"
        >
          {/* 小号的 'A' 图标 */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19h6" />
            <path d="M9 19v-5" />
            <path d="M6 19v-5" />
            <path d="M4 14h6" />
            <path d="M7 10v4" />
            <path d="M7 4L3 14h2" />
            <path d="M7 4L11 14h-2" />
          </svg>
        </button>

        {/* 极简指示器 (用点代替数字) */}
        <div className="flex items-center gap-1 px-2">
          {[...Array(maxLevel + 1)].map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i === currentLevel
                  ? 'w-2 h-2 bg-[#a17a43] scale-125' // 选中态：金色，大一点
                  : 'w-1 h-1 bg-white/30' // 未选态：灰色小点
              }`}
            />
          ))}
        </div>

        {/* 增大按钮 (大 A) */}
        <button
          onClick={() => onChange(Math.min(maxLevel, currentLevel + 1))}
          disabled={currentLevel === maxLevel}
          className="w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="放大字体"
        >
          {/* 大号的 'A' 图标 */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19h11" /> {/* 底横线加长 */}
            <path d="M9 19v-6" />
            <path d="M6 19v-6" />
            <path d="M3 13h7" />
            <path d="M7 9v4" />
            <path d="M7 2L2 13h2" />
            <path d="M7 2L12 13h-2" />
          </svg>
        </button>
      </div>
    </div>
  );
};
