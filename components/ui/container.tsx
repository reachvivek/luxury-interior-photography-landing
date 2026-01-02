import { HTMLAttributes } from "react";
import { clsx } from "clsx";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "full";
}

export function Container({
  children,
  size = "lg",
  className,
  ...props
}: ContainerProps) {
  const sizes = {
    sm: "max-w-4xl",
    md: "max-w-6xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={clsx("mx-auto px-6 lg:px-8", sizes[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
