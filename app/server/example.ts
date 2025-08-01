import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod/v4-mini";
import { configPrismaCache } from "@/lib/config/prisma";
import { publicProcedure } from "@/modules/trpc/trpc-config";

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
