'use client';

import { useMemo, useState } from 'react';
import ContactModal from '../ContactModal/ContactModal';
import MediaCard from '../MediaCard/MediaCard';
import MediaModal from '../MediaModal/MediaModal';
import SortSelect from '../SortSelect/SortSelect';
import { getAssetPath } from '../../utils/getAssetPath';
import { sortMedias } from '../../utils/sortMedias';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function PhotographeClient({ photographe, medias }) {
  const [mediaList, setMediaList] = useState(medias);
  const [sortType, setSortType] = useState('popularity');
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const sortedMedias = useMemo(
    () => sortMedias(mediaList, sortType),
    [mediaList, sortType]
  );

  const totalLikes = mediaList.reduce((total, media) => total + media.likes, 0);

  const handleLike = async (mediaId) => {
    const response = await fetch(`/api/media/${mediaId}/likes`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      return;
    }

    const updatedMedia = await response.json();

    setMediaList((currentMedias) =>
      currentMedias.map((media) =>
        media.id === updatedMedia.id ? updatedMedia : media
      )
    );
  };

  const openMediaModal = (mediaId) => {
    const index = sortedMedias.findIndex((media) => media.id === mediaId);
    setSelectedMediaIndex(index);
  };

  const closeMediaModal = () => {
    setSelectedMediaIndex(null);
  };

  return (
    <main id="main-content" className="main-container photographe-page">
      <section className="photographe-header" aria-label={`Présentation de ${photographe.name}`}>
        <div className="photographe-info">
          <h1 className="photographe-title">{photographe.name}</h1>
          <p className="photographe-location">
            {photographe.city}, {photographe.country}
          </p>
          <p className="photographe-tagline">{photographe.tagline}</p>
        </div>

        <button
          type="button"
          className="contact-button"
          onClick={() => setIsContactOpen(true)}
        >
          Contactez-moi
        </button>

        <img
          className="photographe-portrait"
          src={getAssetPath(photographe.portrait)}
          alt={`Portrait de ${photographe.name}`}
        />
      </section>

      <SortSelect sortType={sortType} onChange={setSortType} />

      <section className="media-gallery" aria-label="Galerie des médias">
        {sortedMedias.map((media) => (
          <MediaCard
            key={media.id}
            media={media}
            onLike={handleLike}
            onOpen={openMediaModal}
          />
        ))}
      </section>

      <aside className="likes-summary" aria-label="Total des likes et tarif du photographe">
        <span>{totalLikes} <FontAwesomeIcon icon={faHeart} /></span>
        <span>{photographe.price}€ / jour</span>
      </aside>

      {selectedMediaIndex !== null && (
        <MediaModal
          medias={sortedMedias}
          currentIndex={selectedMediaIndex}
          setCurrentIndex={setSelectedMediaIndex}
          onClose={closeMediaModal}
        />
      )}

      {isContactOpen && (
        <ContactModal
          photographeName={photographe.name}
          onClose={() => setIsContactOpen(false)}
        />
      )}
    </main>
  );
}
