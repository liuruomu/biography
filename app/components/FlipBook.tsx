'use client';

import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Page } from './Page';
import { FontControl } from './FontControl'; // 引入新组件
import { RawBookData, RenderedPage } from '@/types';
import { paginateBook } from '@/utils/paginator';

interface FlipBookProps {
  rawData: RawBookData;
}

export default function FlipBook({ rawData }: FlipBookProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const bookRef = useRef<HTMLFlipBook>(null);
  const [pages, setPages] = useState<RenderedPage[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // ★★★ 新增：字体等级状态 (0-4) ★★★
  const [fontLevel, setFontLevel] = useState(0);
  // 记录当前实际使用的像素值，用于传给 renderPageContent
  const [currentPixelSize, setCurrentPixelSize] = useState(16);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const _isMobile = w < 768;

      setIsMobile(_isMobile);

      // 1. 计算书本尺寸 (保持不变)
      let bookW, bookH;
      if (_isMobile) {
        bookW = Math.min(w * 0.95, 500);
        bookH = Math.min(h * 0.85, bookW * 1.5);
      } else {
        bookW = 500;
        bookH = 750;
      }
      setDimensions({ width: bookW, height: bookH });

      // 2. 动态排版 (关键修改)
      const contentPaddingX = _isMobile ? 40 : 96;
      const contentPaddingY = _isMobile ? 80 : 120;

      // ★★★ 字体计算逻辑 ★★★
      // 基础字号：手机16px，电脑18px
      const baseSize = _isMobile ? 16 : 18;
      // 每一级增加 2px (或者你觉得老人需要更大，可以改成 3px 或 4px)
      const step = 2.5;
      const finalFontSize = baseSize + fontLevel * step;

      setCurrentPixelSize(finalFontSize); // 存下来给渲染用

      // 调用排版引擎
      const layoutPages = paginateBook(rawData, {
        width: bookW - contentPaddingX,
        height: bookH - contentPaddingY,
        fontSize: finalFontSize, // 传入动态字号
        lineHeightScale: 1.8, // 行高倍数不变，但因为字号大了，绝对行高也会变大
        titleHeight: 80,
      });

      setPages(layoutPages);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

    // ★★★ 关键：fontLevel 变化时，重新运行 useEffect ★★★
  }, [rawData, fontLevel]);

  if (pages.length === 0) {
    return (
      <div className="text-[#d4c4a8] animate-pulse font-serif">
        正在为您排版...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      {/* @ts-ignore 
      eslint-disable-next-line @typescript-eslint/ban-ts-comment
      */}
      <HTMLFlipBook
        width={dimensions.width}
        height={dimensions.height}
        size="fixed"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1600}
        usePortrait={isMobile}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-2xl"
        ref={bookRef}
        flippingTime={1000} // 翻页慢一点适合老人
        drawShadow={!isMobile} // 手机端关阴影防闪烁
        showPageCorners={!isMobile}
        swipeDistance={30}
        style={{}}
        startPage={0}
        startZIndex={0}
        autoSize={true}
        clickEventForward={true}
        useMouseEvents={true}
        disableFlipByClick={false}
      >
        {pages.map((page, index) => (
          <Page
            key={index}
            number={index > 0 && index < pages.length - 1 ? index : undefined}
            className={
              page.type === 'cover' ? '!bg-transparent !p-0 shadow-none' : ''
            }
          >
            {/* ★★★ 将动态计算的字号传给渲染器 ★★★ */}
            {renderPageContent(page, isMobile, currentPixelSize)}
          </Page>
        ))}
      </HTMLFlipBook>

      {/* ★★★ 放置字体控制器 ★★★ */}
      <FontControl currentLevel={fontLevel} onChange={setFontLevel} />
    </div>
  );
}

// === 渲染器修改：接收 fontSize 参数 ===
function renderPageContent(
  page: RenderedPage,
  isMobile: boolean,
  fontSize: number
) {
  // ... 封面和封底逻辑保持不变 (通常封面字号不需要动，或者也可以按比例动) ...
  if (page.type === 'cover') {
    /* ... 保持原代码 ... */
    // 省略代码，请保留之前的 Cover 渲染逻辑
    // 这里为了节省篇幅，假设你已经有了之前的代码
    return (
      <div className="h-full w-full bg-leather border-l-4 md:border-l-8 border-gray-900 flex flex-col items-center p-0 relative overflow-hidden">
        {/* ... 内容保持不变 ... */}
        <div className="h-[95%] w-[90%] border-[1px] border-[#a17a43]/40 m-auto relative flex flex-col items-center p-4">
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#a17a43]"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#a17a43]"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#a17a43]"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#a17a43]"></div>
          <div className="text-[#a17a43] text-[10px] tracking-[0.4em] mt-12 mb-4 font-serif uppercase text-center opacity-80">
            Private Biography
          </div>
          <div className="flex-1 flex flex-col items-center justify-center w-full my-4">
            <div className="writing-vertical-rl text-gold font-calligraphy text-5xl md:text-7xl leading-snug py-8 border-y border-[#a17a43]/20">
              {page.mainTitle}
            </div>
          </div>
          <div className="mb-12 text-xl font-serif text-[#d4c4a8] tracking-[0.2em] font-light text-center">
            {page.subTitle}
          </div>
          <div className="mb-8 text-[#a17a43] text-sm font-serif tracking-widest border-t border-[#a17a43]/30 pt-4 px-8">
            {page.author}
          </div>
        </div>
      </div>
    );
  }

  if (page.type === 'back-cover') {
    /* ... 保持原代码 ... */
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-[#f0ece2]">
        <div className="h-full w-full border-4 double border-[#d4c4a8] flex flex-col items-center justify-center text-center p-8">
          <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800 mb-8 leading-relaxed whitespace-pre-line">
            {page.mainTitle}
          </h3>
          <button className="bg-[#2c2c2c] text-[#d4c4a8] px-6 py-3 md:px-8 rounded-sm shadow-xl tracking-widest text-xs md:text-sm uppercase font-bold border border-[#a17a43]">
            {page.cta}
          </button>
        </div>
      </div>
    );
  }

  // ★★★ 正文修改：应用 fontSize ★★★
  if (page.type === 'text') {
    return (
      <div
        className={`h-full flex flex-col ${
          isMobile ? 'px-4 py-6' : 'px-10 py-12'
        }`}
      >
        <div className="flex justify-center mb-4 md:mb-8 mt-2 border-b border-[#a17a43]/20 pb-2">
          <span className="text-[#a17a43] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
            {page.chapterTitle}
          </span>
        </div>

        {page.isChapterStart && (
          <div className="mb-6 md:mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-calligraphy text-gray-900">
              {page.chapterTitle}
            </h2>
          </div>
        )}

        <div className="flex-1 font-serif text-gray-800 text-justify">
          {page.lines?.map((line, i) => {
            return (
              <div
                key={i}
                className="whitespace-pre-wrap leading-loose break-words"
                // ★★★ 这里直接使用传入的 fontSize 变量 ★★★
                style={{ fontSize: `${fontSize}px` }}
              >
                {line}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
}
