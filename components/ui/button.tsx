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
      "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30",
      secondary:
        "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20",
      outline:
        "border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white",
      ghost: "text-white hover:bg-white/10",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm rounded-md",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-xl",
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
