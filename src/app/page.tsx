'use client';

import { useState, useRef, useEffect } from 'react';
import { Message } from '@/types/chat';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import LoadingAnimation from '@/components/LoadingAnimation';
import { useLocalStorage } from '@/hooks/useLocalStorage';

import { downloadChat } from '@/utils/chat';
import SystemPromptModal from '@/components/SystemPromptModal';
import { useDarkMode } from '@/hooks/useDarkmode';

export default function Home() {
  const [messages, setMessages] = useLocalStorage('chat-messages', []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isSystemPromptModalOpen, setSystemPromptModalOpen] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful assistant.");
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isClient) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,  // 고유한 id 생성
      role: 'user',
      content: input.trim(),
    };

    try {
      setError(null);
      setIsLoading(true);
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      const allMessages = [
        { role: 'system', content: systemPrompt, id: 'system' },
        ...messages,
        userMessage
      ];

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: allMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,  // 고유한 id 생성
        role: 'assistant',
        content: data.content,
      }]);

    } catch (error: any) {
      setError(error.message || '메시지 전송 중 오류가 발생했습니다.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };


  const clearChat = () => {
    if (window.confirm('모든 대화 내용을 삭제하시겠습니까?')) {
      setMessages([]);
    }
  };

  const handleEditMessage = (id: string, newContent: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, content: newContent } : msg
      )
    );
  };

  const handleDeleteMessage = (id: string) => {
    if (window.confirm('이 메시지를 삭제하시겠습니까?')) {
      setMessages(prev => prev.filter(msg => msg.id !== id));
    }
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <main className="flex min-h-screen flex-col items-center p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* 헤더 */}
        <div className="w-full max-w-3xl flex justify-between items-center mb-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h1 className="text-2xl font-bold">AI Chat</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title={isDarkMode ? '라이트 모드' : '다크 모드'}
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>
            <button
              onClick={() => setSystemPromptModalOpen(true)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title="시스템 프롬프트 설정"
            >
              ⚙️
            </button>
            <button
              onClick={() => downloadChat(messages)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title="대화 내용 다운로드"
            >
              💾
            </button>
            <button
              onClick={clearChat}
              className="p-2 text-red-500 hover:text-red-700"
              title="대화 내용 지우기"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* 메시지 목록 */}
        <div className="w-full max-w-3xl flex-1 overflow-y-auto">
          <div className="space-y-4 pb-24">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onEdit={handleEditMessage}
                onDelete={handleDeleteMessage}
              />
            ))}
            {isLoading && <LoadingAnimation />}
            {error && (
              <div className="text-red-500 p-4 text-center bg-red-100 dark:bg-red-900 rounded-lg">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* 입력 영역 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 border-t dark:border-gray-700">
          <div className="mx-auto max-w-3xl">
            <ChatInput
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* 시스템 프롬프트 모달 */}
        <SystemPromptModal
          isOpen={isSystemPromptModalOpen}
          onClose={() => setSystemPromptModalOpen(false)}
          onSave={setSystemPrompt}
          currentPrompt={systemPrompt}
        />
      </main>
    </div>
  );
}