// types.ts

// 1. 输入数据：原始 JSON 结构
export interface RawChapter {
  title: string;
  paragraphs: string[];
}

export interface RawBookData {
  title: string;
  subtitle: string;
  author: string;
  chapters: RawChapter[];
  backCover: {
    title: string;
    cta: string;
  };
}

// 2. 输出数据：计算后的页面结构
export type PageType = 'cover' | 'text' | 'image' | 'back-cover';

export interface RenderedPage {
  type: PageType;
  // 通用字段
  pageNumber?: number;

  // 封面/封底用
  mainTitle?: string;
  subTitle?: string;
  author?: string;
  cta?: string;

  // 正文页用
  chapterTitle?: string; // 页眉显示的当前章节名
  lines?: string[]; // 这一页要显示的行（已经是切分好的）
  isChapterStart?: boolean; // 是否是章节的第一页（用于显示大标题）
}
