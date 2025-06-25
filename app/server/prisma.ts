import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/generated/prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // log: ["query"],
  }).$extends(withAccelerate());
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Access NODE_ENV directly without Zod
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
