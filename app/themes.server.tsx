import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";
import { isProd } from "@/env";
import { envServer } from "@/env.server";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "dogokit_corgi_theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: [envServer.BETTER_AUTH_SECRET],
    ...(isProd ? { domain: envServer.APP_URL, secure: true } : {}),
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
