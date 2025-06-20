import { cva, type VariantProps } from "class-variance-authority";
import { href, NavLink } from "react-router";
import { configSite } from "@/config/site";
import { cn } from "@/lib/utils";

const logoVariants = cva(
  "rounded select-none inline-flex items-center gap-1 font-semibold",
  {
    variants: {
      variant: {
        default: "",
        link: "",
      },
      size: {
        default: "text-xl",
        lg: "gap-2 text-4xl",
        xl: "gap-2 text-5xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const logoImageVariants = cva("", {
  variants: {
    size: {
      default: "size-6",
      lg: "size-10",
      xl: "size-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface LogoProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoVariants> {
  imageUrl?: string;
  altText?: string;
  text?: string;
  classNameImage?: string;
  classNameText?: string;
}

export function Logo({
  imageUrl = "/images/logos/dogokit.svg",
  altText = "Logo",
  text = configSite.name,
  variant,
  size,
  className,
  classNameImage: classNameIcon,
  classNameText,
}: LogoProps) {
  return (
    <span className={cn(logoVariants({ variant, size, className }))}>
      <img
        src={imageUrl}
        alt={altText}
        width={35}
        height={35}
        className={cn(logoImageVariants({ size, className: classNameIcon }))}
      />
      <span
        className={cn("whitespace-nowrap font-black font-brand", classNameText)}
      >
        {text}
      </span>
    </span>
  );
}

export function LogoNavigationLink() {
  return (
    <div className="flex items-center gap-2">
      <NavLink to={href("/")} className="focus-ring inline-flex items-center">
        <Logo className="p-2" />
      </NavLink>
    </div>
  );
}
