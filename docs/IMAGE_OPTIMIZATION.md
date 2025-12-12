# Image Optimization Guide

## Overview

This project uses a hybrid approach to image optimization:

1. **Local Images** → Astro's `Image` component (automatic WebP/AVIF conversion, responsive images)
2. **External Images** → Optimized `<img>` tags with lazy loading and error handling

## Why Hybrid?

Most images in this project come from **external URLs stored in the database** (casino logos, payment method logos, slot thumbnails). Astro cannot optimize external URLs at build time, so we use native `<img>` tags with best practices.

## Components

### OptimizedImage Component

**Location**: `src/components/common/OptimizedImage.astro`

Smart component that automatically chooses the right rendering method:

```astro
---
import OptimizedImage from '../components/common/OptimizedImage.astro';
---

<!-- Local Image (Gets optimized by Astro) -->
<OptimizedImage
  src="/images/hero-banner.jpg"
  alt="Casino banner"
  width={1200}
  height={600}
/>

<!-- External Image (Native <img> with best practices) -->
<OptimizedImage
  src={casino.logo_url}
  alt={casino.name}
  external
  fallback="/images/fallback-logo.png"
  width={200}
  height={100}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string \| null` | required | Image source URL |
| `alt` | `string` | required | Alt text for accessibility |
| `width` | `number` | optional | Image width |
| `height` | `number` | optional | Image height |
| `class` | `string` | `''` | CSS classes |
| `loading` | `'lazy' \| 'eager'` | `'lazy'` | Loading strategy |
| `external` | `boolean` | `false` | Force native `<img>` (for external URLs) |
| `fallback` | `string` | optional | Fallback image if src fails |
| `objectFit` | `'contain' \| 'cover' \| ...` | `'contain'` | Object-fit CSS property |

## Best Practices

### 1. Always Provide Alt Text

```astro
<!-- ❌ Bad -->
<OptimizedImage src={logo} alt="" />

<!-- ✅ Good -->
<OptimizedImage src={logo} alt="Bitstarz Casino logo" />
```

### 2. Use Lazy Loading (Except Above-the-Fold)

```astro
<!-- Above the fold (hero images) -->
<OptimizedImage src={hero} alt="Hero" loading="eager" />

<!-- Below the fold (everything else) -->
<OptimizedImage src={thumbnail} alt="Thumbnail" loading="lazy" />
```

### 3. Provide Fallback Images

```astro
<OptimizedImage
  src={casino.logo_url}
  alt={casino.name}
  fallback="/images/casino-placeholder.png"
  external
/>
```

### 4. Use Proper Sizing

Always specify width/height when known to prevent layout shift:

```astro
<OptimizedImage
  src={logo}
  alt="Logo"
  width={120}
  height={60}
/>
```

## Current Status

### Database Images (External URLs)

These images are currently **NOT optimized** because they're external URLs:

- ✗ Casino logos (`casinos.logo_url`)
- ✗ Casino thumbnails (`casinos.thumbnail_url`)
- ✗ Software provider logos (`software_providers.logo_url`)
- ✗ Payment method logos (`payment_methods.logo_url`)
- ✗ Slot images (`slots.image_url`)

**Why?** Astro's Image component only works with local files at build time.

**Solution Options:**

1. **Download images at build time** (seed script downloads to `public/images/`)
2. **Use a CDN proxy** (e.g., Cloudflare Images, imgix)
3. **Accept current state** (external `<img>` tags with lazy loading)

### Local Images (Can Be Optimized)

These images CAN be optimized with Astro's Image component:

- ✓ Static assets in `/public/images/`
- ✓ Hero banners
- ✓ Social share images
- ✓ Favicons

## Migration Checklist

To migrate existing `<img>` tags to `OptimizedImage`:

```astro
<!-- BEFORE -->
<img
  src={casino.logo_url}
  alt={casino.name}
  class="w-24 h-24"
  loading="lazy"
  onerror="this.style.display='none'"
/>

<!-- AFTER -->
<OptimizedImage
  src={casino.logo_url}
  alt={casino.name}
  class="w-24 h-24"
  width={96}
  height={96}
  external
  fallback="/images/casino-placeholder.png"
/>
```

## Future Improvements

1. **Build-Time Image Download**: Modify `src/db/seed.ts` to download external images
2. **Image CDN Integration**: Use Cloudflare Images or imgix for external URL optimization
3. **WebP/AVIF Conversion**: Convert all local images to modern formats
4. **Responsive Images**: Generate multiple sizes for different screen sizes
5. **Blur Placeholder**: Add low-quality image placeholders (LQIP) for better UX

## Resources

- [Astro Image Documentation](https://docs.astro.build/en/guides/images/)
- [Web.dev: Optimize Images](https://web.dev/fast/#optimize-your-images)
- [MDN: Lazy Loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading)
