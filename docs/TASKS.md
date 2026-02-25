# AI Agent Task Plan — Frontend Home Assignment (Sports Leagues)

## Purpose
This file documents a step-by-step task list that I can delegate to an AI coding agent while completing the home assignment.

## Project Context
- Stack: **Vue 3 + Vite + TypeScript + Pinia + Element Plus**
- Tests: **Not required** (do not add test setup or test files)
- Priority: **Functional, responsive UI** and correct product logic over visual polish
- App type: **Single Page Application (SPA)**
- Assignment focus:
  - Component-based architecture
  - State management
  - API integration
  - Filtering
  - Response caching for badge lookup

## What I Will Do Manually First
I will scaffold the project using:

- `npm create vue@latest`
- Select:
  - TypeScript
  - Pinia
  - ESLint
  - Prettier

After that, I will give the tasks below to the AI agent one by one.

---

## Rules for the AI Agent (important)
- Keep the implementation **simple and production-runnable**
- Use **TypeScript** everywhere (typed API responses, store state, props)
- Use **Element Plus** for UI controls and layout where appropriate
- Use **Pinia** for app state and API actions
- Do **not** add tests
- Do **not** over-engineer (no router unless truly needed; this is a single page)
- Prefer small, clear components
- Add comments only where they improve readability
- Make sure the project is **100% runnable** with standard npm scripts

---

## Task List (Sequential)

### Task 1 — Install and configure Element Plus
**Goal:** Add Element Plus and confirm it works in the Vue app.

**Instructions for AI agent:**
1. Install Element Plus.
2. Register Element Plus in `main.ts`.
3. Ensure the app builds and runs.
4. Keep setup minimal (no unnecessary plugins).

**Done when:**
- Element Plus components render correctly in the app.
- `npm run dev` works without errors.

---

### Task 2 — Create the app structure (components + services + store + types)
**Goal:** Prepare a clean, component-based architecture before implementing logic.

**Instructions for AI agent:**
Create a simple project structure (adjust names if needed, but keep it clear):
- `src/components/`
  - `LeagueFilters.vue`
  - `LeagueList.vue`
  - `LeagueListItem.vue`
  - `LeagueBadgePreview.vue`
- `src/stores/leagues.ts`
- `src/services/sportsApi.ts`
- `src/types/sports.ts`
- `src/composables/` (optional, only if needed)
- `src/App.vue`

**Done when:**
- Files exist with minimal boilerplate.
- Imports are clean and TypeScript compiles.

---

### Task 3 — Implement typed API service for TheSportsDB
**Goal:** Centralize API calls and types.

**Instructions for AI agent:**
1. In `src/types/sports.ts`, define TypeScript interfaces for:
   - All Leagues response
   - League item
   - Seasons/Badge lookup response (only fields needed)
2. In `src/services/sportsApi.ts`, implement:
   - `fetchAllLeagues()`
   - `fetchLeagueSeasonsWithBadges(leagueId: string)`
3. Use the assignment endpoints:
   - All Leagues: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
   - Badge Lookup: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`
4. Add basic error handling (throw meaningful errors).

**Done when:**
- API calls are isolated in one service file.
- Types are used (no `any`).

---

### Task 4 — Implement Pinia store for leagues, filters, and selected badge
**Goal:** Manage app state in one place.

**Instructions for AI agent:**
Create `src/stores/leagues.ts` with state for:
- `leagues` (all fetched leagues)
- `loadingLeagues`
- `leaguesError`
- `searchQuery`
- `selectedSport`
- `selectedLeagueId` (or selected league object)
- `badgeImageUrl`
- `loadingBadge`
- `badgeError`
- `badgeCache` (cache badge results by league ID to avoid repeat calls)

Add actions for:
- `loadLeagues()`
- `selectLeagueAndLoadBadge(leagueId: string)`
- setters for filters (or directly bind to state)

Add getters/computed-like store properties for:
- `sportOptions` (unique sorted sports from leagues)
- `filteredLeagues` (by search + sport)

**Filtering rules:**
- Search should be case-insensitive and match `strLeague`
- Sport dropdown should support “All sports” option

**Done when:**
- Store fully controls data loading, filtering, selection, and badge caching.
- Re-clicking the same league does not trigger unnecessary badge API fetch (if already cached).

---

### Task 5 — Build filter UI component (search + sport dropdown)
**Goal:** Implement filtering controls using Element Plus.

**Instructions for AI agent:**
Create `LeagueFilters.vue` that renders:
- Search input (Element Plus input)
- Sport dropdown (Element Plus select)

Props / emits or store usage:
- Either use props/emits from parent OR connect directly to Pinia (choose one clean pattern and stay consistent)

UX notes:
- Placeholder for search input (e.g., “Search leagues by name”)
- “All sports” option in dropdown
- Responsive layout (stack on mobile, inline on larger screens)

**Done when:**
- Typing in search updates visible leagues
- Changing sport filter updates visible leagues

---

### Task 6 — Build league list UI (component-based)
**Goal:** Display league data with required fields and click behavior.

**Instructions for AI agent:**
Create:
- `LeagueList.vue` to render the list
- `LeagueListItem.vue` for each league row/card

Display required fields for each league:
- `strLeague`
- `strSport`
- `strLeagueAlternate`

Click behavior:
- League item should be clickable
- Clicking triggers badge lookup via store action

UI guidance:
- Use a responsive list/table/card layout with Element Plus
- Prioritize readability and functionality over heavy styling
- Make selected item visually distinguishable (simple highlight)

**Done when:**
- The list renders all required fields
- Clicking an item triggers badge loading

---

### Task 7 — Build badge preview panel with caching-aware behavior
**Goal:** Show season badge image returned by the badge API.

**Instructions for AI agent:**
Create `LeagueBadgePreview.vue` that displays:
- Selected league title (optional but useful)
- Loading state while badge request is in progress
- Error state if badge request fails
- Badge image when available
- Empty state before any league is selected

Badge selection logic:
- Use the first available season badge image from the response (or any valid season, but keep logic deterministic)
- Handle cases where no badge exists (show a “No badge available” message)

**Done when:**
- Badge loads after clicking a league
- Cached result is reused on repeated clicks

---

### Task 8 — Add loading, error, and empty states for the main page
**Goal:** Make the app robust and user-friendly.

**Instructions for AI agent:**
In `App.vue` and/or components, implement:
- Initial loading state while leagues are fetched
- Error message if leagues fetch fails
- Empty state when filters return no results
- Badge loading/error/empty states in the badge panel

Use simple Element Plus components where helpful (alerts, empty state, skeleton/spinner).

**Done when:**
- The app handles common states gracefully without broken UI

---

### Task 9 — Compose the page layout in `App.vue`
**Goal:** Put everything together as a single-page app.

**Instructions for AI agent:**
Build a clean SPA layout:
- Header/title section
- Filter section
- Main content area with:
  - League list
  - Badge preview panel

Responsive behavior:
- Mobile: stacked layout
- Desktop: two-column layout (list + badge panel) if feasible

Keep styles minimal and maintainable (scoped CSS or a small central stylesheet).

**Done when:**
- App is fully usable on mobile and desktop widths
- Layout is clean and functional

---

### Task 10 — Final code cleanup and runnability check
**Goal:** Ensure the repository is easy to run and submit.

**Instructions for AI agent:**
1. Remove unused imports and dead code.
2. Check linting issues and fix obvious ones.
3. Confirm the app runs with:
   - `npm install`
   - `npm run dev`
4. Ensure no environment variables are required.
5. Keep the repository lightweight and clear.

**Done when:**
- Code is clean and project is runnable from a fresh clone
