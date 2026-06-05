import Link from 'next/link';
import { getAssetPath } from '../../utils/getAssetPath';

export default function PhotographeCard({ photographe }) {
  return (
    <article className="photographe-card">
      <Link href={`/photographe/${photographe.id}`} className="photographe-card-link">
        <img
          className="photographe-card-image"
          src={getAssetPath(photographe.portrait)}
          alt={`Portrait de ${photographe.name}`}
        />
        <h2 className="photographe-card-name">{photographe.name}</h2>
      </Link>
      <p className="photographe-card-location">
        {photographe.city}, {photographe.country}
      </p>
      <p className="photographe-card-tagline">{photographe.tagline}</p>
      <p className="photographe-card-price">{photographe.price}€/jour</p>
    </article>
  );
}
