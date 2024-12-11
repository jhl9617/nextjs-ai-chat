import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import { Message } from "@/types/chat";
import { copyToClipboard } from "@/utils/chat";

interface ChatMessageProps {
  message: Message;
  onEdit?: (id: string, content: string) => void;
  onDelete?: (id: string) => void;
}

export default function ChatMessage({
  message,
  onEdit,
  onDelete,
}: ChatMessageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleEdit = () => {
    if (isEditing && onEdit) {
      onEdit(message.id, editContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      } mb-4 group`}
    >
      <div
        className={`max-w-[80%] rounded-lg p-4 relative ${
          message.role === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        }`}
      >
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full bg-transparent border rounded p-2"
          />
        ) : (
          <MarkdownRenderer content={message.content} />
        )}

        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
            title={copySuccess ? "복사됨!" : "복사하기"}
          >
            {copySuccess ? "✓" : "📋"}
          </button>
          {onEdit && (
            <button
              onClick={handleEdit}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded ml-1"
            >
              {isEditing ? "💾" : "✏️"}
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(message.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded ml-1"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
