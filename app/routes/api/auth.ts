import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

import { auth } from "@/server/better-auth";

export function loader({ request }: LoaderFunctionArgs) {
  return auth.handler(request);
}

export function action({ request }: ActionFunctionArgs) {
  return auth.handler(request);
}
