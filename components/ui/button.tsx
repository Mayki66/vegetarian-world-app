import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition";
    const variants = {
      default: "bg-zinc-900 text-white hover:bg-zinc-800",
      outline: "border border-zinc-300 dark:border-zinc-700 bg-transparent text-black dark:text-white",
      ghost: "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800"
    };
    const sizes = {
      default: "",
      icon: "w-8 h-8 p-0"
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
