# Frontend Submission Test

Production-ready **React (Vite + TypeScript)** SPA with:

- TailwindCSS
- React Router DOM
- Axios
- React Hook Form + Zod
- React Hot Toast
- JWT auth via LocalStorage
- Docker (Nginx) + Docker Compose

## Cara install

```bash
npm install
```

## Cara run local

1) Copy env:

```bash
copy .env.example .env
```

2) Jalankan:

```bash
npm run dev
```

App akan jalan di `http://localhost:5173`.

## Cara run docker

```bash
docker compose up --build
```

Open `http://localhost:8080`.

## Demo credential login

Gunakan credential dari API:

- **username**: `john@mail.com` (mapped ke `email`)
- **password**: `changeme`

## Coding Rules

- **TypeScript strict typing**: `tsconfig.json` memakai `"strict": true`
- **Hindari `any`**: tidak menggunakan `any` di codebase (kecuali terpaksa dari library, dihindari)
- **Reusable components** (wajib ada):
  - `src/components/ProductCard.tsx`
  - `src/components/SearchBar.tsx`
  - `src/components/Pagination.tsx`
  - `src/routes/ProtectedRoute.tsx`
- **Custom hook**:
  - `src/hooks/useProducts.ts` (state management produk via React Context)
- **ENV**:
  - `VITE_API_URL=https://api.escuelajs.co/api/v1` (lihat `.env.example`)

## Final Output (langsung bisa dijalankan)

Local:

```bash
npm install
npm run dev
```

Docker:

```bash
docker compose up --build
```


