import { parseWithZod } from "@conform-to/zod/v4";
import { href, redirect } from "react-router";
import { AuthCard } from "@/components/shared/auth-card";
import { getNameParts } from "@/lib/string";
import { createTimer } from "@/lib/timer";
import { AuthSignUpSchema } from "@/schemas/auth";
import {
  type BetterAuthResponse,
  type BetterAuthResponseError,
  requireAuthFalse,
} from "@/server/auth-helper";
import { auth } from "@/server/better-auth";
import type { Route } from "./+types/signin";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthFalse(request);
}

export default function SignUpRoute({ actionData }: Route.ComponentProps) {
  return (
    <>
      <AuthCard authMode="signup" lastResult={actionData} />
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const timer = createTimer();

  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: AuthSignUpSchema });
  if (submission.status !== "success") return submission.reply();

  const { firstName, lastName } = getNameParts(submission.value.name);

  try {
    const response = await auth.api.signUpEmail({
      asResponse: true,
      headers: request.headers,
      body: {
        ...submission.value,
        firstName,
        lastName,
      },
    });
    const json: BetterAuthResponse = await response.json();

    if (!response.ok) {
      return submission.reply({
        formErrors: [json.message || "Failed to sign up or create new account"],
      });
    }

    await timer.delay();
    return redirect(href("/dashboard"), { headers: response.headers });
  } catch (error) {
    const authError = error as BetterAuthResponseError;
    if (
      authError.body.code === "USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER"
    ) {
      return submission.reply({
        fieldErrors: {
          username: [authError.body.message || "Username not allowed"],
        },
      });
    }
    return submission.reply({
      formErrors: [
        authError.body.message || "Failed to sign up or create new account",
      ],
    });
  }
}
