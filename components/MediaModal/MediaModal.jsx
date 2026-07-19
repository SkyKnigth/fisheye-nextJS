'use client';

import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faXmark,} from '@fortawesome/free-solid-svg-icons';
import { getAssetPath } from '../../utils/getAssetPath';

export default function MediaModal({ medias, currentIndex, setCurrentIndex, onClose }) {
  const media = medias[currentIndex];
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);

  const showPreviousMedia = () => {
    setCurrentIndex((index) => (index === 0 ? medias.length - 1 : index - 1));
  };

  const showNextMedia = () => {
    setCurrentIndex((index) => (index === medias.length - 1 ? 0 : index + 1));
  };

  useEffect(() => {
    previousActiveElementRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        showPreviousMedia();
      }

      if (event.key === 'ArrowRight') {
        showNextMedia();
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button, video[controls], [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {window.removeEventListener('keydown', handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [currentIndex, medias.length, onClose]);

  return (
    <div ref={dialogRef} className="media-modal" role="dialog" aria-modal="true" aria-label={`Média ${media.title}`}>
      <button
        ref={closeButtonRef}
        type="button"
        className="media-modal-close"
        onClick={onClose}
        aria-label="Fermer la fenêtre du média"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <button
        type="button"
        className="media-modal-nav media-modal-prev"
        onClick={showPreviousMedia}
        aria-label="Média précédent"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      <figure className="media-modal-content">
        {media.image ? (
          <img
            className="media-modal-media"
            src={getAssetPath(media.image)}
            alt={media.title}
          />
        ) : (
          <video className="media-modal-media" controls aria-label={`Vidéo : ${media.title}`}>
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
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}