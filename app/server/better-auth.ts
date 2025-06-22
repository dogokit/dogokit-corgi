import {
  checkout,
  polar,
  portal,
  usage,
  webhooks,
} from "@polar-sh/better-auth";
import { betterAuth as betterAuthConfig, type User } from "better-auth";
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
import {
  createUsername,
  createUsernameGitHub,
  getNameParts,
} from "@/lib/string";
import { polarClient } from "@/server/polar";
import { prisma } from "@/server/prisma";

export type AuthSession = typeof auth.$Infer.Session;

export const auth = betterAuthConfig({
  appName: configSite.name,
  baseURL: process.env.BETTER_AUTH_URL,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, { provider: "postgresql" }),

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
        console.info("SEND_CHANGE_EMAIL_VERIFICATION", {
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
          console.info("SEND_DELETE_ACCOUNT_VERIFICATION", {
            user,
            url,
            token,
          });
        },
        beforeDelete: async (user: User) => {
          console.info("BEFORE_DELETE", { user });
        },
        afterDelete: async (user: User) => {
          console.info("AFTER_DELETE", { user });
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

  verification: {
    modelName: "Verification",
    disableCleanup: false,
  },

  rateLimit: {
    enabled: true,
  },

  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    sendResetPassword: async ({ user, url, token }) => {
      // Send reset password email
      console.info("SEND_RESET_PASSWORD", { user, url, token });
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      // Send verification email to user
      console.info("SEND_VERIFICATION_EMAIL", {
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
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        const { firstName, lastName } = getNameParts(profile.name);
        return {
          username: createUsernameGitHub(profile.login),
          firstName,
          lastName,
        };
      },
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          username: createUsername(profile.given_name, profile.family_name),
          firstName: profile.given_name,
          lastName: profile.family_name,
        };
      },
    },
  },

  plugins: [
    admin(),
    anonymous(),
    haveIBeenPwned(),
    multiSession(),
    oneTap(), // TODO: How to mapProfileToUser for username
    openAPI(), // Available on /api/auth/reference

    inferAdditionalFields({
      user: {
        phoneNumber: { type: "string", required: false },
      },
    }),

    emailOTP({
      sendVerificationOTP: async ({ email, otp, type }) => {
        console.info("SEND_OTP_EMAIL", { email, otp, type });
      },
    }),

    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => {
        console.info("SEND_OTP_SMS", { phoneNumber, code });
      },
    }),

    passkey({
      schema: { passkey: { modelName: "Passkey" } },
      rpID: configSite.id,
      rpName: configSite.name,
      origin: process.env.BETTER_AUTH_URL,
    }),

    twoFactor({
      schema: { twoFactor: { modelName: "TwoFactor" } },
    }),

    magicLink({
      sendMagicLink(data, request) {
        console.info("SEND_MAGIC_LINK", { data, request });
      },
    }),

    username({
      minUsernameLength: configSchema.username.min,
      maxUsernameLength: configSchema.username.max,
      usernameValidator: (username) => {
        if (username === "admin") return false;
        return true;
      },
    }),

    polar({
      client: polarClient,
      createCustomerOnSignUp: false, // TODO: Revisit this
      use: [
        checkout({
          products: [
            {
              productId: "123-456-789", // ID of Product from Polar Dashboard
              slug: "pro", // Custom slug, reference Checkout URL /checkout/pro
            },
          ],
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET as string,
          // onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes
          // onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.)
          // // ...  // Over 25 granular webhook handlers
          // onPayload: (payload) => // Catch-all for all events
        }),
      ],
    }),
  ],

  // databaseHooks: {
  //   user: {
  //     create: {
  //       before: async (userData) => {
  //         return { data: { ...userData } };
  //       },
  //       after: async (userData) => {
  //         console.info("USER_CREATE_AFTER", userData);
  //       },
  //     },
  //     update: {
  //       before: async (userData) => {
  //         return { data: { ...userData } };
  //       },
  //       after: async (userData) => {
  //         console.info("USER_UPDATE_AFTER", userData);
  //       },
  //     },
  //   },
  // },
});
