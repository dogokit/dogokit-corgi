import { LogoNavigationLink } from "@/components/shared/logo";
import { NavigationDesktopLinks } from "@/components/shared/navigation-desktop-links";
import { UserDropdownMenu } from "@/components/shared/user-dropdown-menu";
import { configSite } from "@/config/site";
import { cn } from "@/lib/utils";

export function NavigationDesktop() {
  return (
    <nav
      className={cn(
        "w-full rounded-full border bg-background px-4 py-2",
        "grid grid-cols-1 items-center gap-2 sm:grid-cols-3 sm:gap-8"
      )}
      id="navigation-desktop"
    >
      <LogoNavigationLink />

      <div className="flex justify-center gap-2">
        <NavigationDesktopLinks items={configSite.navItems} />
      </div>

      <div className="flex justify-end gap-2">
        <NavigationDesktopLinks items={configSite.navAuthItems} />
        <UserDropdownMenu />
      </div>
    </nav>
  );
}
