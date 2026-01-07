import React, { forwardRef, LegacyRef } from 'react';

interface PageProps {
  children: React.ReactNode;
  number?: number;
  className?: string;
}

export const Page = forwardRef(
  (props: PageProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div className="demoPage h-full w-full" ref={ref}>
        <div
          // ★★★ 核心修改：添加 page-hardware-accelerated 类 ★★★
          // ★★★ 核心修改：确保 bg-[#fdfbf7] 始终存在，防止透明 ★★★
          className={`h-full w-full relative overflow-hidden shadow-2xl bg-[#fdfbf7] page-hardware-accelerated ${
            props.className || ''
          }`}
        >
          {/* 纸张纹理背景 (加 z-0) */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none z-0"
            style={{
              backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
            }}
          ></div>

          {/* 中缝阴影 */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"></div>

          {/* 内容容器 (加 z-20 确保在纹理之上) */}
          <div className="relative z-20 h-full w-full">{props.children}</div>

          {/* 页码 */}
          {props.number && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[#8b5a2b]/60 text-[10px] font-serif z-20">
              - {props.number} -
            </div>
          )}
        </div>
      </div>
    );
  }
);

Page.displayName = 'Page';
