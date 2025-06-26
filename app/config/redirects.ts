import { configSite } from "@/config/site";

export type ConfigRedirect = {
  path: string;
  url?: string;
  to?: string;
};

export const configRedirects: ConfigRedirect[] = [
  { path: "/account", to: "/user/account" },
  { path: "/github", url: configSite.links.github },
  { path: "/links", to: "/redirects" },
  { path: "/login", to: "/signin" },
  { path: "/logout", to: "/signout" },
  { path: "/register", to: "/signup" },
  { path: "/settings", to: "/settings" },
  { path: "/twitter", url: configSite.links.twitter },
  { path: "/youtube", url: configSite.links.youtube },
];
