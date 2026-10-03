# Febros16 Frontend Guidelines

## Development Rules
1. **Next.js Configuration (Vercel Compatibility):**
   Do NOT add `output: "export"` to `next.config.ts`. The application relies on dynamic routes (e.g., `[id]`) and Server-Side Rendering (SSR) supported natively by Vercel.

2. **Internal Routing:**
   Always use `import Link from 'next/link'` and `<Link href="...">` instead of standard `<a>` tags for internal navigation to maintain the Single Page App (SPA) experience and speed.

3. **Image Optimization:**
   When using external image sources (like Unsplash), use the `next/image` component and ensure the domain is whitelisted under `images.remotePatterns` in `next.config.ts`.

4. **Optimistic UI Data Fetching:**
   Do not remove items from React state before ensuring the `fetchApi` call was successful. Wait for the asynchronous call to finish successfully, as our API wrapper throws an error if `!response.ok`.

## Project Tracking
- Always read and update `PROJECT_STATUS.md` at the root of the project to understand the current architecture, completed phases, and pending features. Every time you start a new session, refer to this file to regain full context of the project.
