import type { Metadata } from 'next';
// 1. 引入谷歌字体
import { Noto_Serif_SC, Ma_Shan_Zheng } from 'next/font/google';
import './globals.css';

// 2. 配置宋体 (正文用)
const notoserif = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['400', '700'], // 加载常规和粗体
  variable: '--font-noto-serif', // 定义 CSS 变量名
  preload: false, // 中文字体包太大，建议关掉 preload 或者按需配置
});

// 3. 配置书法体 (封面标题用)
const mashan = Ma_Shan_Zheng({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ma-shan',
  preload: false,
});

export const metadata: Metadata = {
  title: '沉默的麦穗 - 父亲传记',
  description: '一位父亲的五十年风雨',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      {/* 4. 将字体变量注入到 body 中 */}
      <body className={`${notoserif.variable} ${mashan.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
