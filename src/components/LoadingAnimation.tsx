export default function LoadingAnimation() {
    return (
      <div className="flex items-center space-x-2 p-4">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-blue-500"
              style={{
                animation: 'bounce 1.4s infinite ease-in-out',
                animationDelay: `${i * 0.16}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }