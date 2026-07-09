"use client"; // Error boundaries must be Client Components

import { AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  //--hooks
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-pri-bg centralize p-4 sm:p-6">
      <div className="w-full max-w-135 bg-card-bg rounded-2xl p-4 sm:p-6 centralize flex-col gap-6 sm:gap-6">
        <AlertTriangle size={64} strokeWidth={0.8} className="text-red-400" />

        <div className="w-full space-y-2">
          <h3 className="text-center text-red-400">
            Oops! Something Went Wrong
          </h3>
          <p className="text-center">
            It seems something is broken or unaccessible at the moment. If it
            persists, do contact support.
          </p>
        </div>

        <div className="w-full centralize gap-4">
          <button
            onClick={() => unstable_retry()}
            className="flex flex-1 h-12 rounded-full centralize bg-pri-bg"
          >
            <p className="font-medium text-pri-text">Try Again</p>
          </button>

          <button
            onClick={() => router.back()}
            className="flex flex-1 h-12 rounded-full centralize bg-pri-text"
          >
            <p className="font-medium text-pri-bg">Go Back</p>
          </button>
        </div>
      </div>
    </div>
  );
}
