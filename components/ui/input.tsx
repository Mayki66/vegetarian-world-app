import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full rounded border px-4 py-2 text-sm bg-white text-black dark:bg-zinc-800 dark:text-white ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
