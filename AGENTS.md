# AGENTS.md — Frontend (React)

## Stack
React 19, Vite 7, Tailwind CSS 4, Firebase Auth (client), TanStack React Query.
React Compiler enabled via `babel-plugin-react-compiler`.

## Commands
    cd frontend
    npm install
    npm run dev       # Vite dev server on :5173
    npm run build     # production build → dist/
    npm run lint      # ESLint

## Architecture
- **API base URL**: `VITE_API_BASE_URL` (defaults to `http://localhost:8007/api`)
- **Auth**: Firebase Google sign-in, JWT in localStorage, axios interceptors handle refresh
- **Routes**: `/`, `/workspace`, `/settings/*`, `/pricing`, `/privacy-policy`, `/shop`, `/login`
- **Protected routes**: `/workspace` and `/settings/*` via `<ProtectedRoute>`
- **Deployed on Vercel** (SPA rewrites in `vercel.json`)

## Key files
- `src/api_call/axiosInstance.js` — axiosPublic (no auth) + axiosPrivate (auto-attach JWT, 401 refresh)
- `src/contexts/AuthContext.jsx` — Firebase auth state, token management, login/logout
- `src/hooks/useApi.js` — React Query hooks for all API calls
- `src/config/firebase.js` — Firebase init (hardcoded config)

## Gotchas
- Tailwind CSS 4 uses `@tailwindcss/vite` plugin (not PostCSS-based)
- `tailwind.config.js` exists but may be redundant with Tailwind v4 CSS-first config
- ESLint: ignores `dist/`, allows unused vars matching `^[A-Z_]`
- Token refresh on 401 redirects to `/login` on failure — don't swallow 401 errors
- No backend tests/lint/typecheck exist — only `npm run lint` for frontend
