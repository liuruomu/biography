'use client';

import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Page } from './Page';
import { BookPageData } from '@/types';

interface FlipBookProps {
  data: BookPageData[];
}

export default function FlipBook({ data }: FlipBookProps) {
  const bookRef = useRef(null);

  if (!data || data.length === 0) return null;

  const coverData = data[0];
  const backCoverData = data[data.length - 1];
  const innerPages = data.slice(1, -1);
  const shouldDropCap = (text: string, isFirstParagraph: boolean) => {
    if (!isFirstParagraph) return false;
    const firstChar = text.charAt(0);
    // 正则匹配：如果是 【 [ ( “ ' 等标点，返回 false
    // 新增对《的匹配，覆盖所有指定开头字符
    if (/^[【\[（(“"‘'《]/.test(firstChar)) return false;
    return true;
  };
  return (
    <HTMLFlipBook
      width={600} // 单页宽度
      height={850} // 单页高度 (1:1.414 黄金比例)
      size="fixed" // ★ 核心修复：固定尺寸，像一本真书
      minWidth={300}
      maxWidth={1000}
      minHeight={400}
      maxHeight={1533}
      showCover={true}
      mobileScrollSupport={true}
      className="shadow-2xl"
      ref={bookRef}
      style={{}} // required, can be empty or customized
      startPage={0}
      drawShadow={true}
      flippingTime={600}
      usePortrait={true}
      startZIndex={0}
      autoSize={true}
      maxShadowOpacity={0.5}
      showPageCorners={true}
      disableFlipByClick={false}
      swipeDistance={30}
      clickEventForward={true}
      useMouseEvents={true}
    >
      {/* ================= 封面：黑金 + 竖排 ================= */}
      <Page className="bg-leather border-l-8 border-gray-800 !p-0">
        <div className="h-full w-full flex flex-col items-center border-[1px] border-[#a17a43]/40 m-4 p-8 box-border relative">
          {/* 装饰角标 */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#a17a43]"></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#a17a43]"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#a17a43]"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#a17a43]"></div>

          {/* 顶部英文 */}
          <div className="text-[#a17a43] text-[10px] tracking-[0.4em] mt-8 mb-4 font-serif uppercase text-center opacity-80">
            Private Biography
          </div>

          {/* ★ 核心修复：书名区域使用 flex-1 撑满中间，并使用竖排文字 */}
          <div className="flex-1 flex flex-col items-center justify-center w-full my-4">
            {/* 竖排容器 */}
            <div className="writing-vertical-rl text-gold font-calligraphy text-7xl leading-snug py-8 border-y border-[#a17a43]/20">
              {coverData.title}
            </div>
          </div>

          {/* 副标题 */}
          <div className="mb-12 text-xl font-serif text-[#d4c4a8] tracking-[0.2em] font-light text-center">
            {coverData.subtitle}
          </div>

          {/* 底部作者 */}
          <div className="mb-8 text-[#a17a43] text-sm font-serif tracking-widest border-t border-[#a17a43]/30 pt-4 px-8">
            {coverData.author}
          </div>
        </div>
      </Page>

      {/* ================= 内页 ================= */}
      {innerPages.map((item, index) => (
        <Page key={index} number={index + 1}>
          {item.type === 'text' && (
            <div className="h-full flex flex-col px-2">
              <div className="flex flex-col items-center mb-8 mt-4">
                <span className="text-[#8b5a2b] text-xs font-bold tracking-[0.3em] uppercase mb-2 border-b border-[#8b5a2b]/30 pb-1">
                  Chapter {index + 1}
                </span>
                <h2 className="text-3xl font-calligraphy text-gray-900 mt-2 text-center">
                  {item.title}
                </h2>
              </div>

              <div className="space-y-6 font-serif text-gray-800 leading-loose text-lg text-justify flex-1">
                {item.text?.map((p, i) => {
                  // 判断是否使用首字下沉
                  const useDropCap = shouldDropCap(p, i === 0);

                  return (
                    <p key={i} className={i === 0 ? '' : 'indent-[2em]'}>
                      {useDropCap && (
                        <span className="drop-cap">{p.charAt(0)}</span>
                      )}
                      {useDropCap ? p.slice(1) : p}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {item.type === 'image' && (
            <div className="h-full flex flex-col justify-center px-2">
              <div className="border-l-4 border-[#8b5a2b] pl-6 mb-10">
                <h2 className="text-3xl font-bold text-gray-900 font-serif">
                  {item.title}
                </h2>
              </div>
              <div className="space-y-8">
                {item.images?.map((img, i) => (
                  <div key={i} className="relative group">
                    <div
                      className={`w-full h-56 ${
                        img.placeholder || 'bg-gray-200'
                      } shadow-xl border-[8px] border-white overflow-hidden relative`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-serif">
                        [ 影像: {img.caption} ]
                      </div>
                    </div>
                    <p className="mt-3 text-center text-sm text-[#8b5a2b] font-serif font-bold tracking-wider">
                      ▲ {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Page>
      ))}

      {/* ================= 封底 ================= */}
      <Page className="bg-[#f0ece2]">
        <div className="h-full w-full flex flex-col items-center justify-center text-center p-10 border-4 double border-[#d4c4a8]">
          <h3 className="text-2xl font-serif font-bold text-gray-800 mb-8 leading-snug whitespace-pre-line">
            {backCoverData.title}
          </h3>
          <button className="bg-[#2c2c2c] text-[#d4c4a8] px-8 py-3 rounded-sm shadow-xl tracking-widest text-sm uppercase font-bold border border-[#a17a43]">
            {backCoverData.cta}
          </button>
        </div>
      </Page>
    </HTMLFlipBook>
  );
}
