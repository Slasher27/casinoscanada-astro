/**
 * Script to convert casino data from database to MDX frontmatter
 * Run: npx tsx scripts/convertReviewsToMDX.ts
 */

import { db } from '../src/db/client';
import fs from 'fs';
import path from 'path';

// Casino database data
const casinos = [
  {
    id: 'spin',
    payment_methods: ['interac', 'visa', 'mastercard', 'idebit'],
    software_providers: ['microgaming', 'evolution', 'pragmatic', 'netent'],
  },
  {
    id: 'woo',
    payment_methods: ['bitcoin', 'interac', 'visa'],
    software_providers: ['netent', 'evolution', 'pragmatic'],
  },
  {
    id: 'fastpay',
    payment_methods: ['bitcoin', 'interac', 'muchbetter'],
    software_providers: ['pragmatic', 'netent', 'evolution', 'microgaming'],
  },
  {
    id: 'bodog',
    payment_methods: ['bitcoin', 'interac', 'visa', 'mastercard'],
    software_providers: ['pragmatic', 'netent', 'evolution', 'microgaming'],
  },
];

casinos.forEach((casinoRelations) => {
  // Get casino data from database
  const casino = db
    .prepare('SELECT * FROM casinos WHERE id = ?')
    .get(casinoRelations.id) as any;

  if (!casino) {
    console.log(`⚠️  Casino ${casinoRelations.id} not found in database`);
    return;
  }

  const reviewPath = path.join(
    process.cwd(),
    `src/content/reviews/${casino.id}-casino.mdx`
  );

  if (!fs.existsSync(reviewPath)) {
    console.log(`⚠️  Review file not found: ${reviewPath}`);
    return;
  }

  // Read existing content
  const existingContent = fs.readFileSync(reviewPath, 'utf-8');
  const contentMatch = existingContent.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);

  if (!contentMatch) {
    console.log(`⚠️  Could not parse frontmatter in ${reviewPath}`);
    return;
  }

  const existingBody = contentMatch[2];

  // Parse existing frontmatter to get title and meta
  const titleMatch = existingContent.match(/title:\s*['"]([^'"]+)['"]/);
  const metaMatch = existingContent.match(/metaDescription:\s*['"]([^'"]+)['"]/);
  const cardTextMatch = existingContent.match(/casinoCardText:\s*['"]([^'"]+)['"]/);
  const pubDateMatch = existingContent.match(/pubDate:\s*([^\n]+)/);

  // Parse JSON arrays from database
  const pros = JSON.parse(casino.pros || '[]');
  const cons = JSON.parse(casino.cons || '[]');

  // Create new frontmatter
  const newFrontmatter = `---
# Core SEO Fields
title: ${titleMatch ? `'${titleMatch[1]}'` : `'${casino.name} Review Canada 2025'`}
metaDescription: ${metaMatch ? `'${metaMatch[1]}'` : `'Complete review of ${casino.name} - bonuses, games, and banking options'`}
casinoCardText: ${cardTextMatch ? `'${cardTextMatch[1]}'` : `'${casino.name} casino review'`}

# Publishing Info
pubDate: ${pubDateMatch ? pubDateMatch[1] : '2025-01-15'}
author: 'Casinos Canada Team'

# Casino Identification
casinoId: '${casino.id}'
name: '${casino.name}'
website: '${casino.website_url}'

# Basic Info
established: ${casino.established}
license: '${casino.license}'
owner: '${casino.owner || 'Unknown'}'

# Performance Metrics
withdrawal_speed: ${casino.payout_speed_minutes}
rtp: ${casino.payout_ratio}
rating: ${casino.rating}

# Visual Assets
theme_color: '${casino.theme_color}'
logo: '${casino.logo_url}'
thumbnail: '${casino.thumbnail_url}'

# Bonus Information
bonus_offer: '${casino.bonus_offer}'
bonus_spins: ${casino.bonus_spins}
min_deposit: ${casino.min_deposit}
wagering: ${casino.wagering_requirement}

# Feature Flags
sports_betting: ${casino.sports_betting === 1}
poker: ${casino.poker === 1}
live_casino: ${casino.live_casino === 1}
mobile_app: ${casino.mobile_app === 1}

# Review Content
pros:
${pros.map((pro: string) => `  - '${pro.replace(/'/g, "\\'")}'`).join('\n')}
cons:
${cons.map((con: string) => `  - '${con.replace(/'/g, "\\'")}'`).join('\n')}

# Relationships
payment_methods:
${casinoRelations.payment_methods.map((pm: string) => `  - ${pm}`).join('\n')}

software_providers:
${casinoRelations.software_providers.map((sp: string) => `  - ${sp}`).join('\n')}
---
`;

  // Write new file
  const newContent = newFrontmatter + existingBody;
  fs.writeFileSync(reviewPath, newContent);

  console.log(`✅ Converted ${casino.id}-casino.mdx`);
});

console.log('\n🎉 Conversion complete!');
