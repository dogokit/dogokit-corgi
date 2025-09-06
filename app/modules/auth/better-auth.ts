import { betterAuth, type User } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { inferAdditionalFields } from "better-auth/client/plugins";
import {
  admin,
  anonymous,
  emailOTP,
  haveIBeenPwned,
  magicLink,
  multiSession,
  oneTap,
  openAPI,
  twoFactor,
  username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { configSchema } from "@/lib/config/schema";
import { configSite } from "@/lib/config/site";
import { prisma } from "@/lib/database/prisma";
import { devlog } from "@/lib/system/logger";
import {
  createUsername,
  createUsernameGitHub,
  getNameParts,
} from "@/lib/text/convert";
import { sendEmail } from "@/modules/email/send-email";
import { envClient } from "@/modules/env/env";
import { envServer } from "@/modules/env/env.server";

export type DefaultAuthSession = typeof auth.$Infer.Session;

export const auth = betterAuth({
  appName: configSite.name,
  baseURL: envClient.VITE_APP_URL,
  basePath: "/api/auth",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  advanced: { database: { generateId: false } },

  /**
   * Models
   */
  user: {
    modelName: "User",
    additionalFields: {
      firstName: { type: "string", required: false },
      lastName: { type: "string", required: false },
      appLanguage: { type: "string", required: false, defaultValue: "en" },
      appTheme: { type: "string", required: false, defaultValue: "" },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        await sendEmail({
          action: "SEND_CHANGE_EMAIL_VERIFICATION",
          user,
          url,
          token,
          to: [user.email],
          subject: "Change your email",
          text: `Click the link to change your email from ${user.email} to ${newEmail}: ${url}`,
        });
      },
      deleteUser: {
        enabled: true,
        sendDeleteAccountVerification: async ({
          user,
          url,
          token,
        }: {
          user: User;
          url: string;
          token: string;
        }) => {
          await sendEmail({
            action: "SEND_DELETE_ACCOUNT_VERIFICATION",
            user,
            url,
            token,
            to: [user.email],
            subject: "Delete your account",
            text: `Click the link to delete your account: ${url}`,
          });
        },
        beforeDelete: async (user: User) => {
          await devlog.info("BEFORE_DELETE", { user });
        },
        afterDelete: async (user: User) => {
          await devlog.info("AFTER_DELETE", { user });
        },
      },
    },
  },
  session: {
    modelName: "Session",
    // TODO: Enable later, because confusion when signout
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 60 * 5, // 5 minutes
    // },
  },
  account: {
    modelName: "Account",
    accountLinking: {
      enabled: true,
      trustedProviders: ["email-password", "google", "github"],
      allowDifferentEmails: true,
      allowUnlinkingAll: true,
    },
    updateAccountOnSignIn: true,
  },

  // https://better-auth.com/docs/reference/options#databasehooks
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          await devlog.info("DB_HOOKS_CREATE_BEFORE");
          return { data: user };
        },
        after: async () => {
          await devlog.info("DB_HOOKS_CREATE_AFTER");
        },
      },
    },
    session: {
      // Session hooks
    },
    account: {
      // Account hooks
    },
    verification: {
      // Verification hooks
    },
  },

  /**
   * Verification
   * https://better-auth.com/docs/reference/options#verification
   */
  verification: {
    modelName: "Verification",
    disableCleanup: false,
  },

  /**
   * Rate Limit
   * https://better-auth.com/docs/concepts/rate-limit
   */
  // rateLimit: {
  //   enabled: isProd,
  //   window: 60,
  //   max: 100,
  //   storage: "database",
  //   modelName: "RateLimit",
  // },

  /**
   * Email Password
   * https://better-auth.com/docs/authentication/email-password
   */
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    requireEmailVerification: false,

    /**
     * Send Reset Password
     * https://better-auth.com/docs/authentication/email-password#request-password-reset
     */
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        action: "SEND_RESET_PASSWORD_EMAIL",
        user,
        url,
        token,
        to: [user.email],
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  /**
   * Email Verification
   * https://better-auth.com/docs/authentication/email-password#email-verification
   */
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendEmail({
        action: "SEND_VERIFICATION_EMAIL",
        user,
        url,
        token,
        to: [user.email],
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  /**
   * Social Providers
   * Configure more in @/config/site.tsx
   */
  socialProviders: {
    google: {
      clientId: envServer.GOOGLE_CLIENT_ID,
      clientSecret: envServer.GOOGLE_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        const usernameGoogle = createUsername(
          profile.given_name,
          profile.family_name
        );

        return {
          username: usernameGoogle,
          displayUsername: usernameGoogle,
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
    github: {
      clientId: envServer.GITHUB_CLIENT_ID,
      clientSecret: envServer.GITHUB_CLIENT_SECRET,
      mapProfileToUser: (profile) => {
        const { firstName, lastName } = getNameParts(profile.name);
        const usernameGitHub = createUsernameGitHub(profile.login);

        return {
          username: usernameGitHub,
          displayUsername: usernameGitHub,
          firstName,
          lastName,
        };
      },
    },
  },

  plugins: [
    /**
     * Admin
     * https://better-auth.com/docs/plugins/admin
     */
    admin(),

    /**
     * Have I Been Pwned
     * https://better-auth.com/docs/plugins/have-i-been-pwned
     */
    haveIBeenPwned(),

    /**
     * Multi Session
     * https://better-auth.com/docs/plugins/multi-session
     */
    multiSession(),

    /**
     * Open API
     * https://better-auth.com/docs/plugins/open-api
     */
    openAPI(), // Available on /api/auth/reference

    /**
     * Infer Additional Fields
     * https://better-auth.com/docs/concepts/typescript#inferring-additional-fields-on-server
     */
    inferAdditionalFields({
      user: {
        phoneNumber: {
          type: "string",
          required: false,
        },
      },
    }),

    /**
     * Anonymous
     * https://better-auth.com/docs/plugins/anonymous
     */
    anonymous({
      onLinkAccount: ({ anonymousUser, newUser }) => {
        // Move data from anonymous user to the new user
        devlog.info("ANONYMOUS_USER_LINKED", { anonymousUser, newUser });
      },
    }),

    /**
     * Username
     * https://better-auth.com/docs/plugins/username
     */
    username({
      minUsernameLength: configSchema.username.min,
      maxUsernameLength: configSchema.username.max,
      usernameValidator: (usernameToValidate) => {
        if (usernameToValidate === "admin") return false;
        return true;
      },
    }),

    /**
     * Email OTP
     * https://better-auth.com/docs/plugins/email-otp
     */
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await sendEmail({
          action: "SEND_OTP_EMAIL",
          type,
          to: [email],
          subject: "Verify your email address",
          text: `OTP Verification Code: ${otp}`,
        });
      },
    }),

    /**
     * Magic Link
     * https://better-auth.com/docs/plugins/magic-link
     */
    magicLink({
      sendMagicLink: async ({ email, url, token }) => {
        await sendEmail({
          action: "SEND_MAGIC_LINK_EMAIL",
          type: "sign-in",
          to: [email],
          subject: "Sign in to your account",
          text: `Click the link to sign in: ${url}`,
          token,
        });
      },
    }),

    /**
     * Passkey
     * https://better-auth.com/docs/plugins/passkey
     */
    passkey({
      schema: {
        passkey: { modelName: "Passkey" },
      },
      rpID: configSite.id,
      rpName: configSite.name,
    }),

    /**
     * Two Factor Authentication
     * https://better-auth.com/docs/plugins/2fa
     */
    twoFactor({
      schema: {
        twoFactor: { modelName: "TwoFactor" },
      },
    }),

    /**
     * One Tap
     * https://better-auth.com/docs/plugins/one-tap
     *
     * TODO: How One Tap can mapProfileToUser for username?
     */
    oneTap({
      clientId: envServer.GOOGLE_CLIENT_ID,
    }),

    /**
     * Phone Number
     * https://better-auth.com/docs/plugins/phone-number
     */
    // phoneNumber({
    //   sendOTP: async ({ phoneNumber: phone, code }) => {
    //     await devlog.info("SEND_OTP_SMS", { phone, code });
    //   },
    // }),

    /**
     * Polar Payment
     * https://better-auth.com/docs/plugins/polar
     *
     * TODO: Enable later
     */
    // polar({
    //   client: polarClient,
    //   createCustomerOnSignUp: false, // TODO: Revisit this
    //   use: [
    //     checkout({
    //       products: [
    //         {
    //           productId: "123-456-789", // ID of Product from Polar Dashboard
    //           slug: "pro", // Custom slug, reference Checkout URL /checkout/pro
    //         },
    //       ],
    //       successUrl: "/success?checkout_id={CHECKOUT_ID}",
    //       authenticatedUsersOnly: true,
    //     }),
    //     portal(),
    //     usage(),
    //     webhooks({
    //       secret: envServer.POLAR_WEBHOOK_SECRET,
    //       // onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes
    //       // onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.)
    //       // // ...  // Over 25 granular webhook handlers
    //       // onPayload: (payload) => // Catch-all for all events
    //     }),
    //   ],
    // }),
  ],
});
