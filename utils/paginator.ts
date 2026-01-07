import { RawBookData, RenderedPage } from '@/types';

interface LayoutConfig {
  width: number;
  height: number;
  fontSize: number;
  lineHeightScale: number;
  titleHeight: number;
}

export function paginateBook(
  raw: RawBookData,
  config: LayoutConfig
): RenderedPage[] {
  const pages: RenderedPage[] = [];

  pages.push({
    type: 'cover',
    mainTitle: raw.title,
    subTitle: raw.subtitle,
    author: raw.author,
  });

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${config.fontSize}px "Noto Serif SC", serif`;

  const lineHeightPx = config.fontSize * config.lineHeightScale;

  let currentLines: string[] = [];
  let currentY = 0;
  let currentChapterTitle = '';
  let isChapterStart = false;

  const flushPage = () => {
    if (currentLines.length === 0 && !isChapterStart) return;
    pages.push({
      type: 'text',
      chapterTitle: currentChapterTitle,
      lines: [...currentLines],
      isChapterStart: isChapterStart,
    });
    currentLines = [];
    currentY = 0;
    isChapterStart = false;
  };

  const addLine = (text: string, isParaEnd: boolean) => {
    if (currentY + lineHeightPx > config.height) {
      flushPage();
    }
    currentLines.push(text);
    currentY += lineHeightPx;
    if (isParaEnd) {
      currentY += lineHeightPx * 0.6; // 段间距
    }
  };

  raw.chapters.forEach((chapter) => {
    flushPage();
    currentChapterTitle = chapter.title;
    isChapterStart = true;
    currentY += config.titleHeight;

    chapter.paragraphs.forEach((para) => {
      const chars = para.split('');

      // ★★★ 核心修复：直接插入两个全角空格 (\u3000) ★★★
      // 这样在渲染时，whitespace-pre-wrap 会自动识别并显示缩进
      // Canvas 的 measureText 也会把这两个空格的宽度算进去
      let bufferLine = '\u3000\u3000';
      let currentLineWidth = ctx.measureText(bufferLine).width;

      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const charWidth = ctx.measureText(char).width;

        if (currentLineWidth + charWidth > config.width) {
          // 换行
          addLine(bufferLine, false);
          bufferLine = char;
          currentLineWidth = charWidth;
        } else {
          bufferLine += char;
          currentLineWidth += charWidth;
        }
      }
      // 提交段落最后一行
      if (bufferLine) {
        addLine(bufferLine, true);
      }
    });
  });

  flushPage();

  pages.push({
    type: 'back-cover',
    mainTitle: raw.backCover.title,
    cta: raw.backCover.cta,
  });

  return pages;
}
