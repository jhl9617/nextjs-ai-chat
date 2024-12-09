import { Message } from '@/types/chat';

export async function sendMessage(messages: Message[]) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('API 요청 실패');
  }

  return response.json();
}