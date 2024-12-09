import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key가 설정되지 않았습니다." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const messages = body.messages || [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    return NextResponse.json(completion.choices[0].message);
    
  } catch (error: any) {
    console.error('OpenAI API 에러:', error);
    return NextResponse.json(
      { error: error.message || "알 수 없는 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}