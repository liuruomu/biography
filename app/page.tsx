// app/page.tsx

import FlipBook from './components/FlipBook';
// 👇 关键改变：不再引入 fetch 相关的逻辑，直接引入后端逻辑
import { getBookContent } from '@/lib/db';
import { BookPageData } from '@/types';

// 这个函数以前是 fetch，现在改成直接调数据库方法
function getBookData(): BookPageData[] {
  console.log('🌍 [Server]正在直接从数据库/文件读取数据...');

  // 直接调用 lib/db.ts 里的函数
  // 这在 Next.js 服务端组件中是标准且最高效的做法
  const data = getBookContent();
  return data;
}

export default async function Home() {
  // 获取数据
  const bookData = await getBookData();

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
      {/* 背景纹理 */}
      <div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
          backgroundSize: '300px',
        }}
      ></div>

      <div className="z-10 text-center mb-6">
        <h1 className="text-[#d4c4a8] text-opacity-80 text-lg font-serif tracking-[0.3em] uppercase drop-shadow-md">
          Private Biography Collection
        </h1>
      </div>

      <div className="z-10 w-full flex items-center justify-center py-4">
        {bookData.length > 0 ? (
          <FlipBook data={bookData} />
        ) : (
          <div className="text-[#d4c4a8] animate-pulse">
            Loading Biography...
          </div>
        )}
      </div>
    </main>
  );
}
