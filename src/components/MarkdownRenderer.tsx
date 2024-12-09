import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="prose dark:prose-invert max-w-none"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  );
}