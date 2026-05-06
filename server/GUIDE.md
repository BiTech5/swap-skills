# Server Guidance

This document explains how to work with the backend (`Node.js + Express + MongoDB`).

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env
```

3. Update required values in `.env`:
- `MONGO_URI`
- `JWT_SECRET`

4. Start dev server:

```bash
npm run dev
```

API runs at `http://localhost:5000` by default.

## Environment Variables

- `PORT`: Server port
- `NODE_ENV`: Environment mode
- `CLIENT_URL`: Allowed frontend origin for CORS
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for token signing/verification

## Scripts

- `npm run dev`: Start with nodemon
- `npm start`: Start with node
- `npm run lint`: Run lint checks

## Contribution Notes

- Keep routes, controllers, and models separated by responsibility.
- Validate request payloads before DB operations.
- Handle errors consistently.
- Add tests when features become stable.
- Update this guide if setup or folder structure changes.
