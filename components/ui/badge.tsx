import * as React from "react";

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-zinc-200 dark:bg-zinc-600 px-3 py-1 text-xs font-semibold text-zinc-700 dark:text-white">
      {children}
    </span>
  );
}
