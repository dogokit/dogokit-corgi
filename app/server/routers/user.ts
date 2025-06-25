import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod/v4";
import { configPrismaCache } from "@/config/prisma-cache";
import { protectedProcedure, publicProcedure } from "@/server/trpc";

const configPrismaUser = {
  omit: {
    email: true,
    emailVerified: true,
    phone: true,
    phoneNumber: true,
    phoneNumberVerified: true,
  },
};

export const userRouter = {
  getUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany({
      ...configPrismaUser,
      orderBy: { createdAt: "asc" },
      ...configPrismaCache,
    });
  }),

  getUserByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({
        where: { username: input },
        ...configPrismaUser,
        ...configPrismaCache,
      });
    }),

  getUserByEmail: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.user.findUnique({ where: { email: input } });
    }),
} satisfies TRPCRouterRecord;
