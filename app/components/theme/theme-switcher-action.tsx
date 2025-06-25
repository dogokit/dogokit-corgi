import { type Theme, useTheme } from "remix-themes";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

export const ThemeSwitcherAction = () => {
  const [theme, setTheme, { definedBy }] = useTheme();
  const value = definedBy === "SYSTEM" ? "" : (theme ?? "");

  const handleChange = (themeKey: Theme | "") => {
    if (themeKey === "") {
      setTheme(null);
    } else {
      setTheme(themeKey);
    }
  };

  return (
    <ThemeSwitcher defaultValue="" onChange={handleChange} value={value} />
  );
};
