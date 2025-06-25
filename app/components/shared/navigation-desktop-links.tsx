import { NavLink } from "react-router";
import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/config/site";
import { useAuthUser } from "@/hooks/use-auth-user";
import { filterNavItems } from "@/lib/navlink";
import { cn } from "@/lib/utils";

export function NavigationDesktopLinks({ items }: { items: NavItem[] }) {
  const { isAuthenticated } = useAuthUser();
  return (
    <ul className="inline-flex gap-2">
      {filterNavItems(items, isAuthenticated).map((item) => (
        <li key={item.to}>
          <NavLink
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "whitespace-nowrap hover:bg-accent/50 hover:text-primary dark:hover:bg-accent/50",
                isActive && "bg-accent text-primary"
              )
            }
            key={item.to}
            to={item.to}
          >
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
