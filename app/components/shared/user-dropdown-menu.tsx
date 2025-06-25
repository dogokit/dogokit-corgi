import type { VariantProps } from "class-variance-authority";
import { Link, NavLink } from "react-router";
import {
  AvatarAuto,
  type avatarAutoVariants,
} from "@/components/shared/avatar-auto";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { configNavigationItems, type NavItem } from "@/config/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";

// Configured as a function to be near with the other navItems
const getProfileNavItems = (username?: string | null) => [
  {
    text: "Profile",
    path: `/${username}`,
    icon: "user",
    shortcut: "⌘K+P",
  },
];

interface UserDropdownMenuProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarAutoVariants> {
  align?: "center" | "start" | "end" | undefined;
}

export function UserDropdownMenu({
  align = "end",
  size = "sm",
}: UserDropdownMenuProps) {
  const { user } = useAuthUser();
  if (!user) return null;

  // Configure the available paths in app/configs/navigation.ts
  const userNavItems = ["/dashboard", "/settings", "/notifications"];
  const authNavItems = ["/signout"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-ring rounded-full">
        <button className="cursor-pointer" type="button">
          <AvatarAuto size={size} user={user} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 overflow-scroll">
        <DropdownMenuLabel>
          <p className="font-semibold text-base">{user.name}</p>
          <p className="font-semibold text-muted-foreground text-sm">
            <Link prefetch="intent" to={`/${user.username}`}>
              @{user.username}
            </Link>
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={[
            ...getProfileNavItems(user.username),
            ...configNavigationItems.filter((item) =>
              userNavItems.includes(item.path)
            ),
          ]}
        />

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={configNavigationItems.filter((item) =>
            authNavItems.includes(item.path)
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * More than just navigation items, can be actions as well
 */
function DropdownMenuGroupItems({ items }: { items: NavItem[] }) {
  return (
    <DropdownMenuGroup>
      {items.map((item) => {
        // const isSignOut = item.path === "/signout";
        return (
          <DropdownMenuItem asChild key={item.path}>
            <NavLink prefetch="intent" to={item.path}>
              <span>{item.text}</span>
              {item.shortcut && (
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              )}
            </NavLink>
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuGroup>
  );
}
