# Swap Skills

Swap Skills is a MERN-stack platform where people can teach and learn skills from each other.

## Development Status

This project is currently in the **development phase**.

Contributions are welcome from anyone.

## What is this?

This repository contains:
- `frontend/`: React + Vite client application.
- `server/`: Node.js + Express + MongoDB API.

The goal is to build a skill-exchange platform where users can connect, offer skills, and learn from others.

## How do I run it?

## Prerequisites
- Node.js 18+
- npm 9+
- MongoDB (local or cloud)

## 1) Clone and enter the project

```bash
git clone https://github.com/BiTech5/swap-skills
cd swap-skills
```

## 2) Configure environment variables

Create env files from examples:

```bash
cp frontend/.env.example frontend/.env
cp server/.env.example server/.env
```

Update values as needed, especially:
- `server/.env` -> `MONGO_URI`, `JWT_SECRET`
- `frontend/.env` -> `VITE_API_BASE_URL`

## 3) Install dependencies

```bash
cd server && npm install
cd ../frontend && npm install
```

## 4) Start the backend

```bash
cd server
npm run dev
```

Default backend URL: `http://localhost:5000`

## 5) Start the frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```

Default frontend URL: `http://localhost:5173`

## How can I contribute?

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with clear commit messages.
4. Test your changes locally.
5. Open a pull request with a short description.

Please keep changes focused and include updates to docs when behavior changes.

## Separate Guidance

- Frontend guide: [frontend/GUIDE.md](frontend/GUIDE.md)
- Server guide: [server/GUIDE.md](server/GUIDE.md)
