import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import type { JSX } from "react";
import { href } from "react-router";

export const configSite: ConfigSite = {
  id: "localhost",
  name: "Dogokit Corgi",
  url: "https://github.com/dogokit/dogokit-corgi",
  ogImage: "/og/dogokit.jpg",
  description:
    "Full stack app development kit with React Router v7 Framework, tRPC, Prisma, Better Auth, Tailwind CSS, shadcn/ui, and more.",
  links: {
    x: "https://x.com/mhaidarhanif",
    github: "https://github.com/dogokit/dogokit-corgi",
    youtube: "https://youtube.com/mhaidarhanif",
  },
  urlShortener: "https://example.com",

  authOptions: ["social", "passkey", "email", "magic", "anonymous"],
  socialProviders: ["google", "github"],
  socialProviderButtons: [
    { provider: "google", label: "Google", icon: <SiGoogle /> },
    { provider: "github", label: "GitHub", icon: <SiGithub /> },
  ],

  navItems: [
    { to: href("/"), label: "Home" },
    { to: href("/about"), label: "About" },
    { to: href("/examples"), label: "Examples" },
    { to: "/404", label: "404" },
  ],
  navAuthItems: [
    { to: href("/signup"), label: "Sign Up", auth: false },
    { to: href("/signin"), label: "Sign In", auth: false },
    // { to: href("/signout"), label: "Sign Out", auth: true },
    { to: href("/dashboard"), label: "Dashboard", auth: true },
  ],
};

// TODO: Zod Schema

export type ConfigSite = {
  id: string;
  name: string;
  url: string;
  ogImage?: string;
  description: string;
  links: Partial<Record<SocialProvider, string>>;
  urlShortener?: string;

  authOptions: AuthOption[];
  socialProviders: SocialProvider[];
  socialProviderButtons: SocialProviderButton[];

  navItems: NavItem[];
  navAuthItems: NavItem[];
};

export type AuthOption = "social" | "passkey" | "email" | "magic" | "anonymous";

export type SocialProvider =
  | "allnimal"
  | "apple"
  | "discord"
  | "facebook"
  | "github"
  | "gitlab"
  | "google"
  | "linkedin"
  | "microsoft"
  | "reddit"
  | "spotify"
  | "twitch"
  | "twitter"
  | "x"
  | "youtube"
  | "zoom";

export type SocialProviderButton = {
  provider: SocialProvider;
  label: string;
  icon: JSX.Element;
};

export type NavItem = {
  to: ReturnType<typeof href>;
  label: string;
  auth?: boolean;
};

export const metaThemeColor = {
  light: "#ffffff",
  dark: "#000000",
};
