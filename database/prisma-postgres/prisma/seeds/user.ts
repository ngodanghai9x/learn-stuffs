import { PrismaClient, Role } from '@prisma/client';

export async function createUser(prisma: PrismaClient) {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      role: Role.ADMIN,
      posts: {
        createMany: {
          data: [{ title: 'Hello World' }, { title: 'Hello World2' }],
          skipDuplicates: false,
        },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  });

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null });
}
