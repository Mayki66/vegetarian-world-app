"use client";

import * as React from "react";

interface SelectProps {
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  defaultValue?: string;
}

export function Select({ children, onValueChange, defaultValue }: SelectProps) {
  const [value, setValue] = React.useState(defaultValue || "");

  React.useEffect(() => {
    onValueChange(value);
  }, [value]);

  return (
    <div className="relative inline-block w-full">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full appearance-none rounded border bg-white dark:bg-zinc-800 px-4 py-2 text-sm text-black dark:text-white"
      >
        {children}
      </select>
    </div>
  );
}

export function SelectTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ placeholder }: { placeholder: string }) {
  return <option value="Tous">{placeholder}</option>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <option value={value}>{children}</option>;
}
