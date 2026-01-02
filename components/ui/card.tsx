import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "glass" | "solid" | "outlined";
  hover?: boolean;
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "glass", hover = true, className, children, ...props }, ref) => {
    const baseStyles = "rounded-lg transition-all duration-300 ease-in-out";

    const variants = {
      glass: "bg-white/10 backdrop-blur-md border border-white/20",
      solid: "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800",
      outlined: "border-2 border-stone-300 dark:border-stone-700",
    };

    const hoverStyles = hover ? "hover:scale-105 hover:shadow-xl" : "";

    return (
      <div
        ref={ref}
        className={clsx(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export { Card };
