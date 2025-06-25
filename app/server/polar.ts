import { Polar } from "@polar-sh/sdk";
import { isDev } from "@/env";
import { envServer } from "@/env.server";

export const polarClient = new Polar({
  accessToken: envServer.POLAR_ACCESS_TOKEN,
  server: isDev ? "sandbox" : "production",
});
