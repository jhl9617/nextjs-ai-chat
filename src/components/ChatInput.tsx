interface ChatInputProps {
    input: string;
    setInput: (input: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
  }
  
  export default function ChatInput({ input, setInput, handleSubmit, isLoading }: ChatInputProps) {
    return (
      <form onSubmit={handleSubmit} className="w-full max-w-3xl">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 border rounded-md resize-none text-black"
            rows={2}
            placeholder="Type your message here..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-blue-500 px-6 py-4 text-white hover:bg-blue-600 disabled:opacity-50"
          >
            전송
          </button>
        </div>
      </form>
    );
  }