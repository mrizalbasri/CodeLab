import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "relative w-full h-full bg-gradient-to-b from-indigo-50 via-white to-purple-50 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
        className,
      )}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        width="100%"
        height="100%"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q300,20 600,40 T1200,40 L1200,120 L0,120 Z"
          fill="url(#grad1)"
          opacity="0.15"
        />
        <path
          d="M0,50 Q300,30 600,50 T1200,50 L1200,120 L0,120 Z"
          fill="url(#grad1)"
          opacity="0.08"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};
