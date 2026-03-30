'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function WatchButton({
  enrollmentId,
}: {
  enrollmentId: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push(`/dashboard/${enrollmentId}`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="mt-auto w-full flex items-center justify-center py-3 bg-blue-600 text-white text-sm font-semibold uppercase tracking-wider rounded-md hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Watch Now'}
    </button>
  );
}
