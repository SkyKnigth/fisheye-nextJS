import Header from '../components/Header/Header';
import PhotographeCard from '../components/PhotographeCard/PhotographeCard';
import { getAllPhotographers } from '../lib/prisma-db';
import "./home.css";


export default async function HomePage() {
  const photographes = await getAllPhotographers();

  return (
    <>
      <Header showTitle />
      <main id="main-content" className="main-container">
        <ul className="photographes-list" aria-label="Liste des photographes">
          {photographes.map((photographe) => (
            <li key={photographe.id}>
              <PhotographeCard photographe={photographe} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
