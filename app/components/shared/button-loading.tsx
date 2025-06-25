import type { VariantProps } from "class-variance-authority";
import React from "react";
import { Button, type buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner-icon";
import { useIsSubmitting } from "@/hooks/use-is-submitting";
import { cn } from "@/lib/utils";

interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  hasSpinner?: boolean;
  submittingText?: React.ReactNode;
  isSubmittingOverride?: boolean;
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      hasSpinner = true,
      submittingText = "",
      isSubmittingOverride,
      size,
      children,
      ...props
    },
    ref
  ) => {
    const isSubmittingGlobal = useIsSubmitting();
    const isSubmitting = isSubmittingOverride || isSubmittingGlobal;

    return (
      <Button disabled={isSubmitting} ref={ref} size={size} {...props}>
        {!isSubmitting && children}
        {isSubmitting && (
          <>
            {hasSpinner && (
              <Spinner className={cn(size?.toString() === "xs" && "size-2")} />
            )}
            {submittingText || children}
          </>
        )}
      </Button>
    );
  }
);
ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
