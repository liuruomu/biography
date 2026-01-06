import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('【后端收到新客户】:', body);

    // 这里是以后接入数据库存用户信息的地方

    return NextResponse.json({
      success: true,
      message: '提交成功，我们会尽快联系您',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '提交失败' },
      { status: 500 }
    );
  }
}
