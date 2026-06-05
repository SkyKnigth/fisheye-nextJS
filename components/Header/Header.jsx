import Link from "next/link";
import "./Header.css";

export default function Header({ showTitle = false }) {
  return (
    <header className="header">
      <Link href="/" aria-label="Accueil FishEye">
        <img src="/logo.png" alt="FishEye" className="header-logo" />
      </Link>

      {showTitle && <p className="header-title">Nos photographes</p>}
    </header>
  );
}