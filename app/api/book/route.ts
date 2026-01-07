import { NextResponse } from 'next/server';
import { DB_BOOK_CONTENT } from '@/lib/db';

export async function GET() {
  try {
    return NextResponse.json({ success: true, data: DB_BOOK_CONTENT });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '获取书籍失败' },
      { status: 500 }
    );
  }
}
