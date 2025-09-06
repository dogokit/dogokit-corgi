import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

export const isDev = process.env.NODE_ENV === "development";
export const isTest = process.env.NODE_ENV === "test";
export const isProd = process.env.NODE_ENV === "production";

export const envServer = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]).optional(),
    PORT: z.coerce.number().default(8000),

    VITE_APP_NAME: z.string().default("Dogokit Corgi"),

    DOMAIN: z.string(),

    DATABASE_URL: z.url(),

    BETTER_AUTH_SECRET: z.string(),

    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),

    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),

    RESEND_API_KEY: z.string(),

    POLAR_ACCESS_TOKEN: z.string().optional(),
    POLAR_WEBHOOK_SECRET: z.string().optional(),

    VERCEL_URL: z.string().optional(), // Can be removed
  },
  runtimeEnv: process.env,
});
