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
  phoneNumber,
  twoFactor,
  username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { configSchema } from "@/config/schema";
import { configSite } from "@/config/site";
import { isProd } from "@/env";
import { envServer } from "@/env.server";
import { devlog } from "@/lib/logger";
import {
  createUsername,
  createUsernameGitHub,
  getNameParts,
} from "@/lib/string";
import { prisma } from "@/server/prisma";

export type AuthSession = typeof auth.$Infer.Session;

export const auth = betterAuth({
  appName: configSite.name,
  baseURL: envServer.APP_URL,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  // https://better-auth.com/docs/concepts/database#secondary-storage
  // secondaryStorage

  advanced: { database: { generateId: false } },

  user: {
    modelName: "User",
    additionalFields: {
      firstName: { type: "string", required: false },
      lastName: { type: "string", required: false },
      lang: { type: "string", required: false, defaultValue: "en" },
      theme: { type: "string", required: false, defaultValue: "" },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        // Send change email verification
        await devlog.info("SEND_CHANGE_EMAIL_VERIFICATION", {
          user,
          newEmail,
          url,
          token,
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
          // Send delete account verification
          await devlog.info("SEND_DELETE_ACCOUNT_VERIFICATION", {
            user,
            url,
            token,
          });
        },
        beforeDelete: async (user: User) => {
          // Perform actions before user deletion
          await devlog.info("BEFORE_DELETE", { user });
        },
        afterDelete: async (user: User) => {
          // Perform cleanup after user deletion
          await devlog.info("AFTER_DELETE", { user });
        },
      },
    },
  },

  session: {
    modelName: "Session",
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

  // https://better-auth.com/docs/reference/options#verification
  verification: {
    modelName: "Verification",
    disableCleanup: false,
  },

  // https://better-auth.com/docs/concepts/rate-limit
  rateLimit: {
    enabled: isProd,
    window: 60,
    max: 100,
    storage: "database",
    modelName: "RateLimit",
  },

  // https://better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,

    // https://better-auth.com/docs/reference/options#emailandpassword
    sendResetPassword: async ({ user, url, token }) => {
      // Send reset password email
      await devlog.info("SEND_RESET_PASSWORD", { user, url, token });
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      // Send verification email to user
      await devlog.info("SEND_VERIFICATION_EMAIL", {
        email: user.email,
        url,
        token,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },

  socialProviders: {
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
  },

  plugins: [
    admin(),
    haveIBeenPwned(),
    multiSession(),

    // https://better-auth.com/docs/plugins/open-api
    // Available to access on /api/auth/reference
    openAPI(),

    inferAdditionalFields({
      user: {
        phoneNumber: {
          type: "string",
          required: false,
        },
      },
    }),

    // https://better-auth.com/docs/plugins/anonymous
    anonymous({
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        await devlog.info("ANONYMOUS_USER_LINKED", { anonymousUser, newUser });
        // Move data from anonymous user to the new user
      },
    }),

    // https://better-auth.com/docs/plugins/username
    username({
      minUsernameLength: configSchema.username.min,
      maxUsernameLength: configSchema.username.max,
      usernameValidator: (usernameToValidate) => {
        if (usernameToValidate === "admin") return false;
        return true;
      },
    }),

    // https://better-auth.com/docs/plugins/email-otp
    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        await devlog.info("SEND_OTP_EMAIL", { email, otp, type });
      },
    }),

    // https://better-auth.com/docs/plugins/magic-link
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        await devlog.info("SEND_MAGIC_LINK", { email, token, url, request });
      },
    }),

    // https://better-auth.com/docs/plugins/phone-number
    phoneNumber({
      sendOTP: ({ phoneNumber: phone, code }) => {
        devlog.info("SEND_OTP_SMS", { phone, code });
      },
    }),

    // https://better-auth.com/docs/plugins/passkey
    passkey({
      schema: { passkey: { modelName: "Passkey" } },
      rpID: configSite.id,
      rpName: configSite.name,
      authenticatorSelection: {
        // authenticatorAttachment not set, both platform and cross-platform allowed, with platform preferred
        residentKey: "preferred",
        userVerification: "preferred",
      },
    }),

    // https://better-auth.com/docs/plugins/2fa
    twoFactor({
      schema: { twoFactor: { modelName: "TwoFactor" } },
    }),

    // https://better-auth.com/docs/plugins/one-tap
    oneTap({
      clientId: envServer.GOOGLE_CLIENT_ID,
    }), // TODO: How One Tap can mapProfileToUser for username

    // https://better-auth.com/docs/plugins/polar
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

  // databaseHooks: {
  //   user: {
  //     create: {
  //       before: async (userData) => {
  //         return { data: { ...userData } };
  //       },
  //       after: async (userData) => {
  //         devlog.info("USER_CREATE_AFTER", userData);
  //       },
  //     },
  //     update: {
  //       before: async (userData) => {
  //         return { data: { ...userData } };
  //       },
  //       after: async (userData) => {
  //         devlog.info("USER_UPDATE_AFTER", userData);
  //       },
  //     },
  //   },
  // },
});
