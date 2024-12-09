import { useState, useEffect } from 'react';
import { Message } from '@/types/chat';

export function useLocalStorage(key: string, initialValue: Message[]) {
  // 초기 상태 설정
  const [storedValue, setStoredValue] = useState<Message[]>(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 값이 변경될 때마다 로컬 스토리지 업데이트
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}