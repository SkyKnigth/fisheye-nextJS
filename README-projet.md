# FishEye - Projet OpenClassrooms

Projet réalisé avec React, Next.js, Prisma et SQLite.

## Installation

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Puis ouvrir : http://localhost:3000

## Organisation

- `app/page.jsx` : page d'accueil
- `app/home.css` : style de la page d'accueil
- `app/photographe/[id]/page.jsx` : page détail photographe
- `app/photographe/[id]/photographe.css` : style de la page photographe
- `app/api/media/[id]/likes/route.js` : route API pour incrémenter les likes
- `components/` : composants React
- `lib/prisma-db.js` : fonctions Prisma
- `utils/` : fonctions simples réutilisables
- `public/assets/` : images et vidéos
