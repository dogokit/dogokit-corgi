import { NavigationDesktop } from "@/components/shared/navigation-desktop";
import { NavigationMobile } from "@/components/shared/navigation-mobile";

export function LayoutHeader() {
  return (
    <header className="sticky top-0 z-40">
      <div className="hidden p-4 md:flex" id="navigation-desktop">
        <NavigationDesktop />
      </div>

      <div className="flex md:hidden" id="navigation-mobile">
        <NavigationMobile />
      </div>
    </header>
  );
}
