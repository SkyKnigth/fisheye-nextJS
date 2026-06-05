import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export const getAllPhotographers = () =>
  prisma.photographer.findMany({
    orderBy: { name: 'asc' },
  });

export const getPhotographer = (id) =>
  prisma.photographer.findUnique({
    where: { id: Number(id) },
  });

export const getAllMediasForPhotographer = (photographerId) =>
  prisma.media.findMany({
    where: { photographerId: Number(photographerId) },
  });

export const updateNumberOfLikes = (mediaId, newNumberOfLikes) =>
  prisma.media.update({
    where: { id: Number(mediaId) },
    data: { likes: Number(newNumberOfLikes) },
  });

export const getMedia = (mediaId) =>
  prisma.media.findUnique({
    where: { id: Number(mediaId) },
  });
