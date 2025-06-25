import { parseWithZod } from "@conform-to/zod/v4";
import { href, redirect } from "react-router";
import { AuthCard } from "@/components/shared/auth-card";
import { createTimer } from "@/lib/timer";
import { AuthSignInSchema } from "@/schemas/auth";
import {
  type BetterAuthResponse,
  requireAuthFalse,
} from "@/server/auth-helper";
import { auth } from "@/server/better-auth";
import type { Route } from "./+types/signin";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignInRoute({ actionData }: Route.ComponentProps) {
  return (
    <>
      <AuthCard authMode="signin" lastResult={actionData} />
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSignInSchema });
  if (submission.status !== "success") return submission.reply();

  const response = await auth.api.signInEmail({
    asResponse: true,
    headers: request.headers,
    body: submission.value,
  });
  const json: BetterAuthResponse = await response.json();

  if (!response.ok) {
    return submission.reply({
      formErrors: [json.message || "Failed to sign in or authenticate"],
    });
  }

  await timer.delay();
  return redirect(href("/dashboard"), { headers: response.headers });
}
