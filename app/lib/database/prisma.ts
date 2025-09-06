/**
 * Prisma Client
 *
 * https://prisma.io/docs/orm/prisma-client/setup-and-configuration/no-rust-engine
 */

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    // log: ["query", "info", "warn", "error"],
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Access NODE_ENV directly without Zod
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
