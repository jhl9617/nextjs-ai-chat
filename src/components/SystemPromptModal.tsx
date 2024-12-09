import { useState } from 'react';

interface SystemPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (prompt: string) => void;
  currentPrompt: string;
}

export default function SystemPromptModal({
  isOpen,
  onClose,
  onSave,
  currentPrompt
}: SystemPromptModalProps) {
  const [prompt, setPrompt] = useState(currentPrompt);

  const handleSave = () => {
    onSave(prompt);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">시스템 프롬프트 설정</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-40 p-2 border rounded dark:bg-gray-700"
          placeholder="AI의 역할과 행동 방식을 설정하세요..."
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}