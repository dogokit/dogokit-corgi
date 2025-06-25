import { type SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { useEffect } from "react";
import { Form, href, Link } from "react-router";
import { toast } from "sonner";

import { ButtonAuthPasskey } from "@/components/shared/button-auth-passkey";
import { ButtonAuthProviders } from "@/components/shared/button-auth-providers";
import { ButtonLoading } from "@/components/shared/button-loading";
import { FieldErrors } from "@/components/shared/field-errors";
import { InputPassword } from "@/components/shared/input-password";
import { Logo } from "@/components/shared/logo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsSubmitting } from "@/hooks/use-is-submitting";
import { cn } from "@/lib/utils";
import { AuthSignInSchema, AuthSignUpSchema } from "@/schemas/auth";

export function AuthCard({
  authMode = "signin",
  lastResult,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  authMode: "signup" | "signin" | "signout" | "forgot-password";
  lastResult: SubmissionResult | null | undefined;
}) {
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
    form: mode.isSignUp ? formSignUp : formSignIn,
    fields: mode.isSignUp ? fieldsSignUp : fieldsSignIn,
  };

  useEffect(() => {
    if (text.form.errors) {
      toast.error("Auth error", { description: text.form.errors });
    }
  }, [text.form.errors]);

  return (
    <section
      className={cn(
        "flex w-full max-w-xs flex-col items-center gap-6",
        className
      )}
      {...props}
    >
      <div className="text-center">
        <Logo classNameText="hidden" size="xl" />
        {mode.isSignUp && <p>Let's create your new account.</p>}
        {mode.isSignIn && <p>Continue with your account.</p>}
      </div>

      <fieldset className="flex w-full flex-col gap-2" disabled={isSubmitting}>
        <ButtonAuthProviders textAction={text.action} />
        {mode.isSignIn && <ButtonAuthPasskey textAction={text.action} />}

        <div className="relative my-2 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-border after:border-t">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            or
          </span>
        </div>

        <Form
          action={text.formActionPath}
          className="grid gap-4"
          id={text.form.id}
          method="post"
          onSubmit={text.form.onSubmit}
        >
          {mode.isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                autoComplete="name"
                autoFocus={Boolean(fieldsSignUp.name.errors)}
                id="name"
                name={fieldsSignUp.name.name}
                placeholder="First Last"
                required
                type="text"
              />
              <FieldErrors>{fieldsSignUp.name}</FieldErrors>
            </div>
          )}

          {mode.isSignUp && (
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                autoComplete="username"
                autoFocus={Boolean(fieldsSignUp.username.errors)}
                id="username"
                name={fieldsSignUp.username.name}
                placeholder="yourhandle"
                required
                type="text"
              />
              <FieldErrors>{fieldsSignUp.username}</FieldErrors>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email webauthn"
              autoFocus={Boolean(fieldsSignUp.email.errors)}
              id="email"
              name={text.fields.email.name}
              placeholder="email@example.com"
              required
              type="email"
            />
            <FieldErrors>{fieldsSignIn.email}</FieldErrors>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {mode.isSignIn && (
                <Link
                  className="text-secondary text-xs leading-none"
                  to={href("/forgot-password")}
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <InputPassword
              autoComplete="current-password webauthn"
              autoFocus={Boolean(fieldsSignUp.password.errors)}
              id="password"
              name={text.fields.password.name}
              required
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
        </Form>

        <div className="text-center text-sm">
          {mode.isSignUp && (
            <p>
              Already have an account?{" "}
              <Link
                className="underline underline-offset-4"
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
          <Link to={href("/about")}>Terms of Service</Link>,{" "}
          <Link to={href("/about")}>Privacy Policy</Link>, and{" "}
          <Link to={href("/about")}>Cookies Policy</Link>.
        </p>
      )}
    </section>
  );
}
