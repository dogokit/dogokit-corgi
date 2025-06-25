import { Theme, useTheme } from "remix-themes";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemeToggleSelect() {
  const [theme, setTheme, { definedBy }] = useTheme();
  const value = definedBy === "SYSTEM" ? "" : (theme ?? "");

  const handleChange = (newSelectValue: string) => {
    if (newSelectValue === "") {
      setTheme(null);
    } else {
      setTheme(newSelectValue as Theme);
    }
  };

  return (
    <Select name="theme" onValueChange={handleChange} value={value}>
      <SelectTrigger className="w-26">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Theme</SelectLabel>
          <SelectItem value={"system"}>System</SelectItem>
          <SelectItem value={Theme.LIGHT}>Light</SelectItem>
          <SelectItem value={Theme.DARK}>Dark</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
