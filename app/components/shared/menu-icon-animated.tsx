import { cn } from "@/lib/utils";

export function MenuIconAnimated({ open }: { open: boolean }) {
  return (
    <div id="menu-icon-animated" className="relative size-4">
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
          open ? "-rotate-45 top-[0.4rem]" : "top-1"
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-0.5 w-4 bg-foreground transition-all duration-100",
          open ? "top-[0.4rem] rotate-45" : "top-2.5"
        )}
      />
    </div>
  );
}
