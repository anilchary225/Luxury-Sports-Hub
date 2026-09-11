# MSK Academy — Zenithh Sports Arena

A premium multi-sport academy website for **MSK Academy / Zenithh Sports Arena**, Hyderabad.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v4 + custom CSS variables |
| Routing | React Router v6 |
| Animations | GSAP, Framer Motion |
| Backend | Express (Node.js) |
| Package manager | pnpm workspaces |

## Project Structure

```
├── artifacts/
│   ├── msk-academy/        # Frontend (React + Vite)
│   │   ├── src/
│   │   │   ├── pages/      # Home, About, Sports, Facilities, Events, Gallery, Contact …
│   │   │   ├── components/ # Navbar, Footer, SportsMeetDialog, UI primitives …
│   │   │   └── lib/        # Utilities
│   │   └── public/         # Static assets (images, fonts, videos)
│   └── api-server/         # Express API
│       └── src/
│           └── routes/     # /api/enquiry, /api/registration, /api/download-enquiries
├── lib/
│   └── api-spec/           # OpenAPI spec (openapi.yaml)
└── package.json            # pnpm workspace root
```

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Install dependencies
```bash
pnpm install
```

### Run locally

**Frontend** (http://localhost:\<PORT\>)
```bash
pnpm --filter @workspace/msk-academy run dev
```

**API Server** (http://localhost:8080)
```bash
pnpm --filter @workspace/api-server run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ✅ | Port for the frontend dev server |
| `BASE_PATH` | ✅ | Base path for Vite (e.g. `/`) |
| `SESSION_SECRET` | ✅ | Secret used for session signing |
| `ADMIN_DOWNLOAD_SECRET` | ⚠️ | Bearer token to protect `/api/download-enquiries` |

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About MSK Academy |
| `/sports` | All Sports |
| `/sports/:id` | Sport Detail |
| `/coaches` | Coaches |
| `/coaches/:id` | Coach Profile |
| `/facilities` | Facilities |
| `/msk-academy` | MSK Academy |
| `/events` | Events |
| `/gallery` | Gallery |
| `/contact` | Contact / Register |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/enquiry` | Submit a general enquiry |
| `POST` | `/api/registration` | Submit a sport registration |
| `GET` | `/api/download-enquiries` | Download all enquiries as Excel (auth required) |
