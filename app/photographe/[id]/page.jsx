import { notFound } from 'next/navigation';
import Header from '../../../components/Header/Header';
import PhotographeClient from '../../../components/PhotographeClient/PhotographeClient';
import {getAllMediasForPhotographer, getPhotographer,} from '../../../lib/prisma-db';

export default async function PhotographePage({ params }) {
  const photographe = await getPhotographer(params.id);

  if (!photographe) {
    notFound();
  }

  const medias = await getAllMediasForPhotographer(params.id);

  return (
    <>
      <Header />
      <PhotographeClient photographe={photographe} medias={medias} />
    </>
  );
}
