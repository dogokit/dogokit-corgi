import {
  type FormMetadata,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useEffect } from "react";
import { Form, href, Link } from "react-router";
import { toast } from "sonner";
import { ButtonCancel } from "@/components/buttons/button-cancel";
import { ButtonLoading } from "@/components/buttons/button-loading";
import { FieldErrors } from "@/components/forms/field-errors";
import { Flex } from "@/components/shared/flex";
import { InputPassword } from "@/components/shared/input-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LastResult } from "@/lib/form/parse";
import { useIsSubmitting } from "@/lib/hooks/use-is-submitting";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { ButtonAuthPasskey } from "@/modules/auth/components/button-auth-passkey";
import { ButtonAuthProviders } from "@/modules/auth/components/button-auth-providers";
import { AuthSignInSchema, AuthSignUpSchema } from "@/modules/auth/schema";
import { Logo } from "@/modules/brand/components/logo";
import type { AppRouterOutputs } from "@/modules/trpc/trpc-router";

export function AuthPanel({
  authMode = "signin",
  lastResult,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  authMode: "signup" | "signin";
  lastResult: LastResult;
}) {
  const isMobile = useIsMobile();
  const isSubmitting = useIsSubmitting();

  const [formSignUp, fieldsSignUp] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AuthSignUpSchema });
    },
  });

  const [formSignIn, fieldsSignIn] = useForm({
    lastResult,
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AuthSignInSchema });
    },
  });

  const mode = {
    isSignUp: authMode === "signup",
    isSignIn: authMode === "signin",
  };

  const text = {
    action: mode.isSignUp ? "Sign Up" : "Sign In",
    idle: mode.isSignUp ? "Create New Account" : "Continue with Email",
    submitting: mode.isSignUp
      ? "Creating New Account..."
      : "Continuing with Email...",
    formActionPath: mode.isSignUp ? href("/signup") : href("/signin"),
  };

  const form = mode.isSignUp ? formSignUp : formSignIn;
  const fields = mode.isSignUp ? fieldsSignUp : fieldsSignIn;

  useEffect(() => {
    if (form.errors) {
      toast.error("Auth error", { description: form.errors });
    }
  }, [form.errors]);

  return (
    <section
      className={cn(
        "flex w-full max-w-xs flex-col items-center gap-6",
        className
      )}
      id="auth-panel"
      {...props}
    >
      <div className="text-center">
        <Logo classNameText="hidden" size="xl" />
        {mode.isSignUp && <p>Let's create your new account.</p>}
        {mode.isSignIn && <p>Continue with your account.</p>}
      </div>

      <fieldset className="flex w-full flex-col gap-2" disabled={isSubmitting}>
        <ButtonAuthProviders textAction={text.action} />

        {!isMobile && mode.isSignIn && (
          <ButtonAuthPasskey textAction={text.action} />
        )}

        <div className="relative my-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>

        <Form
          action={text.formActionPath}
          method="post"
          {...getFormProps(form as FormMetadata)}
        >
          <div className="grid gap-4">
            {mode.isSignUp && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor={fieldsSignUp.name.id}>Full Name</Label>
                  <Input
                    autoComplete="name"
                    autoFocus={Boolean(fieldsSignUp.name.errors)}
                    placeholder="First Last"
                    required
                    {...getInputProps(fieldsSignUp.name, { type: "text" })}
                  />
                  <FieldErrors>{fieldsSignUp.name}</FieldErrors>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor={fieldsSignUp.username.id}>Username</Label>
                  <Input
                    autoComplete="username"
                    autoFocus={Boolean(fieldsSignUp.username.errors)}
                    placeholder="yourhandle"
                    required
                    {...getInputProps(fieldsSignUp.username, { type: "text" })}
                  />
                  <FieldErrors>{fieldsSignUp.username}</FieldErrors>
                </div>
              </>
            )}

            <div className="grid gap-2">
              <Label htmlFor={fields.email.id}>Email</Label>
              <Input
                autoComplete="email webauthn"
                autoFocus={Boolean(fieldsSignUp.email.errors)}
                placeholder="email@example.com"
                required
                {...getInputProps(fields.email, { type: "email" })}
              />
              <FieldErrors>{fieldsSignIn.email}</FieldErrors>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor={fields.password.id}>Password</Label>
                {mode.isSignIn && (
                  <Link
                    className="text-secondary text-xs leading-none"
                    prefetch="intent"
                    to={href("/forgot-password")}
                  >
                    Forgot password?
                  </Link>
                )}
              </div>
              <InputPassword
                autoComplete="current-password webauthn"
                autoFocus={Boolean(fieldsSignUp.password.errors)}
                required
                {...getInputProps(fields.password, { type: "password" })}
              />
              <FieldErrors>{fieldsSignIn.password}</FieldErrors>
            </div>

            <ButtonLoading
              className="w-full"
              submittingText={text.submitting}
              type="submit"
            >
              {text.idle}
            </ButtonLoading>
          </div>
        </Form>

        <div className="text-center text-sm">
          {mode.isSignUp && (
            <p>
              Already have an account?{" "}
              <Link
                className="underline underline-offset-4"
                prefetch="intent"
                to={href("/signin")}
              >
                Sign in
              </Link>
            </p>
          )}
          {mode.isSignIn && (
            <p>
              Don't have an account?{" "}
              <Link
                className="underline underline-offset-4"
                prefetch="intent"
                to={href("/signup")}
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </fieldset>

      {mode.isSignUp && (
        <p className="max-w-xs text-pretty text-center text-muted-foreground text-xs *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
          By creating an account, you agree to our{" "}
          <Link prefetch="intent" to={href("/about")}>
            Terms of Service
          </Link>
          ,{" "}
          <Link prefetch="intent" to={href("/about")}>
            Privacy Policy
          </Link>
          , and{" "}
          <Link prefetch="intent" to={href("/about")}>
            Cookies Policy
          </Link>
          .
        </p>
      )}
    </section>
  );
}

export function AuthPanelSignOut({
  user,
}: {
  user: AppRouterOutputs["auth"]["getUserMinimal"];
}) {
  const username = user.username ? `@${user.username}` : "@anonymous";
  const email = user.email || "Anonymous";

  return (
    <section className="max-w-md space-y-4 p-8">
      <h1 className="text-2xl">Sign out {username}?</h1>
      <p>
        We'll sign out account {email}. You can always log back in at any time.
      </p>
      {/* <p>
          (Soon) If you just want to switch accounts without signing out the
          currently active account, you can do that by adding another account.
        </p> */}
      <Form action={href("/signout")} method="post">
        <Flex>
          <ButtonLoading submittingText="Signing Out..." type="submit">
            Sign Out {username}
          </ButtonLoading>
          <ButtonCancel />
        </Flex>
      </Form>
    </section>
  );
}

export function AuthPanelForgotPassword() {
  return (
    <div>
      <h1>Forgot Password</h1>
    </div>
  );
}
