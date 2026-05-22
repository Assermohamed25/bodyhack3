## Goal
Convert the project from TanStack Start SSR to a plain Vite + React SPA. Output goes to `dist/` as static files (single `index.html` + assets) suitable for GitHub Pages hosting.

## Changes

### 1. Dependencies (`package.json`)
- Remove: `@tanstack/react-start`, `@tanstack/router-plugin`, `@cloudflare/vite-plugin`, `@lovable.dev/vite-tanstack-config`, `vite-tsconfig-paths` (replaced by path alias in vite.config).
- Keep: `@tanstack/react-router` (still used for routing) OR replace with `react-router-dom`. **Recommendation: switch to `react-router-dom`** since the existing routes are simple (`/` and `/subscribe`) and it removes the need for the file-based route generator entirely. Simpler for a static SPA.
- Add: `@vitejs/plugin-react` (already in devDeps), nothing else needed.

### 2. Vite config (`vite.config.ts`)
Replace the TanStack-specific config with a vanilla Vite SPA setup:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  base: "./", // works on GitHub Pages from any subpath
  plugins: [react(), tailwindcss()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: { outDir: "dist" },
});
```

### 3. Entry point
- Create `index.html` at project root (replaces the current redirect HTML) with `<div id="root"></div>` and `<script type="module" src="/src/main.tsx">`.
- Create `src/main.tsx` that mounts `<App />` into `#root` with `react-dom/client`.
- Create `src/App.tsx` with `BrowserRouter` (or `HashRouter` for GitHub Pages compatibility — see note) and `<Routes>` for `/` and `/subscribe`.

### 4. Convert route files
- `src/routes/index.tsx` → `src/pages/Index.tsx`: remove `createFileRoute(...)` wrapper, export the component directly. Move `<head>` meta into a `useEffect` that sets `document.title` (or use `react-helmet-async` — keep simple, just set title).
- `src/routes/subscribe.tsx` → `src/pages/Subscribe.tsx`: same treatment. Replace `Link` from `@tanstack/react-router` with `Link` from `react-router-dom`.
- Delete `src/routes/__root.tsx` and `src/routeTree.gen.ts` and the entire `src/routes/` folder.
- Delete `src/router.tsx`.

### 5. Files to delete
- `wrangler.jsonc` (Cloudflare Workers config)
- `_netlify.toml`
- `vercel.json`
- `src/routeTree.gen.ts`
- `src/routes/` (entire folder, after migrating)
- `src/router.tsx`
- Any `src/server.ts`, `src/start.ts`, `src/integrations/supabase/` server files if present.

### 6. GitHub Pages support
- Add `public/404.html` that's a copy of `index.html` (GitHub Pages SPA trick), OR use `HashRouter` instead of `BrowserRouter` to avoid the 404 routing issue. **Recommendation: `HashRouter`** — zero-config, works under any subpath, no server rewrites needed. URLs become `/#/subscribe`.
- `base: "./"` in vite.config ensures asset paths are relative.

### 7. Styles
- Keep `src/styles.css` as-is, imported from `src/main.tsx`.

## Result
- `bun run build` produces `dist/index.html` + hashed JS/CSS/asset bundles.
- Fully static, no server functions, no SSR, deployable to GitHub Pages by pushing `dist/` to `gh-pages` branch or configuring Pages to serve from `dist`.

## Open question
Do you want me to use **HashRouter** (URLs like `/#/subscribe`, works on GitHub Pages with zero config) or **BrowserRouter** + a `404.html` fallback (cleaner URLs like `/subscribe`, requires the GitHub Pages SPA trick)? Default in the plan is HashRouter for simplicity unless you say otherwise.
