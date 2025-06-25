import { Form, href, useNavigate } from "react-router";
import { AvatarAuto } from "@/components/shared/avatar-auto";
import { ButtonLoading } from "@/components/shared/button-loading";
import { IconBooleanValue } from "@/components/shared/icon-boolean-value";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { User } from "@/generated/prisma/client";
import { authClient } from "@/lib/better-auth-client";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";

type UserField = {
  label: string;
  value: string | number | boolean | null;
  isCode?: boolean;
};

export function createUserFields(user: User): UserField[] {
  return [
    { label: "ID", value: user.id, isCode: true },
    { label: "Name", value: user.name },
    { label: "First Name", value: user.firstName },
    { label: "Last Name", value: user.lastName },
    { label: "Username", value: `@${user.username}` },
    { label: "Display Username", value: `@${user.displayUsername}` },
    { label: "Email", value: user.email },
    { label: "Email Verified", value: user.emailVerified },
    { label: "Phone Number", value: user.phoneNumber },
    { label: "Phone Verified", value: user.phoneNumberVerified },
    { label: "Role", value: user.role },
    { label: "2FA", value: user.twoFactorEnabled },
    { label: "Banned", value: user.banned },
    { label: "Ban Reason", value: user.banReason },
    { label: "Ban Expires", value: formatDate(user.banExpires) },
    { label: "Language", value: user.lang },
    { label: "Theme", value: user.theme },
    // { label: "Passkey Enabled", value: true },
    { label: "Created At", value: formatDate(user.createdAt) },
    { label: "Updated At", value: formatDate(user.updatedAt) },
  ];
}

export function UserProfileCard({ user }: { user: User }) {
  const navigate = useNavigate();

  const userFields = createUserFields(user);

  const addPasskey = async () => {
    await authClient.passkey.addPasskey({
      fetchOptions: {
        onSuccess: () => navigate(href("/dashboard")),
      },
    });
  };

  const revokeOtherSessions = async () => {
    await authClient.revokeOtherSessions();
  };

  return (
    <Card className="w-full max-w-md rounded-xl border border-border">
      <CardHeader className="flex flex-col items-center space-y-2">
        <AvatarAuto size="xl" user={user} />
        <CardTitle className="text-center">
          <h3 className="font-bold text-2xl text-gray-900 dark:text-gray-100">
            {user.name || "No Name"}
          </h3>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.email}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Button onClick={addPasskey} size="xs" variant="outline">
            <span>Add Passkey</span>
          </Button>
          <Button onClick={revokeOtherSessions} size="xs" variant="outline">
            <span>Revoke All Sessions</span>
          </Button>
          <Form action={href("/signout")} method="post">
            <ButtonLoading
              size="xs"
              submittingText="Signing Out..."
              type="submit"
              variant="outline"
            >
              Sign Out
            </ButtonLoading>
          </Form>
        </div>

        <dl className="divide-y divide-gray-200 dark:divide-gray-700">
          {userFields.map((item) => {
            return (
              <div
                className="flex items-center justify-between py-2"
                key={item.label}
              >
                <dt className="font-medium text-gray-700 dark:text-gray-300">
                  {item.label}
                </dt>
                <dd
                  className={cn(
                    "text-gray-900 text-sm dark:text-gray-100",
                    item.isCode && "font-mono"
                  )}
                >
                  <IconBooleanValue>{item.value}</IconBooleanValue>
                </dd>
              </div>
            );
          })}
        </dl>
      </CardContent>
    </Card>
  );
}
