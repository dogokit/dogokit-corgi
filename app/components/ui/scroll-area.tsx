/**
 * The Adaptive Scroll Area
 *
 * It feels native on touch devices, offering custom styling and enhanced interactions where it matters most.
 *
 * https://lina.sameer.sh
 */

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui-components/react/scroll-area";
import * as React from "react";
import { useTouchPrimary } from "@/components/ui/use-has-primary-touch";
import { cn } from "@/lib/utils";

type Mask = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
};

export type ScrollAreaContextProps = {
  isTouch: boolean;
  type: "auto" | "always" | "scroll" | "hover";
};

const ScrollAreaContext = React.createContext<ScrollAreaContextProps>({
  isTouch: false,
  type: "hover",
});

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    type?: "auto" | "always" | "scroll" | "hover";
    viewportClassName?: string;
    /**
     * `maskHeight` is the height of the mask in pixels.
     * pass `0` to disable the mask
     * @default 30
     */
    maskHeight?: number;
    maskClassName?: string;
  }
>(
  (
    {
      className,
      children,
      type = "hover",
      maskHeight = 30,
      maskClassName,
      viewportClassName,
      ...props
    },
    ref
  ) => {
    const [showMask, setShowMask] = React.useState<Mask>({
      top: false,
      bottom: false,
      left: false,
      right: false,
    });

    const viewportRef = React.useRef<HTMLDivElement>(null);
    const isTouch = useTouchPrimary();

    const checkScrollability = React.useCallback(() => {
      const element = viewportRef.current;
      if (!element) return;

      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollHeight,
        clientHeight,
      } = element;
      setShowMask((prev) => ({
        ...prev,
        top: scrollTop > 0,
        bottom: scrollTop + clientHeight < scrollHeight - 1,
        left: scrollLeft > 0,
        right: scrollLeft + clientWidth < scrollWidth - 1,
      }));
    }, []);

    React.useEffect(() => {
      if (typeof window === "undefined") return;

      const element = viewportRef.current;
      if (!element) return;

      const controller = new AbortController();
      const { signal } = controller;

      const resizeObserver = new ResizeObserver(checkScrollability);
      resizeObserver.observe(element);

      element.addEventListener("scroll", checkScrollability, { signal });
      window.addEventListener("resize", checkScrollability, { signal });

      // Run an initial check whenever dependencies change (including pointer mode)
      checkScrollability();

      return () => {
        controller.abort();
        resizeObserver.disconnect();
      };
    }, [checkScrollability]);

    return (
      <ScrollAreaContext.Provider value={{ isTouch, type }}>
        {isTouch ? (
          <div
            ref={ref}
            {...props}
            aria-roledescription="scroll area"
            className={cn("relative overflow-hidden", className)}
            data-slot="scroll-area"
            role="group"
          >
            <div
              className={cn("size-full overflow-auto", viewportClassName)}
              ref={viewportRef}
              // tabIndex={0}
            >
              {children}
            </div>
            {maskHeight > 0 && (
              <ScrollMask
                className={maskClassName}
                maskHeight={maskHeight}
                showMask={showMask}
              />
            )}
          </div>
        ) : (
          <ScrollAreaPrimitive.Root
            className={cn(
              "relative overflow-hidden",
              viewportClassName,
              className
            )}
            data-slot="scroll-area"
            ref={ref}
            {...props}
          >
            <ScrollAreaPrimitive.Viewport
              className={cn(
                "focus-ring size-full rounded-[inherit]",
                viewportClassName
              )}
              data-slot="scroll-area-viewport"
              ref={viewportRef}
            >
              {children}
            </ScrollAreaPrimitive.Viewport>
            <ScrollBar />
            <ScrollAreaPrimitive.Corner />
            {maskHeight > 0 && (
              <ScrollMask
                className={maskClassName}
                maskHeight={maskHeight}
                showMask={showMask}
              />
            )}
          </ScrollAreaPrimitive.Root>
        )}
      </ScrollAreaContext.Provider>
    );
  }
);

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  const { isTouch, type } = React.useContext(ScrollAreaContext);

  if (isTouch) return null;

  return (
    <ScrollAreaPrimitive.Scrollbar
      className={cn(
        "flex touch-none select-none p-px transition-[colors,opacity] duration-150 ease-out hover:bg-muted dark:hover:bg-muted/50",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent px-1 pr-1.25",
        type === "hover" && "opacity-0 data-[hovering]:opacity-100",
        type === "scroll" && "opacity-0 data-[scrolling]:opacity-100",
        className
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        className={cn(
          "relative flex-1 rounded-full bg-border transition-[scale]",
          orientation === "vertical" && "my-1 active:scale-y-95",
          orientation === "horizontal" && "active:scale-x-98"
        )}
        data-slot="scroll-area-thumb"
      />
    </ScrollAreaPrimitive.Scrollbar>
  );
});

ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName;

const ScrollMask = ({
  showMask,
  maskHeight,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  showMask: Mask;
  maskHeight: number;
}) => {
  return (
    <>
      <div
        {...props}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "before:absolute before:inset-x-0 before:top-0 before:transition-[height,opacity] before:duration-300 before:content-['']",
          "after:absolute after:inset-x-0 after:bottom-0 after:transition-[height,opacity] after:duration-300 after:content-['']",
          "before:h-(--top-fade-height) after:h-(--bottom-fade-height)",
          showMask.top ? "before:opacity-100" : "before:opacity-0",
          showMask.bottom ? "after:opacity-100" : "after:opacity-0",
          "before:bg-gradient-to-b before:from-background before:to-transparent",
          "after:bg-gradient-to-t after:from-background after:to-transparent",
          className
        )}
        style={
          {
            "--top-fade-height": showMask.top ? `${maskHeight}px` : "0px",
            "--bottom-fade-height": showMask.bottom ? `${maskHeight}px` : "0px",
          } as React.CSSProperties
        }
      />
      <div
        {...props}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10",
          "before:absolute before:inset-y-0 before:left-0 before:transition-[width,opacity] before:duration-300 before:content-['']",
          "after:absolute after:inset-y-0 after:right-0 after:transition-[width,opacity] after:duration-300 after:content-['']",
          "before:w-(--left-fade-width) after:w-(--right-fade-width)",
          showMask.left ? "before:opacity-100" : "before:opacity-0",
          showMask.right ? "after:opacity-100" : "after:opacity-0",
          "before:bg-gradient-to-r before:from-background before:to-transparent",
          "after:bg-gradient-to-l after:from-background after:to-transparent",
          className
        )}
        style={
          {
            "--left-fade-width": showMask.left ? `${maskHeight}px` : "0px",
            "--right-fade-width": showMask.right ? `${maskHeight}px` : "0px",
          } as React.CSSProperties
        }
      />
    </>
  );
};

export { ScrollArea, ScrollBar };
