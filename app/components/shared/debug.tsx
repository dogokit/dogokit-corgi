import { XIcon } from "lucide-react";
import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { stringifyCode } from "@/lib/string";
import { cn } from "@/lib/utils";

/**
 * Debug
 *
 * Preformat code component to show debugging information.
 */

export function Debug({
  name,
  hidden = false,
  isCollapsibleOpen = false,
  className,
  children,
}: {
  name?: string;
  hidden?: boolean;
  isCollapsibleOpen?: boolean;
  isAlwaysShow?: boolean;
  className?: string;
  children?: string | object;
}) {
  const [isVisible, setIsVisible] = useState(!hidden);
  const [isOpen, setIsOpen] = useState(isCollapsibleOpen);

  if (!isVisible) return null;

  return (
    <div>
      <Collapsible className="space-y-1" onOpenChange={setIsOpen} open={isOpen}>
        <div className="flex flex-nowrap gap-1">
          <CollapsibleTrigger
            className={cn(buttonVariants({ variant: "outline", size: "xs" }))}
          >
            <span>DEBUG</span>
            {name && <span>: {name}</span>}
          </CollapsibleTrigger>

          <Button
            onClick={() => setIsVisible(false)}
            size="icon-xs"
            variant="outline"
          >
            <XIcon className="size-3" />
          </Button>
        </div>

        <CollapsibleContent>
          <pre
            className={cn(
              "max-w-md text-[0.5rem]",
              "break-spaces my-1 overflow-scroll rounded-xl border border-surface-200 bg-white p-1 dark:border-surface-800 dark:bg-black",
              className
            )}
          >
            {stringifyCode(children)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
