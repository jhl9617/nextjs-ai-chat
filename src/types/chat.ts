export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}
  
export interface ChatHistory {
  messages: Message[];
}