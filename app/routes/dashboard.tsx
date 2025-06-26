import { Debug } from "@/components/shared/debug";
import { UserProfileCard } from "@/components/shared/user-profile-card";
import { requireAuthUserData } from "@/server/auth-helper";
import type { Route } from "./+types/dashboard";

export function loader({ request }: Route.LoaderArgs) {
  return requireAuthUserData(request);
}

export default function UserDashboardRoute({
  loaderData,
}: Route.ComponentProps) {
  const { user } = loaderData;

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-gray-500">No user data found.</div>
      </div>
    );
  }

  return (
    <>
      <UserProfileCard user={user} />
      <Debug>{user}</Debug>
    </>
  );
}
