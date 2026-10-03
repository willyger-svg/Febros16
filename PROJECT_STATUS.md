# Febros16 - Frontend Project Status

## Architecture
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Hosting**: Vercel
- **Authentication**: JWT stored in `localStorage`, managed globally via context/effects.

## Completed Phases
- **Phase 1: Auth UI**: Login and Register pages with form validation (min 8 chars password, eye icon for toggling visibility).
- **Phase 2: Dashboard UI**: Initial user dashboard, reading stats from backend (`/api/v1/users/me`), profile rendering.
- **Phase 3: Articles UI**: Full CRUD pages (`/dashboard/articles/manage`, `/dashboard/articles/new`, `/dashboard/articles/[id]/edit`), Public Feed (`/articles`).
- **Phase 4: Research UI**: Full CRUD pages (`/dashboard/research/manage`, `/dashboard/research/new`, `/dashboard/research/[id]/edit`), Public Feed (`/research`).
- **Phase 5: Landing Page**: Completely redesigned responsive landing page (`/`) conforming to strict production designs, integrated with Auth state, and using optimized `next/image` components.

## Current Status
- Landing page successfully integrated and deployed to Vercel.
- The platform now supports Articles and Research Projects natively.

## Next Steps
- Potentially integrating Campaigns (e.g. OO24) or Resources.
- Creating the global Search page functionality.
