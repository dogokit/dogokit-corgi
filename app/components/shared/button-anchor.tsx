import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ButtonAnchorProps
  extends React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    VariantProps<typeof buttonVariants> {}

export const ButtonAnchor = ({
  href = "/",
  variant,
  size,
  className,
  children,
  ...props
}: ButtonAnchorProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </a>
  );
};
ButtonAnchor.displayName = "ButtonAnchor";
