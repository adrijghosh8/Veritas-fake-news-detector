# Veritas — Frontend

React + Vite + TypeScript + Tailwind CSS + Framer Motion + Lucide. Talks to the existing FastAPI backend via `POST /verify`.

## Setup

```bash
cd frontend
npm install
cp .env.example .env     # Windows: copy .env.example .env
npm run dev              # http://localhost:5173
```

Other commands: `npm run typecheck`, `npm run build`, `npm run preview`.

## Configuring the backend URL

Set `VITE_API_URL` in `frontend/.env` (local) or in your host's environment settings (deployment). No trailing slash.

```env
VITE_API_URL=http://127.0.0.1:8000
```

Vite reads this at build time, so rebuild after changing it for a deployed site. Only public values belong in `VITE_` variables; Gemini and other API keys stay in the backend `.env`.

Run the backend separately, from its own folder:

```bash
uvicorn main:app --reload --port 8000
```

## How the integration works

- `src/services/api.ts` is the only file that calls the backend. It sends `POST ${VITE_API_URL}/verify` with `{ "article_text": "..." }` and `Content-Type: application/json`.
- The response is validated (verdict is one of the four allowed values, `claims` is an array, each claim has the expected fields). Anything else is surfaced as a "malformed response" error; nothing is faked.
- Errors are classified as `network`, `timeout` (180 s client limit), `validation` (422), `server` (5xx), `http` (other), or `malformed`, and each gets its own message. The article text is kept after any failure. Retry is a button the user clicks; nothing is retried automatically.
- The loading stages are illustrative only. The backend returns a single completed response, so the UI does not claim real progress.

## Validation limits

`src/constants.ts` holds `MAX_ARTICLE_LENGTH = 20000` and `MIN_ARTICLE_LENGTH = 50`. **The backend's `NewsInput` schema wasn't available when this was built, so 50 is a placeholder. Set `MIN_ARTICLE_LENGTH` to match the `min_length` in `schemas/news.py`.** If it is lower than the backend's, the backend's 422 message is shown inline.

## CORS and deployment

`main.py` currently allows these origins:

- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `https://fake-news-detector-frontend-rj97.onrender.com`

If you deploy the frontend on any other domain, add that exact origin (scheme + host, no path or trailing slash) to `allow_origins` in `main.py` and redeploy the backend. A blocked origin shows up in the UI as "Server unavailable". Also set `VITE_API_URL` to the deployed backend's HTTPS URL; a page served over HTTPS cannot call an `http://` backend.

For a static host such as Render Static Sites, use build command `npm install && npm run build` and publish directory `dist`.

## Structure

```text
src/
├── components/   Navbar, Hero, HeroArt, ArticleForm, LoadingState, ErrorState,
│                 VerificationResults, ClaimCard, VerdictBadge, SourceList,
│                 HowItWorks, About, Footer, Logo
├── services/api.ts
├── types/verification.ts
├── utils/scroll.ts
├── constants.ts
├── App.tsx  main.tsx  index.css
```

## Notes

- Palette: ivory, charcoal, muted lavender. Accent is limited to the hero highlight and verdict status colors. To switch to sage or beige, change `lavender` in `tailwind.config.js`.
- Animations respect `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` plus a CSS fallback).
- Source links open in a new tab with `rel="noopener noreferrer"`; only `http(s)` URLs are rendered as links.
