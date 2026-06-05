import './globals.css';
import './home.css';
import './photographe/[id]/photographe.css';
import '../components/Header/Header.css';
import '../components/PhotographeCard/PhotographeCard.css';
import '../components/PhotographeClient/PhotographeClient.css';
import '../components/MediaCard/MediaCard.css';
import '../components/MediaModal/MediaModal.css';
import '../components/ContactModal/ContactModal.css';
import '../components/SortSelect/SortSelect.css';

export const metadata = {
  title: 'FishEye',
  description: 'Plateforme de photographes indépendants',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
