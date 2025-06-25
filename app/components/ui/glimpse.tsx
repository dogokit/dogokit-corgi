import type { ComponentProps } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

export type GlimpseProps = ComponentProps<typeof HoverCard>;

export const Glimpse = (props: GlimpseProps) => {
  return <HoverCard {...props} />;
};

export type GlimpseContentProps = ComponentProps<typeof HoverCardContent>;

export const GlimpseContent = (props: GlimpseContentProps) => (
  <HoverCardContent {...props} />
);

export type GlimpseTriggerProps = ComponentProps<typeof HoverCardTrigger>;

export const GlimpseTrigger = (props: GlimpseTriggerProps) => (
  <HoverCardTrigger {...props} />
);

export type GlimpseTitleProps = ComponentProps<"p">;

export const GlimpseTitle = ({ className, ...props }: GlimpseTitleProps) => {
  return (
    <p className={cn("truncate font-semibold text-sm", className)} {...props} />
  );
};

export type GlimpseDescriptionProps = ComponentProps<"p">;

export const GlimpseDescription = ({
  className,
  ...props
}: GlimpseDescriptionProps) => {
  return (
    <p
      className={cn("line-clamp-2 text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

export type GlimpseImageProps = ComponentProps<"img">;

export const GlimpseImage = ({
  className,
  alt,
  ...props
}: GlimpseImageProps) => {
  return (
    // biome-ignore lint/performance/noImgElement: "It is fine"
    <img
      alt={alt ?? "Glimpse"}
      className={cn(
        "mb-4 aspect-[120/63] w-full rounded-md border object-cover",
        className
      )}
      {...props}
    />
  );
};
