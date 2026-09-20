# Veritas — Facts Before Beliefs

AI fact-checking frontend, built with React + Vite. Connects to a FastAPI backend
exposing `POST /news/`.

## Setup

```bash
npm install
```

Create a `.env` file in the project root (copy `.env.example`) and point it at
your running FastAPI backend:

```
VITE_API_URL=http://localhost:8000
```

Then run your backend (e.g. `uvicorn main:app --reload`) so `/news/` is reachable
at that URL.

## Run

```bash
npm run dev
```

Open the printed local URL, scroll to the verification box (or click **Verify**
in the navbar), paste a headline, and submit. The card will show a loading state,
then transition into the result: `TRUE` / `FAKE` with a confidence ring.

## Notes

- The frontend only ever reads `prediction` and `confidence` from the API
  response — any other fields your backend returns are ignored.
- If the backend is unreachable or returns an unexpected shape, the UI shows a
  generic "Unable to verify right now" message rather than a raw error.
- The "Verified Articles" cards are clearly sample/demo content, not live data.
- `npm run build` produces a production build in `dist/`.
