import React, { forwardRef, LegacyRef } from 'react';

interface PageProps {
  children: React.ReactNode;
  number?: number;
  className?: string;
}

export const Page = forwardRef(
  (props: PageProps, ref: LegacyRef<HTMLDivElement>) => {
    return (
      <div className="demoPage" ref={ref}>
        <div
          className={`h-full w-full relative overflow-hidden shadow-2xl ${
            props.className || 'bg-[#fdfbf7]'
          }`}
        >
          {/* 纸张纹理 */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
            }}
          ></div>

          {/* 中缝阴影 */}
          <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/20 to-transparent z-20 pointer-events-none"></div>

          {/* 内容区 */}
          <div className="h-full w-full p-8 md:p-12 flex flex-col relative z-30">
            {props.children}
          </div>

          {/* 页码 */}
          {props.number && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-serif z-30">
              - {props.number} -
            </div>
          )}
        </div>
      </div>
    );
  }
);

Page.displayName = 'Page';
