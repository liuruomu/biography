'use client'; // 这一行加上，因为 dynamic import 需要在 client component 中使用

import dynamic from 'next/dynamic';
import { DB_BOOK_CONTENT } from '@/lib/db';

// ★★★ 核心修复：使用 dynamic import 并设置 ssr: false ★★★
// 这样 FlipBook 内部就不需要写 setMounted(true) 了，彻底解决 ESLint 报错
const FlipBook = dynamic(() => import('./components/FlipBook'), {
  ssr: false,
  loading: () => (
    <div className="text-[#d4c4a8] animate-pulse">正在加载回忆...</div>
  ),
});

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
          backgroundSize: '300px',
        }}
      ></div>

      <div className="z-10 w-full h-full flex items-center justify-center p-4">
        {/* 现在直接传递 rawData 即可 */}
        <FlipBook rawData={DB_BOOK_CONTENT} />
      </div>
    </main>
  );
}
