# GEMINI.md - AI Context & Project Documentation

## Project Overview

**Name:** Casinos Canada (Rebuild)
**Domain:** <https://casinoscanada.online/>
**Goal:** Rebuild an existing affiliate casino website to achieve top-tier SEO performance, high "AI Optimization" (AIO/GEO), and superior user experience using a modern, high-performance stack.
**Target Audience:** Canadian players seeking honest reviews, fast banking options, and safe online casinos.

---

## Tech Stack & Architecture

### Core Technologies

* **Framework:** Astro 5.0+ (Static Site Generation / Hybrid)
* **Styling:** Tailwind CSS (Utility-first)
* **Interactivity:** Svelte (Used sparingly for "Islands" like filters, calculators)
* **Data Source 1 (Content):** MDX (Markdown + JSX) for long-form reviews and guides.
* **Data Source 2 (Structured):** SQLite (for relational data like casino attributes, software providers, slots specs).
* **Database Client:** `better-sqlite3` or `libsql` (Turso).

### Architectural Pattern

* **HTML-First:** Prioritize sending static HTML to the browser.
* **Islands Architecture:** Interactive components (Svelte) are hydrated only when visible (`client:visible`) or on load (`client:load`).
* **Silo Structure:** Content is organized into distinct semantic silos (Reviews, Banking, Bonuses, Slots) to build topical authority.

---

## Coding Standards & Conventions

### 1. Project Structure

* `src/content/`: Contains all editorial content (MDX).
  * `src/content/reviews/`: Casino reviews.
  * `src/content/guides/`: Banking and how-to guides.
* `src/db/`: Contains SQLite setup and schema.
* `src/components/interactive/`: Svelte components only.
* `src/components/ui/`: Static Astro components or simple UI elements.

### 2. SEO & AI Optimization (AIO) Rules

* **Schema.org:** Every page MUST generate JSON-LD schema.
  * Reviews -> `Review` + `Casino` schema.
  * Guides -> `Article` or `FAQPage` schema.
* **Semantic HTML:** Use proper tags (`<article>`, `<section>`, `<aside>`, `<table>`) to ensure AI scrapers understand the content structure.
* **Entity Linking:** Internal links must connect related entities (e.g., link "Bitstarz" to "Interac" if they support it).

### 3. Data Management (Hybrid Approach)

* **Editorial Text:** Written in `.mdx`.
  * *Frontmatter:* Contains metadata (`title`, `date`, `rating`, `casino_id`).
* **Hard Data:** Stored in SQLite (or Collections if static).
  * *Usage:* Lists, comparison tables, and sorting/filtering logic query this data, not the markdown files.

### 4. Component Style

* **Astro Components:** Default choice. Use for layouts, headers, footers, and static content.
* **Svelte Components:** Use ONLY for stateful UI (search bars, filtering systems, calculators).
* **Tailwind:** Use utility classes directly. Avoid `@apply` unless necessary for reusable text styles.

---

## Critical Action Items (Roadmap)

### Phase 1: Foundation (Current)

* [ ] Initialize Astro project with Tailwind & Svelte integrations.

* [ ] Set up `src/content` collections with strict Zod schemas.
* [ ] Create base layouts (`BaseLayout.astro`, `ReviewLayout.astro`).
* [ ] Implement robust `robots.txt` and Sitemap generation.

### Phase 2: Core Content Migration

* [ ] Rebuild "Banking" page (Deep content, 1500+ words).

* [ ] Rebuild "Bitstarz" review using the Hybrid MDX/Component model.
* [ ] Create reusable components: `<BonusCard>`, `<ProsCons>`, `<CasinoTable>`.

### Phase 3: AI & GEO Features

* [ ] Implement dynamic JSON-LD Schema generator in the head.

* [ ] Add "FAQ" sections to all pages (using `FAQPage` schema).
* [ ] Optimize tables for data extraction (clear headers, summary attributes).

---

## Tone & Voice

* **Persona:** Experienced, trustworthy, Canadian gambling expert.
* **Style:** Professional but accessible. "Direct answers first, details second."
* **Avoid:** Marketing fluff. Focus on factual data (payout speeds, license numbers).

---

## Quick Commands

* `npm run dev`: Start development server.
* `npm run build`: Build for production.
* `npm run preview`: Preview the build locally.
* `npx astro sync`: Sync content collection types.

## Change Log - Dec 10, 2025

* **Architecture Update:** Modified `src/layouts/BaseLayout.astro` to accept a `mainClass` prop (allows full-width sections).
* **New Component:** Created `src/components/ui/SlotsSection.astro` (Static UI for homepage).
* **New Page:** Created `src/pages/slots/index.astro` (The Slots Silo homepage).
* **New Template:** Created `src/pages/slots/[...slug].astro` (Dynamic single slot pages).
* **Next Steps:** Need to add real slot images to `public/images/slots/` and connect the "Review" pages.

## Change Log - Dec 12, 2025

* **Reviews Silo:** Enhanced `src/pages/reviews/[...slug].astro` with rich `Review` Schema (pros/cons).
* **Smart UI:** Created `CasinoSpecs.astro` that auto-calculates min deposits from connected payment methods.
* **UX Upgrade:** Implemented "Scroll Spy" in `ReviewLayout.astro` for intelligent TOC highlighting.
* **Data Structure:** Migrated review Pros/Cons to Frontmatter for better AI indexing.
