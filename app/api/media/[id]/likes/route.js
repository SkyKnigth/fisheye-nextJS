import { NextResponse } from 'next/server';
import { getMedia, updateNumberOfLikes } from '../../../../../lib/prisma-db';

export async function PATCH(request, { params }) {
  const media = await getMedia(params.id);

  if (!media) {
    return NextResponse.json({ message: 'Média introuvable' }, { status: 404 });
  }

  const updatedMedia = await updateNumberOfLikes(media.id, media.likes + 1);

  return NextResponse.json(updatedMedia);
}
