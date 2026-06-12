# Movie Explorer

A movie browsing app built with React, TypeScript, and Vite. Browse popular, top rated, and upcoming movies, search with filters, and save favorites — powered by the [TMDB API](https://www.themoviedb.org/).

## Prerequisites

- Node.js 18+
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

## Getting started

**1. Install dependencies**

```bash
npm install
```

**2. Set up environment variables**

```bash
cp .env.example .env
```

Get your API key at https://www.themoviedb.org/settings/api and add it to `.env`:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

**3. Start the dev server**

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Other commands

| Command | Description |
|---|---|
| `npm run build` | Type-check and build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript type checking without building |

## Project structure

```
src/
├── api/          # TMDB Axios client and fetch helpers
├── components/
│   ├── icons.tsx         # Icon wrappers
│   ├── layout/           # Layout, header, SearchBar, Sidebar
│   ├── movie/            # MovieCard variants, RatingBadge, MovieSection
│   ├── search/           # FilterBar, FilterSelect
│   └── ui/               # ErrorState, EmptyState, LoadingGrid, Pagination
├── hooks/        # Data-fetching hooks (useMovies, useMovieDetails, useFavorites)
├── pages/        # Route-level page components
└── types/        # TypeScript types for TMDB API responses
```

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — dev server and build tooling
- **Tailwind CSS** — utility-first styling
- **React Router v6** — client-side routing
- **TanStack Query v5** — data fetching and caching
- **Axios** — HTTP client
