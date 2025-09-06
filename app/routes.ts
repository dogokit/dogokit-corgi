import {
  index,
  layout,
  prefix,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  /**
   * JSX Routes
   */

  layout("web/layouts/layout-app.tsx", [
    layout("web/layouts/layout-padded.tsx", [
      index("web/home.tsx"),
      route("about", "web/about.tsx"),
      route("examples", "web/examples.tsx"),
      route("examples/:slug", "web/examples-slug.tsx"),

      ...prefix("demos", [
        route("timezone", "web/demos/timezone.tsx"),
        route("scroll-area", "web/demos/scroll-area.tsx"),
      ]),
    ]),

    layout("web/layouts/layout-auth.tsx", [
      route("signup", "web/signup.tsx"),
      route("signin", "web/signin.tsx"),
      route("signout", "web/signout.tsx"),
      route("forgot-password", "web/forgot-password.tsx"),
      route("dashboard", "web/dashboard.tsx"),
    ]),

    route("*", "web/not-found.tsx"), // Custom 404
  ]),

  /**
   * Non-JSX Routes
   */

  ...prefix("api", [
    route("auth/*", "web/api/auth.ts"),
    route("trpc/*", "web/api/trpc.ts"),
  ]),

  ...prefix("action", [
    route("set-theme", "web/action/set-theme.ts"),
    route("social", "web/action/social.ts"),
    route("example", "web/action/example.ts"),
  ]),
] satisfies RouteConfig;
