import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  /** Use max-w-7xl instead of max-w-6xl (the /skills stage). */
  wide?: boolean;
  className?: string;
};

/** Centered page column with the DESIGN.md side gutters (16 / 24 / 32px). */
export function Container({ children, wide = false, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full ${wide ? "max-w-7xl" : "max-w-6xl"} px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}
