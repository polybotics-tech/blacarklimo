"use client";

import { FileQuestionMarkIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  //--hooks
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-pri-bg centralize p-4 sm:p-6">
      <div className="w-full max-w-135 bg-card-bg rounded-2xl p-4 sm:p-6 centralize flex-col gap-6 sm:gap-6">
        <FileQuestionMarkIcon
          size={64}
          strokeWidth={0.8}
          className="text-pri-text"
        />

        <div className="w-full space-y-2">
          <h3 className="text-center">Oops! Content Not Found</h3>
          <p className="text-center">
            What you&apos;re looking for doesn&apos;t exist or may have been
            moved somewhere else.
          </p>
        </div>

        <div className="w-full centralize gap-4">
          <button
            onClick={() => router.back()}
            className="flex flex-1 h-12 rounded-full centralize bg-pri-bg"
          >
            <p className="font-medium text-pri-text">Go Back</p>
          </button>

          <Link
            href={"/"}
            className="flex flex-1 h-12 rounded-full centralize bg-pri-text"
          >
            <p className="font-medium text-pri-bg">Go Home</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
