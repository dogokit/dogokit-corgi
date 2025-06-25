import { SearchIcon } from "lucide-react";
import { Form, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormSearch({
  action = "/search",
  placeholder = "Search...",
  autoFocus = false,
}: {
  action?: string;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <Form action={action} className="w-full" method="GET">
      <fieldset className="group relative flex items-center gap-1">
        <Label className="sr-only" htmlFor="search">
          Search
        </Label>
        <Input
          autoComplete="off"
          autoFocus={autoFocus}
          className="w-full py-2 ps-10 pe-3"
          defaultValue={query}
          name="q"
          placeholder={placeholder}
          type="search"
        />
        <span className="pointer-events-none absolute flex ps-3">
          <SearchIcon className="text-muted-foreground group-focus-within:text-primary" />
        </span>
      </fieldset>
    </Form>
  );
}
