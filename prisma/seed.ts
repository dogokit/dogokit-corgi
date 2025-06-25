/** biome-ignore-all lint/nursery/noAwaitInLoop: "Prisma seed only" */
import { PrismaClient } from "@/generated/prisma/client";
import { devlog } from "@/lib/logger";
import { dataExamples } from "./data/examples";

const prisma = new PrismaClient();

async function main() {
  for (const example of dataExamples) {
    const upsertedExample = await prisma.example.upsert({
      where: { slug: example.slug },
      update: {
        name: example.name,
        items: {
          connect: Array.from({ length: 3 }, (_, i) => ({
            slug: `item-${example.slug}-${i + 1}`,
          })),
        },
      },
      create: {
        slug: example.slug,
        name: example.name,
        items: {
          create: Array.from({ length: 3 }, (_, i) => ({
            slug: `item-${example.slug}-${i + 1}`,
            name: `Item ${example.name} ${i + 1}`,
          })),
        },
      },
    });

    devlog.info(`Example: ${upsertedExample.name}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    devlog.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
