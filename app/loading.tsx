export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f9f9ff] via-white to-[#f3f0ff]">

      {/* Soft glow background */}
      <div className="absolute w-72 h-72 bg-[#6c47ff]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#9b72ff]/10 rounded-full blur-3xl animate-pulse" />

      {/* Loader Card */}
      <div className="relative flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-[#ede9fe]"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-t-[#6c47ff] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>

        {/* Brand text */}
        <h2 className="text-lg font-semibold text-[#0f0a1e]">
          Preparing your journey...
        </h2>

        <p className="text-sm text-gray-400 text-center max-w-xs">
          Finding the best stays, experiences, and destinations for you
        </p>

        {/* Dots animation */}
        <div className="flex gap-1 mt-2">
          <span className="h-2 w-2 bg-[#6c47ff] rounded-full animate-bounce" />
          <span className="h-2 w-2 bg-[#9b72ff] rounded-full animate-bounce [animation-delay:150ms]" />
          <span className="h-2 w-2 bg-[#c4b5fd] rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}