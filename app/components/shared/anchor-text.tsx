import React from "react";

import { cn } from "@/lib/utils";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  noBreak?: boolean;
  disabled?: boolean;
}

const AnchorText = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  (
    {
      href = "/",
      noBreak = true,
      disabled = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <a
        className={cn(
          "prose-a-styles font-semibold",
          noBreak && "whitespace-pre",
          disabled && "cursor-not-allowed opacity-75",
          className
        )}
        href={href}
        ref={ref}
        rel="noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  }
);
AnchorText.displayName = "AnchorText";

export { AnchorText };
