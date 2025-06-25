import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().default(8000),

    APP_URL: z.url(),

    DATABASE_URL: z.url(),

    BETTER_AUTH_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    POLAR_ACCESS_TOKEN: z.string().optional(),
    POLAR_WEBHOOK_SECRET: z.string().optional(),

    VERCEL_URL: z.string().optional(), // Can be removed
  },
  runtimeEnv: process.env,
});
