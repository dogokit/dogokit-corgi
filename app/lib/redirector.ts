import { redirect } from "react-router";
import { configSite } from "@/config/site";

export type ConfigRedirect = {
  path: string;
  url?: string;
  to?: string;
};

export function redirectRouteToUrl(
  request: Request,
  configRedirects: ConfigRedirect[]
) {
  const url = new URL(request.url);

  const foundItem = configRedirects.find(
    (item) => item.path.trim() === url.pathname
  );

  if (!foundItem) {
    if (configSite.urlShortener) {
      return redirect(`${configSite.urlShortener}${url.pathname}`, 307);
    }
    return null;
  }

  if (foundItem.url && !foundItem.to) return redirect(foundItem.url);
  if (!foundItem.url && foundItem.to) return redirect(foundItem.to);
  return null;
}
