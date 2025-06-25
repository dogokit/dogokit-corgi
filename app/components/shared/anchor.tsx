import React from "react";

import { cn } from "@/lib/utils";

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href, className, children, ...props }, ref) => {
    return (
      <a
        className={cn(className)}
        href={href || "/"}
        ref={ref}
        rel="noreferrer noopener"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  }
);
Anchor.displayName = "Anchor";

export { Anchor };
