import { href } from "react-router";
import { ButtonLink } from "@/components/shared/button-link";
import { getPathname } from "@/lib/url";
import type { Route } from "./+types/404";

export const meta: Route.MetaFunction = () => {
  return [{ title: "404 Not Found" }];
};

export function loader({ request }: Route.LoaderArgs) {
  return { pathname: getPathname(request) };
}

export default function NotFoundRoute({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex justify-center">
      <section className="my-10 text-center">
        <h1 className="mb-4 font-bold text-9xl">404</h1>
        <p className="mb-8">
          Page <code className="px-1">{loaderData.pathname}</code> is not found
          or does not exist.
        </p>
        <ButtonLink to={href("/")}>Go to Home</ButtonLink>
      </section>
    </div>
  );
}
