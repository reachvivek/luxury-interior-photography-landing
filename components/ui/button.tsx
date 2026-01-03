import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-stone-900 hover:bg-stone-800 hover:-translate-y-0.5 text-white tracking-widest uppercase text-sm",
      secondary:
        "bg-[#EBE6E5] hover:bg-stone-200 text-stone-900 tracking-widest uppercase text-sm",
      outline:
        "border-2 border-stone-400 text-stone-800 hover:bg-stone-800 hover:text-white hover:border-stone-800 tracking-widest uppercase text-sm",
      ghost: "text-stone-700 hover:text-stone-900 hover:bg-stone-100",
    };

    const sizes = {
      sm: "px-6 py-2.5 text-xs",
      md: "px-8 py-4 text-sm",
      lg: "px-10 py-4 text-sm",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
