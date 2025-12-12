# CasinosCanada.online - Comprehensive Architecture Documentation

**Generated:** 2025-12-12
**Project:** Casinos Canada Rebuild
**Domain:** https://casinoscanada.online/

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Database Schema & Relationships](#2-database-schema--relationships)
3. [Components Architecture](#3-components-architecture)
4. [Layouts Structure](#4-layouts-structure)
5. [Content Collections](#5-content-collections)
6. [Page Structure & Routing](#6-page-structure--routing)
7. [Key Architectural Patterns](#7-key-architectural-patterns)

---

## 1. TECH STACK

### Core Framework & Build Tools

- **Astro**: v5.16.4 (Static Site Generation with Islands Architecture)
- **Node.js**: Type: "module" (ES Modules)
- **TypeScript**: v5.9.3 with strict null checks enabled
- **Build Process**: `npm run seed && astro build` (seeds database before building)

### Integrations & Dependencies

**Astro Integrations:**
- `@astrojs/mdx` (v4.3.12) - MDX content support
- `@astrojs/sitemap` (v3.6.0) - Automatic sitemap generation
- `@astrojs/svelte` (v7.2.2) - Svelte component support
- `@astrojs/tailwind` (v5.1.5) - Tailwind CSS integration

**Styling:**
- Tailwind CSS v3.4.18 + Vite plugin v4.1.17
- `@tailwindcss/typography` (v0.5.19) - Prose styling for MDX content

**Interactive Components:**
- Svelte v5.45.6 - For interactive islands

**Database:**
- `better-sqlite3` (v12.5.0) - Embedded SQLite database
- Database file: `local.db` (WAL mode enabled)

**Development Tools:**
- `tsx` (v4.21.0) - TypeScript execution for seed scripts
- `@types/better-sqlite3` (v7.6.13)

### Configuration Files

**astro.config.mjs:**
```javascript
site: 'https://casinoscanada.online'
trailingSlash: 'always'
format: 'directory'
integrations: [tailwind, svelte, mdx, sitemap]
```

**tsconfig.json:**
- Extends: `astro/tsconfigs/strict`
- Strict null checks enabled
- JSX preserved for Svelte/Astro interop

**tailwind.config.mjs:**
- Typography plugin enabled
- Scans: `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`

---

## 2. DATABASE SCHEMA & RELATIONSHIPS

### Database Architecture

- **Type**: SQLite (better-sqlite3)
- **Location**: `C:\Affiliates\Websites\CasinosCanada\local.db`
- **Mode**: WAL (Write-Ahead Logging) for better performance
- **Seeding**: Automated via `npm run seed` (executes `src/db/seed.ts`)

### Tables & Schema

#### 1. casinos
```sql
- id (TEXT, PRIMARY KEY) - e.g., 'bitstarz', 'spin', 'woo'
- name (TEXT)
- website_url (TEXT)
- established (INTEGER)
- license (TEXT) - e.g., 'Curacao', 'MGA'
- owner (TEXT)
- payout_speed_minutes (INTEGER) - Key metric for comparisons
- payout_ratio (REAL) - RTP percentage
- theme_color (TEXT)
- logo_url (TEXT)
- thumbnail_url (TEXT)
- bonus_offer (TEXT)
- bonus_spins (INTEGER)
```

#### 2. software_providers
```sql
- id (TEXT, PRIMARY KEY) - e.g., 'netent', 'pragmatic'
- name (TEXT)
- logo_url (TEXT)
```

#### 3. casino_software (Many-to-Many Junction)
```sql
- casino_id (TEXT, FK -> casinos.id)
- provider_id (TEXT, FK -> software_providers.id)
- PRIMARY KEY (casino_id, provider_id)
```

#### 4. slots
```sql
- slug (TEXT, PRIMARY KEY) - URL-friendly identifier
- title (TEXT)
- provider_id (TEXT, FK -> software_providers.id)
- rtp (REAL)
- volatility (TEXT) - 'High', 'Medium', 'Low'
- max_win (TEXT) - e.g., 'x10,000'
- paylines (TEXT)
- release_date (TEXT)
- description (TEXT)
- image_url (TEXT)
- featured (INTEGER) - Boolean flag (0/1)
- min_bet (REAL)
- max_bet (REAL)
- layout (TEXT) - e.g., '5x3', '7x7'
- features (TEXT) - JSON array, e.g., '["Free Spins", "Wilds"]'
```

#### 5. payment_methods
```sql
- id (TEXT, PRIMARY KEY) - e.g., 'interac', 'bitcoin'
- name (TEXT)
- logo_url (TEXT)
- description (TEXT)
- type (TEXT) - 'Bank Transfer', 'E-Wallet', 'Crypto', 'Card'
- avg_speed (TEXT) - 'Instant', '10-60 Mins', etc.
- fees (TEXT)
- min_deposit (INTEGER)
- max_withdrawal (INTEGER)
- pros (TEXT) - JSON array
- cons (TEXT) - JSON array
```

#### 6. casino_payment_methods (Many-to-Many Junction)
```sql
- casino_id (TEXT, FK -> casinos.id)
- method_id (TEXT, FK -> payment_methods.id)
- PRIMARY KEY (casino_id, method_id)
```

### Entity Relationships

```
casinos (1) ←→ (M) casino_software (M) ←→ (1) software_providers
casinos (1) ←→ (M) casino_payment_methods (M) ←→ (1) payment_methods
software_providers (1) ←→ (M) slots
```

### Sample Data Volume

- **Casinos**: 4 (Bitstarz, Spin, Woo, Fastpay)
- **Software Providers**: 8 (NetEnt, Evolution, Pragmatic Play, Microgaming, Gaming Corps, ReelPlay, Relax Gaming, Swintt)
- **Slots**: 4 (Snoops High Rollers, Quackin' Reels, The Tumbles, Hidden Treasures of Rome)
- **Payment Methods**: 6 (Interac, iDebit, MuchBetter, Bitcoin, Visa, Mastercard)

---

## 3. COMPONENTS ARCHITECTURE

### Component Organization

```
src/components/
├── common/          # Shared layout components
├── ui/              # Static UI components (Astro)
├── interactive/     # Svelte islands (stateful)
├── reviews/         # Casino review-specific
├── slots/           # Slot-specific components
├── banking/         # Payment method components
└── mdx/             # MDX-specific components
```

### Component Inventory

#### COMMON (Shared Infrastructure)

- `Header.astro` - Sticky navigation with search trigger
- `Footer.astro` - Site footer
- `SEOHead.astro` - Meta tags, OpenGraph, Twitter Cards, canonical URLs
- `Container.astro` - Max-width wrapper
- `Analytics.astro` - Analytics placeholder
- `MobileMenu.svelte` - Mobile navigation (ISLAND)
- `EntityHero.astro` - Reusable hero for casinos/slots/software

#### UI (Static Astro Components)

- `BonusCard.astro` - Highlighted bonus offer
- `ProsCons.astro` - Two-column pros/cons layout
- `Breadcrumbs.astro` - Breadcrumb navigation
- `CasinoTopList.astro` - Homepage top 10 casino table
- `CasinoCard.astro` - Generic casino card
- `CasinoGridCard.astro` - Grid layout casino card
- `SidebarCasinos.astro` - Similar casinos widget
- `SlotsSection.astro` - Featured slots section
- `BankingGrid.astro` - Payment methods grid
- `BankingStats.astro` - Banking statistics
- `BankingFAQ.astro` - Banking FAQ section

#### INTERACTIVE (Svelte Islands)

- `SearchPalette.svelte` - Cmd+K search modal (client:idle)
- `WageringCalc.svelte` - Bonus wagering calculator (client:load)
- `SlotFilter.svelte` - Slot filtering/sorting engine (client:load)
- `SlotCard.svelte` - Individual slot card with hover effects
- `BonusFilter.svelte` - Bonus filtering (client:load)
- `ComparisonEngine.svelte` - Side-by-side casino comparison (client:only)
- `MobileMenu.svelte` - Responsive mobile menu (client:load)

#### REVIEW-SPECIFIC

- `CasinoHero.astro` - Casino review hero section
- `CasinoSpecs.astro` - Casino specifications sidebar widget (fetches from DB)

#### SLOT-SPECIFIC

- `SlotHero.astro` - Slot game hero
- `SlotSpecs.astro` - Slot specifications widget
- `SlotFilter.svelte` - Filter/search engine
- `SlotCard.svelte` - Slot card with game-window aesthetic

#### BANKING

- `PaymentMethodCard.astro` - Payment method card

#### MDX

- `ProseTable.astro` - Styled table for MDX content

### Islands Architecture Implementation

**Hydration Strategies:**

- `client:idle` - SearchPalette (loads after page interactive)
- `client:load` - Interactive filters, calculators (immediate load)
- `client:only="svelte"` - ComparisonEngine (Svelte-only, no SSR)
- `client:visible` - Not currently used but supported

**Example from BaseLayout.astro:**
```astro
<SearchPalette client:idle />
```

**Data Flow Pattern:**

1. **Build Time**: SQLite query in `.astro` file
2. **Props Passing**: Data serialized and passed to Svelte
3. **Client Hydration**: Svelte takes over interactivity

---

## 4. LAYOUTS STRUCTURE

### Layout Hierarchy

```
BaseLayout.astro (Root)
├── ReviewLayout.astro (Extends BaseLayout)
└── ListingLayout.astro (Extends BaseLayout)
```

### BaseLayout.astro (Root Layout)

**Location**: `src/layouts/BaseLayout.astro`

**Features:**
- Global CSS import (`global.css`)
- SEOHead component
- Analytics component
- SearchPalette (global Cmd+K search)
- Header & Footer
- Slot-based content insertion
- Named slot: `<slot name="head" />` for page-specific head content

**Props:**
- `title` (string)
- `description` (string, optional)
- `image` (string, optional)

### ReviewLayout.astro (Casino Reviews)

**Location**: `src/layouts/ReviewLayout.astro`

**Features:**
- Extends BaseLayout
- Two-column layout (content + sidebar)
- Dynamic breadcrumbs
- CasinoHero component integration
- CasinoSpecs widget (fetches DB data via casinoId)
- Table of Contents (TOC) with scroll-spy
- Active heading highlighting
- SidebarCasinos widget

**Props:**
- `frontmatter` (MDX frontmatter object)
- `headings` (array from MDX render)

**TOC Implementation:**
- Client-side scroll spy JavaScript
- Active link tracking based on viewport position
- Smooth scroll navigation
- CSS classes: `.toc-active`, `.toc-item-active`, `.header-active`

**Layout Structure:**
```astro
<Container>
  <Breadcrumbs />
  <CasinoHero />
  <Grid (12 cols)>
    <Main (8 cols)>
      <slot /> <!-- MDX content -->
    </Main>
    <Aside (4 cols)>
      <CasinoSpecs />
      <TOC />
      <SidebarCasinos />
    </Aside>
  </Grid>
</Container>
```

### ListingLayout.astro (Index Pages)

**Location**: `src/layouts/ListingLayout.astro`

**Features:**
- Extends BaseLayout
- Hero section with customizable title/description
- Breadcrumbs support
- Named slot for custom hero content
- Single-column content area

**Props:**
- `title`, `description`
- `heroTitle`, `heroDescription`
- `breadcrumbs` (optional array)

**Usage:**
- `/slots/` - Slots listing
- `/banking/` - Payment methods
- `/software/` - Software providers
- `/reviews/` - Casino reviews index
- `/bonuses/` - Bonuses page

---

## 5. CONTENT COLLECTIONS

### Collections Configuration

**File**: `src/content/config.ts`

### 1. Reviews Collection

**Type**: `content` (MDX files)
**Location**: `src/content/reviews/`

**Schema (Zod):**
```typescript
{
  title: string
  metaDescription: string
  pubDate: date
  updatedDate: date (optional)
  author: string (default: 'Duwayne Cowney')
  rating: number (1-5)
  casinoId: string // Links to DB
  payoutTime: string
  wageringReq: number (optional)
  minDeposit: number (optional)
  pros: array<string> (optional)
  cons: array<string> (optional)
}
```

**Sample Files:**
- `bitstarz-casino.mdx`
- `spin-casino.mdx`
- `woo-casino.mdx`
- `fastpay-casino.mdx`

**MDX Component Imports:**
```mdx
import BonusCard from '../../components/ui/BonusCard.astro';
import WageringCalc from '../../components/interactive/WageringCalc.svelte';
import ProsCons from '../../components/ui/ProsCons.astro';
```

### 2. Guides Collection

**Type**: `content` (MDX files)
**Location**: `src/content/guides/`

**Schema:**
```typescript
{
  title: string
  metaDescription: string
  pubDate: date
  updatedDate: date (optional)
  author: string (default: 'Casinos Canada Team')
  category: string (optional)
}
```

**Sample Files:**
- `how-to-deposit.md`
- `banking.mdx`

### 3. Banking Collection

**Type**: `content` (MDX files)
**Location**: `src/content/banking/`

**Schema:**
```typescript
{
  title: string
  metaDescription: string
  pubDate: date
  updatedDate: date (optional)
  author: string (default: 'Casinos Canada Team')
  paymentId: string // Links to payment_methods.id in DB
}
```

**Sample Files:**
- `interac.mdx`

### Content Strategy (Hybrid Approach)

**Editorial Content (MDX):**
- Long-form reviews
- How-to guides
- Banking method guides
- Storytelling, pros/cons, expert analysis

**Structured Data (SQLite):**
- Casino specifications
- Slot game stats
- Payment method details
- Software provider info
- Relational data (casino → payment methods)

**Linking Strategy:**
- MDX frontmatter contains `casinoId` or `paymentId`
- Page components query DB using these IDs
- Enables dynamic widgets pulling live data

---

## 6. PAGE STRUCTURE & ROUTING

### Static Pages

```
src/pages/
├── index.astro              # Homepage
├── about.astro              # About page
├── terms.astro              # Terms & conditions
├── privacy.astro            # Privacy policy
└── compare.astro            # Casino comparison tool
```

### Dynamic Pages (Collections)

#### Casino Reviews
```
src/pages/reviews/
├── index.astro              # Review listing page
└── [...slug].astro          # Dynamic casino review pages
    Routes: /reviews/bitstarz-casino/
```

#### Guides
```
src/pages/guides/
├── index.astro              # Guides listing
└── [...slug].astro          # Dynamic guide pages
```

#### Slots
```
src/pages/slots/
├── index.astro              # Slots listing (with filter)
└── [...slug].astro          # Individual slot demo pages
    Routes: /slots/snoops-high-rollers/
```

#### Banking
```
src/pages/banking/
├── index.astro              # Payment methods listing
└── [id].astro               # Dynamic payment method pages
    Routes: /banking/interac/
```

#### Software
```
src/pages/software/
├── index.astro              # Software provider listing
└── [...slug].astro          # Dynamic provider pages
    Routes: /software/netent/
```

#### Bonuses
```
src/pages/bonuses/
└── index.astro              # Bonuses page
```

### API Routes

**Search Index:**
```
src/pages/api/search.json.ts
```

- **Type**: JSON API endpoint
- **Method**: GET
- **Returns**: Unified search index
- **Structure**:
  ```json
  [
    { title: "Home", type: "Page", url: "/" },
    { title: "Bitstarz", type: "Casino", url: "/reviews/bitstarz" },
    { title: "Starburst", type: "Slot", url: "/slots/starburst" },
    { title: "Interac", type: "Banking", url: "/banking/interac" }
  ]
  ```
- **Consumed By**: SearchPalette.svelte

### Routing Patterns

**Static Paths Generation:**
```typescript
// Example from slots/[...slug].astro
export async function getStaticPaths() {
  const slots = db.prepare('SELECT * FROM slots').all();
  return slots.map(slot => ({
    params: { slug: slot.slug },
    props: { slot }
  }));
}
```

**URL Structure:**
- All pages have trailing slashes (`trailingSlash: 'always'`)
- Build format: `directory` (creates `/page/index.html`)
- Canonical URLs managed via SEOHead component

---

## 7. KEY ARCHITECTURAL PATTERNS

### A. Islands Architecture Implementation

**Philosophy**: Ship minimal JavaScript, hydrate only interactive components

**Pattern in Use:**
```astro
<!-- Static Astro Component (No JS) -->
<CasinoTopList />

<!-- Svelte Island (Hydrates on Idle) -->
<SearchPalette client:idle />

<!-- Svelte Island (Immediate Load) -->
<SlotFilter client:load allSlots={slots} />

<!-- Svelte Only (No SSR) -->
<ComparisonEngine client:only="svelte" allCasinos={casinos} />
```

**Benefits Observed:**
- Fast initial page load (mostly static HTML)
- Interactive features load progressively
- SEO-friendly (content is in HTML, not JS-rendered)

### B. Data Flow: SQLite → Components → Pages

**Build-Time Data Fetching:**

```astro
---
// 1. Server-Side Query (Build Time)
import { db } from '../db/client';
const casinos = db.prepare('SELECT * FROM casinos').all();

// 2. Enrich with Relations
const payments = db.prepare(`
  SELECT cpm.casino_id, pm.*
  FROM casino_payment_methods cpm
  JOIN payment_methods pm ON cpm.method_id = pm.id
`).all();

// 3. Transform Data
const enrichedCasinos = casinos.map(c => ({
  ...c,
  payments: payments.filter(p => p.casino_id === c.id)
}));
---

<!-- 4. Pass to Component -->
<CasinoList casinos={enrichedCasinos} />
```

**Key Pattern**: "Fetch → Transform → Pass"
- All DB queries happen at build time
- No runtime database access
- Data is serialized into static HTML or passed to islands as props

### C. SEO & Schema.org Integration

**Meta Tags Pattern:**
```astro
<SEOHead
  title="Page Title"
  description="Meta description"
  image="/og-image.jpg"
/>
```

**Schema.org JSON-LD:**

Every major page type includes structured data:

**1. Review Pages:**
```json
{
  "@type": "Review",
  "itemReviewed": { "@type": "Casino", "name": "..." },
  "reviewRating": { "@type": "Rating", "ratingValue": 4.8 },
  "positiveNotes": [...],
  "negativeNotes": [...]
}
```

**2. Slot Pages:**
```json
{
  "@type": "SoftwareApplication",
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0" }
}
```

**3. Software Provider Pages:**
```json
[
  { "@type": "Organization", "name": "NetEnt" },
  { "@type": "FAQPage", "mainEntity": [...] }
]
```

**4. Listing Pages:**
```json
{
  "@type": "CollectionPage",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [...]
  }
}
```

**Implementation:**
```astro
<script type="application/ld+json" slot="head" set:html={JSON.stringify(schema)} />
```

### D. Hybrid Content Strategy

**MDX (Editorial)** + **SQLite (Structured)** = **Powerful Combination**

**Example: Casino Review Page**
```
┌─────────────────────────────────────┐
│  MDX File (bitstarz-casino.mdx)    │
│  - Long-form review text           │
│  - Pros/cons lists                 │
│  - Author commentary               │
│  - Frontmatter: casinoId: 'bitstarz'│
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│  CasinoSpecs Component              │
│  - Queries DB: WHERE id = casinoId │
│  - Displays: license, speed, etc.  │
│  - Shows: payment method logos     │
└─────────────────────────────────────┘
```

**Benefits:**
- Writers focus on content (MDX)
- Developers manage data (DB)
- Easy bulk updates (change DB, rebuild)
- Type-safe with Zod schemas

### E. Component Composition Patterns

**Reusable EntityHero:**
```astro
<!-- Used for Casinos, Slots, Software Providers -->
<EntityHero
  title="Bitstarz Casino"
  subtitle="Licensed by Curacao"
  logoUrl="/images/casinos/logos/bitstarz.png"
  stats={[
    { label: "RTP", value: "97.2%", icon: "📈", color: "text-green-400" },
    { label: "Speed", value: "8 mins", icon: "⚡" }
  ]}
>
  <div slot="action">
    <!-- Custom CTA -->
  </div>
</EntityHero>
```

**Consistent UI Patterns:**
- All cards have hover effects
- Consistent color scheme (Red primary, Slate backgrounds)
- Grayscale → Color transitions on hover
- Shadow elevation on interaction

### F. Performance Optimizations

**1. Image Loading:**
```astro
<img loading="lazy" onerror="this.src='fallback.png'" />
```

**2. Database Optimization:**
- WAL mode enabled for better concurrency
- Prepared statements for all queries
- Strategic indexes (implied by schema design)

**3. Build-Time Pre-rendering:**
- All pages generated at build time
- No server-side rendering at runtime
- CDN-friendly static output

**4. CSS Strategy:**
- Tailwind utility classes (no runtime CSS-in-JS)
- Typography plugin for prose styling
- Minimal custom CSS (only for TOC scroll-spy)

### G. Navigation & Search

**Global Search:**
- Cmd+K shortcut triggers SearchPalette
- Modal fetches `/api/search.json`
- Client-side fuzzy filtering
- Keyboard navigation (↑↓ arrows, Enter)
- Categorized results (Casino, Slot, Banking, Page)

**Breadcrumbs:**
- Semantic navigation trail
- Consistent across all pages
- Schema.org BreadcrumbList (could be added)

**Header Navigation:**
- Sticky positioning
- Desktop: Full nav
- Mobile: Hamburger menu (Svelte island)
- "Compare" CTA button

### H. Comparison Tool Architecture

**Page**: `/compare.astro`
**Component**: `ComparisonEngine.svelte`

**Features:**
- Side-by-side comparison (3 casinos)
- URL state management (?c1=bitstarz&c2=spin&c3=woo)
- Modal selection with search
- Responsive (stacked on mobile, grid on desktop)
- Real-time filtering (excludes already selected)

**Data Flow:**
```
DB Query → Enrich with Relations → Pass to Svelte → Client State Management
```

### I. SEO & GEO (AI Optimization) Features

**1. Semantic HTML:**
- Proper use of `<article>`, `<section>`, `<aside>`
- Heading hierarchy (H1 → H2 → H3)
- Definition lists (`<dl>`) for specs

**2. Entity Linking:**
- Internal links connect related entities
- Example: "Bitstarz" review links to "Interac" banking page
- Software provider pages link to casinos offering their games

**3. FAQ Sections:**
- `<details>` elements for expandable FAQs
- FAQPage schema on relevant pages
- Conversational question format

**4. Rich Data Tables:**
- CasinoTopList has structured comparison data
- Clear column headers
- Accessible markup

**5. Breadcrumbs & Navigation:**
- Clear site structure
- Logical content hierarchy
- Easy crawlability

---

## SUMMARY

This is a **highly sophisticated, SEO-optimized casino affiliate website** built with modern web technologies:

### Strengths

1. **Performance**: Static generation with minimal JavaScript
2. **SEO**: Comprehensive schema.org implementation, semantic HTML
3. **Data Architecture**: Smart hybrid of MDX (editorial) + SQLite (structured)
4. **User Experience**: Interactive islands for filtering, search, comparison
5. **Developer Experience**: Type-safe with Zod, clear separation of concerns
6. **Scalability**: Easy to add new casinos, slots, payment methods via DB
7. **AI Readiness**: Rich structured data, clear entity relationships, FAQ content

### Technology Choices Align with Goals

- Astro 5 for HTML-first architecture ✓
- Svelte for minimal interactive islands ✓
- Tailwind for rapid UI development ✓
- SQLite for relational data without a server ✓
- MDX for content flexibility ✓

### Current Status

**Fully functional** with:
- 4 casinos
- 4 slots
- 8 software providers
- 6 payment methods

**Ready for:**
- Content expansion via DB seeding + MDX files
- Deployment to production
- SEO optimization and indexing

---

**Document Version**: 1.0
**Last Updated**: 2025-12-12
**Maintained By**: Development Team
