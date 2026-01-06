// types/index.ts

// 章节内容的类型定义
export interface BookPageData {
  type: 'cover' | 'text' | 'image' | 'back-cover';
  title: string;
  subtitle?: string; // 封面副标题
  author?: string; // 作者
  year?: string; // 年份
  chapter?: string; // 章节名 (Chapter 1)
  text?: string[]; // 正文段落
  images?: { caption: string; url?: string; placeholder?: string }[];
  cta?: string; // 封底按钮文字
}
// API 返回的标准格式
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}
