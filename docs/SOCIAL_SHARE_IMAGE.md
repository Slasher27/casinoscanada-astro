# Social Share Image Setup

## Current Status

✅ **Default OG image created**: `public/images/social-share-default.svg`

⚠️ **Action Required**: Convert SVG to PNG for better social media compatibility.

## Why PNG Instead of SVG?

While the SVG file works in browsers, most social media platforms (Facebook, Twitter, LinkedIn) prefer PNG or JPG formats for Open Graph images. They may not render SVG files correctly.

## Recommended Image Specs

### Open Graph (Facebook, LinkedIn)
- **Size**: 1200 x 630 px
- **Format**: PNG or JPG
- **Max File Size**: 8 MB
- **Aspect Ratio**: 1.91:1

### Twitter Card
- **Size**: 1200 x 628 px
- **Format**: PNG, JPG, or WebP
- **Max File Size**: 5 MB

## How to Convert SVG to PNG

### Option 1: Online Converter
1. Visit https://cloudconvert.com/svg-to-png
2. Upload `public/images/social-share-default.svg`
3. Set dimensions to 1200 x 630
4. Download as `social-share-default.png`
5. Replace the SVG file (or keep both)

### Option 2: Using ImageMagick (CLI)
```bash
convert -background none -size 1200x630 public/images/social-share-default.svg public/images/social-share-default.png
```

### Option 3: Using Node.js (Sharp)
```bash
npm install sharp
```

```javascript
// scripts/convert-og-image.js
import sharp from 'sharp';
import { readFileSync } from 'fs';

const svg = readFileSync('public/images/social-share-default.svg');

await sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile('public/images/social-share-default.png');

console.log('✓ OG image converted to PNG');
```

Run with: `node scripts/convert-og-image.js`

### Option 4: Using Figma/Canva
1. Import the SVG into Figma or Canva
2. Adjust if needed
3. Export as PNG (1200 x 630)

## Custom Social Share Images

For specific pages (casino reviews, slots, etc.), create custom OG images:

### Casino Review Pages
```astro
---
// src/pages/reviews/[...slug].astro
const ogImage = `/images/casinos/${casino.id}-og.png`;
---

<SEOHead
  title={frontmatter.title}
  description={frontmatter.metaDescription}
  image={ogImage}
/>
```

### Generating Dynamic OG Images

Consider using:
- **Vercel OG Image Generation**: https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation
- **Satori**: https://github.com/vercel/satori (React → PNG)
- **Puppeteer**: Render HTML templates to images at build time

## Testing Social Share Images

### Tools
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

### Quick Test
```bash
# Check if image exists
curl -I https://casinoscanada.online/images/social-share-default.png

# Validate Open Graph tags
curl -s https://casinoscanada.online | grep "og:image"
```

## Current Implementation

The `SEOHead.astro` component uses:

```astro
image = '/images/social-share-default.jpg'
```

**Note**: You need to either:
1. Rename the SVG/PNG to `.jpg`, OR
2. Update `SEOHead.astro` to use `.png` or `.svg`

## Recommended File Structure

```
public/images/
├── social-share-default.png     # Main OG image (1200x630)
├── social-share-default.svg     # Source file (keep for editing)
├── casinos/
│   ├── bitstarz-og.png
│   ├── spin-og.png
│   └── ...
├── slots/
│   ├── starburst-og.png
│   └── ...
└── guides/
    ├── banking-og.png
    └── ...
```

## Priority Actions

1. **[HIGH]** Convert SVG to PNG (1200 x 630)
2. **[HIGH]** Update `SEOHead.astro` to reference correct filename
3. **[MEDIUM]** Test image on Facebook/Twitter debugger
4. **[MEDIUM]** Create custom OG images for top 10 casinos
5. **[LOW]** Implement dynamic OG image generation at build time

## Example OG Tags Output

```html
<meta property="og:image" content="https://casinoscanada.online/images/social-share-default.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:alt" content="Casinos Canada - Top-Rated Online Casinos" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://casinoscanada.online/images/social-share-default.png" />
```
