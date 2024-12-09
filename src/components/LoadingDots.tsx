export default function LoadingDots() {
    return (
      <div className="flex space-x-1">
        <div className="animate-bounce h-2 w-2 bg-gray-500 rounded-full"></div>
        <div className="animate-bounce h-2 w-2 bg-gray-500 rounded-full" style={{ animationDelay: '0.2s' }}></div>
        <div className="animate-bounce h-2 w-2 bg-gray-500 rounded-full" style={{ animationDelay: '0.4s' }}></div>
      </div>
    );
  }