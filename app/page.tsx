import FlipBook from './components/FlipBook';
import { BookPageData } from '@/types';

// 获取当前环境 URL
function getBaseUrl() {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

// 真实 HTTP 请求后端 API
async function getBookDataViaAPI(): Promise<BookPageData[]> {
  const apiUrl = `${getBaseUrl()}/api/book`;
  console.log(`🌍 Fetching: ${apiUrl}`);

  try {
    const res = await fetch(apiUrl, { cache: 'no-store' }); // 不缓存，确保实时
    if (!res.ok) throw new Error('Failed to fetch');
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  const bookData = await getBookDataViaAPI();

  return (
    // ★ 核心修复：容器占满全屏，内容水平垂直居中
    // 这样书打开变宽时，会自动重新计算中心点
    <main className="w-full h-screen flex flex-col items-center justify-center bg-[#1a1a1a] relative overflow-hidden">
      {/* 木纹背景 */}
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

      {/* 书本容器：padding-y 留出空间 */}
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
