import { PrismaClient } from '@prisma/client';
import { createUser } from './seeds';

const prisma = new PrismaClient();

async function initSeeds() {
  await createUser(prisma);
}

initSeeds()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// console.log("🚀 ~ file: seed.ts:18 ~ process", process.env)