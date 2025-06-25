import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type LucideProps, Monitor, Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useCallback } from "react";
import type { Theme } from "remix-themes";

import { cn } from "@/lib/utils";

type ThemeOption = {
  key: "" | "light" | "dark";
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
};

const themes: ThemeOption[] = [
  { key: "", label: "System theme", icon: Monitor },
  { key: "light", label: "Light theme", icon: Sun },
  { key: "dark", label: "Dark theme", icon: Moon },
];

export type ThemeSwitcherProps = {
  value?: Theme | "";
  onChange?: (themeKey: Theme | "") => void;
  defaultValue?: Theme | "";
  className?: string;
};

export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = "",
  className,
}: ThemeSwitcherProps) => {
  const [theme, setTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange,
  });

  const handleThemeClick = useCallback(
    (themeKey: Theme | "") => {
      setTheme(themeKey);
    },
    [setTheme]
  );

  return (
    <div
      className={cn(
        "relative isolate flex h-8 rounded-full bg-card p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;

        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as Theme)}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4",
                isActive ? "text-primary-foreground" : "text-muted-foreground"
              )}
            />
            <span className="sr-only">Toggle theme</span>
          </button>
        );
      })}
    </div>
  );
};
