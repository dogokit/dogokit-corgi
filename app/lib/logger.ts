/** biome-ignore-all lint/suspicious/noConsole: "This is fine" */
import { isProd } from "@/env";

export const devlog = {
  info: (...args: unknown[]) => {
    if (!isProd) console.log(...args);
  },
  infoAlways: (...args: unknown[]) => {
    console.log(...args);
  },
  warn: (...args: unknown[]) => {
    if (!isProd) console.warn(...args);
  },
  error: (...args: unknown[]) => {
    if (!isProd) console.error(...args);
  },
};
