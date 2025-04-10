import * as React from "react";

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse">{children}</table>;
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-zinc-100 dark:bg-zinc-700">{children}</thead>;
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <tr className={`border-b dark:border-zinc-600 ${className}`}>{children}</tr>;
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-2 text-sm font-semibold">{children}</th>;
}

export function TableCell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-2 align-top text-sm ${className}`}>{children}</td>;
}
