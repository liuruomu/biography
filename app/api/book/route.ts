import { NextResponse } from 'next/server';
import { getBookContent } from '@/lib/db';

export async function GET() {
  try {
    const data = await getBookContent();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '获取书籍失败' },
      { status: 500 }
    );
  }
}
