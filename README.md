# Movie Explorer

A starter React + TypeScript + Vite app with Tailwind CSS, React Router, Axios, and TanStack Query.

## Features

- React 18 + TypeScript
- Vite build tooling
- Tailwind CSS for styling
- React Router for client-side routing
- Axios for HTTP requests
- TanStack Query for data fetching and caching

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview the production build:

```bash
npm run preview
```

## Project structure

- `src/main.tsx` – application entrypoint
- `src/App.tsx` – route definitions and layout wrapper
- `src/api/movieApi.ts` – Axios API client and movie fetch helpers
- `src/pages` – page-level components
- `src/components` – layout and reusable UI components
- `tailwind.config.js` – Tailwind CSS configuration

## Notes

This starter app includes a sample movie browsing flow with React Router and React Query. Update the API endpoints in `src/api/movieApi.ts` to connect to your preferred movie data source.
