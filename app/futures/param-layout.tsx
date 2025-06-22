import { Outlet } from "react-router";
import { configRedirects } from "@/config/redirects";
import { redirectRouteToUrl } from "@/lib/redirector";

export const loader = ({ request }: Route) => {
  return redirectRouteToUrl(request, configRedirects);
};

export default function ParamLayoutRoute() {
  return <Outlet />;
}
