import {
  adminClient,
  inferAdditionalFields,
  magicLinkClient,
  multiSessionClient,
  oneTapClient,
  passkeyClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { envClient } from "@/env";
import type { auth } from "@/server/better-auth";

export type AuthClientSession = typeof authClient.$Infer.Session;

export const authClient = createAuthClient({
  baseURL: envClient.VITE_APP_URL,
  plugins: [
    adminClient(),

    // https://better-auth.com/docs/concepts/typescript#inferring-additional-fields-on-client
    inferAdditionalFields<typeof auth>(),

    magicLinkClient(),
    multiSessionClient(),
    passkeyClient(),
    phoneNumberClient(),
    usernameClient(),

    twoFactorClient({
      onTwoFactorRedirect() {
        window.location.href = "/2fa";
      },
    }),

    oneTapClient({
      clientId: envClient.VITE_GOOGLE_CLIENT_ID,
      autoSelect: true,
      cancelOnTapOutside: false,
      context: "signin",
      additionalOptions: {},
      promptOptions: { baseDelay: 2000, maxAttempts: 10 },
    }),

    // polarClient(),
  ],
});

export const { signIn, signOut, signUp, useSession } = authClient;
