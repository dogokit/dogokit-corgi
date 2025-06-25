import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod/v4";
import { configPrismaCache } from "@/config/prisma-cache";
import { publicProcedure } from "@/server/trpc";

export const exampleRouter = {
  getExamples: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.example.findMany({
      include: { items: true },
      ...configPrismaCache,
    });
  }),

  getExampleSlug: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.example.findUnique({
        where: { slug: input },
        include: { items: true },
        ...configPrismaCache,
      });
    }),
} satisfies TRPCRouterRecord;
