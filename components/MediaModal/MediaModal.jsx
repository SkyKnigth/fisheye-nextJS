'use client';

import { useEffect } from 'react';
import { getAssetPath } from '../../utils/getAssetPath';

export default function MediaModal({ medias, currentIndex, setCurrentIndex, onClose }) {
  const media = medias[currentIndex];

  const showPreviousMedia = () => {
    setCurrentIndex((index) => (index === 0 ? medias.length - 1 : index - 1));
  };

  const showNextMedia = () => {
    setCurrentIndex((index) => (index === medias.length - 1 ? 0 : index + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'ArrowLeft') {
        showPreviousMedia();
      }

      if (event.key === 'ArrowRight') {
        showNextMedia();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="media-modal" role="dialog" aria-modal="true" aria-label={`Média ${media.title}`}>
      <button
        type="button"
        className="media-modal-close"
        onClick={onClose}
        aria-label="Fermer la fenêtre du média"
      >
        ×
      </button>

      <button
        type="button"
        className="media-modal-nav media-modal-prev"
        onClick={showPreviousMedia}
        aria-label="Média précédent"
      >
        ‹
      </button>

      <figure className="media-modal-content">
        {media.image ? (
          <img
            className="media-modal-media"
            src={getAssetPath(media.image)}
            alt={media.title}
          />
        ) : (
          <video className="media-modal-media" controls>
            <source src={getAssetPath(media.video)} />
          </video>
        )}
        <figcaption className="media-modal-title">{media.title}</figcaption>
      </figure>

      <button
        type="button"
        className="media-modal-nav media-modal-next"
        onClick={showNextMedia}
        aria-label="Média suivant"
      >
        ›
      </button>
    </div>
  );
}
