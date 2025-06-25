import type { TRPCRouterRecord } from "@trpc/server";
import { configPrismaCache } from "@/config/prisma-cache";
import { protectedProcedure } from "@/server/trpc";

export const authRouter = {
  getUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      ...configPrismaCache,
    });
  }),

  getUserComplete: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        sessions: true,
        accounts: true,
        twofactors: true,
        passkeys: true,
      },
      ...configPrismaCache,
    });
  }),
} satisfies TRPCRouterRecord;
