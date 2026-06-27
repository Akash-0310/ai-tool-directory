# Neural — AI Tool Directory

A curated, searchable home for the ever-growing world of AI tools.

## What it is

Neural is a discovery platform that brings order to the noise of "new AI tool released every day." Instead of wading through endless blog posts and social feeds, users can browse a thoughtfully organized catalog of tools, filter by what they actually want to do, and land on the right tool in under a minute.

Every tool in the directory is categorized, tagged, and described in plain language — so a first-time user and a power user get equal value out of the same listing.

## Who it's for

- **Creators and marketers** hunting for tools that speed up writing, image generation, video editing, or social content.
- **Developers and engineers** looking for coding copilots, review tools, and AI-assisted workflows.
- **Researchers, students, and analysts** who need transcription, summarization, or knowledge-extraction helpers.
- **Teams and managers** evaluating the AI landscape for internal adoption.
- **Curious explorers** who just want to see what's out there without committing to a paid trial.

## Use cases

- Quickly find the best tool for a specific job (e.g. "AI meeting notes," "logo generator," "SQL assistant").
- Compare alternatives side by side before signing up.
- Bookmark and return to tools worth trying later.
- Stay current with categories (writing, image, video, coding, audio, productivity, marketing, research) as they evolve.
- Reach out to the team to suggest a new tool or report outdated information.

## Core capabilities

- **Category-based browsing** so discovery feels structured, not overwhelming.
- **Search and filtering** to cut straight to the tool you need.
- **Detail views** with clear descriptions, strengths, and direct links to each tool.
- **Contact and subscribe flows** for feedback, partnership inquiries, and directory updates.
- **Polished reading experience** across desktops, tablets, and phones, in both light and dark modes.

## The idea in one line

Neural is the front door to the AI ecosystem — opinionated enough to be useful, neutral enough to be trusted.

## Local development

This is a monorepo with a `backend` (Express + MongoDB) and a `frontend` (Vite + React). The root `package.json` wires both together so you can run everything with one command.

### Prerequisites

- Node.js 18+
- A MongoDB instance (local `mongodb://127.0.0.1:27017` or a connection string)

### Setup

```bash
# install root, backend, and frontend dependencies
npm run setup

# create the backend env file and fill in your values
cp backend/.env.example backend/.env
```

### Run

```bash
# start backend (http://localhost:5000) and frontend (http://localhost:5173) together
npm run dev
```

The Vite dev server proxies `/api` to the backend, so the frontend talks to it with no extra config.

### Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Run backend + frontend concurrently |
| `npm run dev:backend` | Run only the backend (nodemon) |
| `npm run dev:frontend` | Run only the frontend (Vite) |
| `npm run seed` | Seed the database with sample tools |
| `npm run build` | Build the frontend for production |
| `npm start` | Run the backend in production mode |
