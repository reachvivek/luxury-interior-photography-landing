import { HTMLAttributes } from "react";
import { clsx } from "clsx";
import { Container } from "./container";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "full";
  noPadding?: boolean;
}

export function Section({
  children,
  className,
  containerSize = "lg",
  noPadding = false,
  ...props
}: SectionProps) {
  const paddingStyles = noPadding ? "" : "py-16 md:py-24";

  return (
    <section className={clsx(paddingStyles, className)} {...props}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
