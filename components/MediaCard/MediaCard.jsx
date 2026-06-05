import { getAssetPath } from '../../utils/getAssetPath';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function MediaCard({ media, onLike, onOpen }) {
  return (
    <article className="media-card">
      <button
        type="button"
        className="media-card-button"
        onClick={() => onOpen(media.id)}
        aria-label={`Ouvrir le média ${media.title}`}
      >
        {media.image ? (
          <img
            className="media-card-image"
            src={getAssetPath(media.image)}
            alt={media.title}
          />
        ) : (
          <video className="media-card-image" aria-label={media.title}>
            <source src={getAssetPath(media.video)} />
          </video>
        )}
      </button>
      <div className="media-card-info">
        <h2 className="media-card-title">{media.title}</h2>
        <button
          type="button"
          className="media-card-like"
          onClick={() => onLike(media.id)}
          aria-label={`Ajouter un like au média ${media.title}`}
        >
          {media.likes} <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </article>
  );
}
