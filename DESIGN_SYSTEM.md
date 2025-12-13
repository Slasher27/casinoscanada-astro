# Casinos Canada - Design System Documentation

**Version:** 1.0
**Last Updated:** December 13, 2025
**Philosophy:** Minimalist, consistent, mobile-first

---

## Table of Contents

1. [Overview](#overview)
2. [Design Tokens](#design-tokens)
3. [Components](#components)
4. [Usage Examples](#usage-examples)
5. [Best Practices](#best-practices)

---

## Overview

The Casinos Canada design system provides a unified, minimalist visual language across the entire application. All UI patterns use semantic design tokens defined in `tailwind.config.mjs`, ensuring consistency and making global design changes simple.

### Core Principles

- **Minimalist**: Clean, professional aesthetic with purposeful use of color and shadow
- **Consistent**: All similar UI elements share the same styling
- **Mobile-First**: Responsive by default with mobile-optimized spacing and typography
- **Semantic**: Color and spacing tokens have clear, descriptive names

---

## Design Tokens

All design tokens are defined in `tailwind.config.mjs`. Use these semantic tokens instead of arbitrary Tailwind classes.

### Colors

#### Primary (Slate)
Professional, neutral color for text and backgrounds.

```css
primary-50   // #f8fafc - Lightest backgrounds
primary-100  // #f1f5f9 - Card hover states
primary-200  // #e2e8f0 - Borders, dividers
primary-300  // #cbd5e1 - Disabled states
primary-600  // #475569 - Secondary text
primary-700  // #334155 - Primary text (dark)
primary-900  // #0f172a - Headings, hero sections
```

**Usage:**
- Text: `text-primary-900` (headings), `text-primary-700` (body), `text-primary-600` (secondary)
- Backgrounds: `bg-primary-50` (cards), `bg-primary-900` (hero sections)
- Borders: `border-primary-200`

#### Accent (Red)
Use ONLY for CTAs and primary actions.

```css
accent-50   // #fef2f2 - Light backgrounds
accent-100  // #fee2e2 - Hover backgrounds
accent-600  // #dc2626 - Primary CTAs
accent-700  // #b91c1c - CTA hover states
```

**Usage:**
- Buttons: `bg-accent-600 hover:bg-accent-700`
- Highlights: `text-accent-600`

#### Success (Green)
Positive indicators like RTP, licenses, verification.

```css
success-50   // #f0fdf4 - Light backgrounds
success-100  // #dcfce7 - Borders
success-600  // #16a34a - Text, icons
success-700  // #15803d - Hover states
```

**Usage:**
- Badges: `bg-success-50 text-success-700`
- Icons/Text: `text-success-600`

#### Bonus (Yellow)
Bonus offers and highlights only.

```css
bonus-50   // #fefce8 - Light backgrounds
bonus-100  // #fef9c3 - Borders
bonus-400  // #facc15 - Badges, highlights
bonus-700  // #a16207 - Dark text
```

**Usage:**
- Bonus boxes: `bg-bonus-50 border-bonus-100 text-bonus-700`
- Rating badges: `bg-bonus-400 text-black`

#### Info (Blue)
Links and informational elements (minimal use).

```css
info-50   // #eff6ff - Light backgrounds
info-100  // #dbeafe - Borders
info-600  // #2563eb - Links, info text
info-700  // #1d4ed8 - Hover states
```

**Usage:**
- Links: `text-info-600 hover:text-info-700`

---

### Spacing

#### Card Padding

```css
p-card-sm  // 16px (p-4) - Compact cards
p-card     // 20px (p-5) - Standard card padding (DEFAULT)
p-card-lg  // 24px (p-6) - Spacious cards
```

**Usage:**
```astro
<div class="p-card">Standard padding</div>
<div class="p-card-lg">Extra padding for hero cards</div>
```

#### Button Padding

Handled automatically by the `<Button>` component via size prop.

```css
btn-sm: py-2 px-4   // Small buttons
btn-md: py-3 px-6   // Medium buttons (DEFAULT)
btn-lg: py-4 px-8   // Large buttons (hero CTAs)
```

---

### Border Radius

```css
rounded-card         // 12px - All cards
rounded-btn          // 8px - Secondary buttons
rounded-btn-primary  // 9999px (full) - Primary CTA buttons
rounded-badge        // 9999px (full) - Badges and pills
```

**Usage:**
```astro
<div class="rounded-card">Card content</div>
<div class="rounded-btn">Button</div>
<span class="rounded-badge">Badge</span>
```

---

### Shadows

```css
shadow-card         // Subtle shadow for cards (default)
shadow-card-hover   // Elevated shadow on hover
shadow-button       // Medium shadow for buttons
```

**Usage:**
```astro
<div class="shadow-card hover:shadow-card-hover">Hover effect</div>
<button class="shadow-button">Button with shadow</button>
```

---

### Typography

Typography uses a mobile-first approach with responsive scaling.

#### Headings

```css
// Hero headings (h1 on homepage)
text-hero md:text-hero-lg       // 36px → 60px, font-black

// Page headings (h1 on content pages)
text-heading-1 md:text-heading-1-lg  // 30px → 36px, font-bold

// Section headings (h2)
text-heading-2 md:text-heading-2-lg  // 24px → 30px, font-bold

// Subsection headings (h3)
text-heading-3 md:text-heading-3-lg  // 20px → 24px, font-semibold

// Card titles
text-card-title                 // 18px, font-bold

// Body text
text-body      // 16px, leading-relaxed
text-body-sm   // 14px
```

**Usage with Heading component:**
```astro
<Heading level={1} as="hero">Hero Title</Heading>
<Heading level={2} as="h2">Section Title</Heading>
<Heading level={3} as="card-title">Card Title</Heading>
```

---

## Components

### Button Component

**Location:** `src/components/ui/Button.astro`

#### Props

```typescript
variant?: 'primary' | 'secondary' | 'outline' | 'link'  // Default: 'primary'
size?: 'sm' | 'md' | 'lg'                               // Default: 'md'
href: string                                             // Required
external?: boolean                                       // Auto-detected from href
fullWidth?: boolean                                      // Make button full width on mobile
class?: string                                           // Additional classes
```

#### Variants

**Primary** - Solid red background with rounded-full (pill shape)
- Use for: "Play Now", "Claim Bonus", main CTAs

**Secondary** - White background with border
- Use for: "Read Review", secondary actions

**Outline** - Transparent with white border
- Use for: Light-on-dark contexts

**Link** - Text-only link style
- Use for: "View All", navigation links

#### Examples

```astro
<!-- Hero CTA -->
<Button href="/casinos/" variant="primary" size="lg">
  Play Now
</Button>

<!-- Secondary action -->
<Button href="/reviews/bitstarz/" variant="secondary" size="md">
  Read Review
</Button>

<!-- Navigation link -->
<Button href="/slots/" variant="link">
  View All Slots →
</Button>

<!-- Full width on mobile -->
<Button href="/signup/" variant="primary" fullWidth>
  Get Started
</Button>
```

---

### Badge Component

**Location:** `src/components/ui/Badge.astro`

#### Props

```typescript
variant?: 'bonus' | 'success' | 'info' | 'accent' | 'neutral'  // Default: 'neutral'
size?: 'sm' | 'md' | 'lg'                                      // Default: 'md'
rounded?: 'full' | 'md'                                        // Default: 'full'
border?: boolean                                               // Default: true
class?: string
```

#### Examples

```astro
<!-- Bonus badge -->
<Badge variant="bonus" size="sm">
  ★ 4.8/5
</Badge>

<!-- License badge -->
<Badge variant="success" size="sm">
  Curacao Licensed
</Badge>

<!-- Info badge (no border) -->
<Badge variant="info" size="sm" border={false}>
  📈 96.5% RTP
</Badge>

<!-- Feature tag -->
<Badge variant="neutral" size="md">
  New Casino
</Badge>
```

---

### Card Component

**Location:** `src/components/ui/Card.astro`

#### Props

```typescript
padding?: 'sm' | 'md' | 'lg'         // Default: 'md'
shadow?: 'none' | 'sm' | 'md'        // Default: 'sm'
border?: boolean                     // Default: true
hover?: boolean                      // Enable hover lift effect
class?: string
```

#### Slots

- **default** - Main card content
- **header** - Optional header section
- **footer** - Optional footer section (auto-styled with border-top)

#### Examples

```astro
<!-- Standard card -->
<Card>
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>

<!-- Card with header and footer -->
<Card padding="lg" hover>
  <div slot="header">
    <img src="/logo.png" alt="Logo" />
  </div>

  <h3>Card Title</h3>
  <p>Content goes here</p>

  <div slot="footer">
    <Button variant="primary" href="/link/">Action</Button>
  </div>
</Card>
```

---

### Heading Component

**Location:** `src/components/ui/Heading.astro`

#### Props

```typescript
level: 1 | 2 | 3 | 4 | 5 | 6           // Required - Semantic HTML level
as?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'card-title'  // Visual style
class?: string
```

#### Examples

```astro
<!-- Hero heading (visually large, semantically h1) -->
<Heading level={1} as="hero">
  Welcome to Casinos Canada
</Heading>

<!-- Page title -->
<Heading level={1} as="h1">
  Casino Reviews
</Heading>

<!-- Section heading -->
<Heading level={2} as="h2">
  Top Casinos
</Heading>

<!-- Card title (semantic h3, styled as card-title) -->
<Heading level={3} as="card-title">
  Bitstarz Casino
</Heading>
```

---

## Usage Examples

### Casino Card Layout

```astro
---
import Button from '../components/ui/Button.astro';
import Badge from '../components/ui/Badge.astro';
import Heading from '../components/ui/Heading.astro';
---

<div class="bg-white rounded-card shadow-card border border-primary-200 p-card">
  <Heading level={3} as="card-title" class="mb-2">
    {casino.name}
  </Heading>

  <div class="flex gap-2 mb-4">
    <Badge variant="bonus" size="sm">★ {rating}/5</Badge>
    <Badge variant="success" size="sm">{license}</Badge>
  </div>

  <p class="text-sm text-primary-600 mb-4">
    {description}
  </p>

  <div class="flex gap-2">
    <Button href={`/reviews/${slug}/`} variant="secondary" size="sm">
      Read Review
    </Button>
    <Button href={websiteUrl} variant="primary" size="sm">
      Play Now
    </Button>
  </div>
</div>
```

### Hero Section

```astro
<section class="bg-primary-900 text-white py-16 md:py-24">
  <div class="container mx-auto px-4">
    <Heading level={1} as="hero" class="mb-6">
      Find Canada's Best Online Casinos
    </Heading>

    <p class="text-xl mb-8 max-w-2xl">
      Honest reviews, fast payouts, and exclusive bonuses.
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <Button href="/reviews/" variant="primary" size="lg">
        See Top Picks
      </Button>
      <Button href="/bonuses/" variant="outline" size="lg">
        View Bonuses
      </Button>
    </div>
  </div>
</section>
```

---

## Best Practices

### 1. Use Semantic Tokens, Not Raw Classes

❌ **Don't:**
```astro
<div class="bg-red-600 hover:bg-red-700">...</div>
<div class="rounded-xl shadow-sm">...</div>
```

✅ **Do:**
```astro
<Button variant="primary">...</Button>
<div class="rounded-card shadow-card">...</div>
```

### 2. Consistent Component Usage

Always use design system components for buttons and badges instead of custom markup.

❌ **Don't:**
```astro
<a href="/link/" class="bg-red-600 py-3 px-8 rounded-full">
  Click Me
</a>
```

✅ **Do:**
```astro
<Button href="/link/" variant="primary" size="md">
  Click Me
</Button>
```

### 3. Mobile-First Responsive Design

Always think mobile-first. Use responsive modifiers (`sm:`, `md:`, `lg:`) to enhance for larger screens.

```astro
<!-- Button: Full width on mobile, auto width on tablet+ -->
<Button href="/link/" variant="primary" fullWidth>
  Get Started
</Button>

<!-- Heading: Smaller on mobile, larger on desktop -->
<Heading level={1} as="hero">
  Title Text
</Heading>
```

### 4. Color Usage Guidelines

- **Primary (Slate)**: Use for all text, backgrounds, borders by default
- **Accent (Red)**: ONLY for CTAs and primary actions
- **Success (Green)**: Positive indicators (RTP, licenses, verified)
- **Bonus (Yellow)**: Bonus offers only
- **Info (Blue)**: Links and informational elements (minimal)

### 5. Spacing Consistency

- Use `p-card` (20px) for standard card padding
- Use `gap-4` (16px) or `gap-6` (24px) for flex/grid gaps
- Avoid arbitrary spacing values

### 6. Shadow Hierarchy

- Cards: `shadow-card` default, `shadow-card-hover` on hover
- Buttons: `shadow-button` for primary CTAs
- Avoid stacking multiple shadows

### 7. Border Radius

- Cards: Always `rounded-card`
- Primary Buttons: Always `rounded-btn-primary` (handled by component)
- Secondary Buttons: Always `rounded-btn` (handled by component)
- Badges: Always `rounded-badge`

---

## Quick Reference

### Common Patterns

| Element | Classes |
|---------|---------|
| Standard Card | `bg-white rounded-card shadow-card border border-primary-200 p-card` |
| Hero Section | `bg-primary-900 text-white py-16 md:py-24` |
| Light Background | `bg-primary-50` |
| Divider | `border-t border-primary-200` |
| Secondary Text | `text-sm text-primary-600` |
| Card Title | `<Heading level={3} as="card-title">` |

---

## Migration Notes

When updating existing components:

1. Replace color classes (`bg-red-600` → `bg-accent-600`, `text-gray-600` → `text-primary-600`)
2. Replace border radius (`rounded-xl` → `rounded-card`)
3. Replace shadows (`shadow-sm` → `shadow-card`)
4. Replace buttons with `<Button>` component
5. Replace badges with `<Badge>` component
6. Replace headings with `<Heading>` component where appropriate

---

## Support

For questions or clarifications about the design system, refer to:
- `tailwind.config.mjs` - Design token definitions
- `src/components/ui/` - Component implementations
- `CLAUDE.md` - Project guidelines and standards

**Version History:**
- v1.0 (2025-12-13) - Initial design system implementation
