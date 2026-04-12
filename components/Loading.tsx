"use client";

export default function LoadingOverlay({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-6 shadow-xl">
        
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#6c47ff]" />

        <p className="text-sm font-medium text-gray-600">
          Loading...
        </p>
      </div>
    </div>
  );
}