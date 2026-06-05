import { PrismaClient } from '@prisma/client';
import photographes from '../data/photographer.json' with { type: 'json' };
import medias from '../data/media.json' with { type: 'json' };

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.photographer.deleteMany();

  await prisma.photographer.createMany({
    data: photographes,
  });

  await prisma.media.createMany({
    data: medias,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
