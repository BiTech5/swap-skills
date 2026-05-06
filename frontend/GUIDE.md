# Frontend Guidance

This document explains how to work with the frontend (`React + Vite`).

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Start dev server:

```bash
npm run dev
```

App runs at `http://localhost:5173` by default.

## Environment Variables

- `VITE_API_BASE_URL`: Backend API base URL
- `VITE_APP_NAME`: App display name

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run preview`: Preview production build
- `npm run lint`: Run lint checks

## Contribution Notes

- Keep components small and reusable.
- Use clear naming for files and functions.
- Keep API calls centralized as the app grows.
- Update this guide if setup or structure changes.
