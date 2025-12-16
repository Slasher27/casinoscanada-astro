# Project Cleanup Plan

**Date**: 2025-12-12
**Purpose**: Remove unused files, components, and assets to streamline the codebase

---

## Summary

Total files to remove: **7 files**
- 3 unused components (HIGH priority)
- 1 unused image (HIGH priority)
- 1 MDX draft (MEDIUM priority - review first)
- 1 unused utility component (MEDIUM priority - decision needed)
- 1 unused generic component (LOW priority - keep for now)

**Dependencies**: All dependencies are used and necessary ✅

---

## HIGH PRIORITY - Safe to Delete (4 files)

These files are confirmed unused and can be safely deleted:

### 1. Unused UI Components (3 files)

#### `src/components/ui/BankingStats.astro`
- **Status**: Not imported anywhere
- **Impact**: None
- **Action**: DELETE
- **Reason**: Banking pages have inline stats instead

#### `src/components/ui/BankingFAQ.astro`
- **Status**: Not imported anywhere
- **Impact**: None
- **Action**: DELETE
- **Reason**: Banking pages don't use this FAQ component

#### `src/components/mdx/ProseTable.astro`
- **Status**: Not imported anywhere
- **Impact**: None
- **Action**: DELETE
- **Reason**: MDX files use plain markdown tables

### 2. Unused Image (1 file)

#### `public/images/software/pragmatic-play.png`
- **Status**: Duplicate/incorrect filename
- **Impact**: None
- **Action**: DELETE
- **Reason**: Database uses `pragmatic.png` instead (seed.ts:99)

---

## MEDIUM PRIORITY - Review Before Deleting (2 files)

### 1. OptimizedImage Component

#### `src/components/common/OptimizedImage.astro`
- **Status**: Not currently used
- **Created**: As part of HIGH PRIORITY improvements
- **Purpose**: Smart image wrapper with Astro Image integration
- **Documentation**: Documented in `docs/IMAGE_OPTIMIZATION.md`

**Options:**
- **Option A: KEEP** - If you plan to refactor images to use this component
- **Option B: DELETE** - If you're okay with using plain `<img>` tags

**Recommendation**: KEEP for now. This is a well-designed component that could be useful for future image optimization. It was created as part of the HIGH priority improvements but not yet implemented throughout the codebase.

### 2. Guide Draft

#### `src/content/guides/how-to-deposit.md`
- **Status**: Minimal content (10 lines)
- **Impact**: Processed by content collection but not linked
- **Action**: REVIEW FIRST

**Content preview:**
```markdown
---
title: 'How to Deposit at Online Casinos'
metaDescription: '...'
pubDate: 2025-01-02
---
# How to Deposit at Online Casinos
Quick guide on deposits...
```

**Options:**
- **Option A: DELETE** - If this is an abandoned draft
- **Option B: COMPLETE** - If you plan to finish this guide
- **Option C: KEEP** - If it's intentionally minimal

**Recommendation**: DELETE if abandoned, or complete if planned.

---

## LOW PRIORITY - Keep (1 file)

### Generic Component for Future Use

#### `src/components/ui/CasinoCard.astro`
- **Status**: Not currently used
- **Purpose**: Generic casino card component
- **Recommendation**: KEEP
- **Reason**: May be useful for future features or alternative layouts

---

## Dependencies Analysis ✅

All dependencies in `package.json` are actively used:

### Production Dependencies (All Used)
- ✅ `@astrojs/mdx` - Used for all review/guide content
- ✅ `@astrojs/sitemap` - Configured in astro.config.mjs
- ✅ `@astrojs/svelte` - Used for all interactive components
- ✅ `@astrojs/tailwind` - Used for all styling
- ✅ `@tailwindcss/vite` - Required by Tailwind v4
- ✅ `astro` - Core framework
- ✅ `better-sqlite3` - Used for database
- ✅ `svelte` - Used for islands (SearchPalette, SlotFilter, etc.)
- ✅ `tailwindcss` - Used throughout
- ✅ `typescript` - Used for type checking

### Dev Dependencies (All Used)
- ✅ `@tailwindcss/typography` - Used for prose styling (MDX content)
- ✅ `@types/better-sqlite3` - TypeScript types for database
- ✅ `tsx` - Used in seed script

**Result**: No unused dependencies to remove! 🎉

---

## Additional Cleanup Opportunities

### Documentation Files (Keep All)
- ✅ `ARCHITECTURE.md` - Essential reference
- ✅ `HIGH_PRIORITY_IMPROVEMENTS.md` - Change log
- ✅ `MEDIUM_PRIORITY_IMPROVEMENTS.md` - Change log
- ✅ `CLAUDE.md` - Project instructions
- ✅ `docs/IMAGE_OPTIMIZATION.md` - Technical docs
- ✅ `docs/SOCIAL_SHARE_IMAGE.md` - Technical docs
- ✅ `CLEANUP_PLAN.md` - This file

### Configuration Files (Keep All)
- ✅ `astro.config.mjs`
- ✅ `tailwind.config.mjs`
- ✅ `tsconfig.json`
- ✅ `package.json`

### Database Files (Keep All)
- ✅ `src/db/client.ts`
- ✅ `src/db/queries.ts`
- ✅ `src/db/seed.ts`
- ✅ `src/db/schema.sql`
- ✅ `local.db` (generated, not in git)

---

## Execution Plan

### Phase 1: High Priority Deletions (Safe)

```bash
# Delete unused UI components
rm src/components/ui/BankingStats.astro
rm src/components/ui/BankingFAQ.astro
rm src/components/mdx/ProseTable.astro

# Delete duplicate image
rm public/images/software/pragmatic-play.png
```

**Expected impact**: None - these files are not referenced anywhere

### Phase 2: Medium Priority Review

**Before deleting, make decisions on:**

1. **OptimizedImage.astro**
   - [ ] Decision: Keep or Delete?
   - [ ] If Keep: Plan to implement across site
   - [ ] If Delete: Remove docs reference

2. **how-to-deposit.md**
   - [ ] Decision: Delete, Complete, or Keep?
   - [ ] If Complete: Add content and link from guides index
   - [ ] If Delete: Remove from content collection

### Phase 3: Verification

After cleanup:
```bash
# Run build to ensure nothing broke
npm run build

# Check for any broken imports
npm run dev
```

---

## Before & After Comparison

### Before Cleanup
```
src/components/
├── common/
│   ├── OptimizedImage.astro (unused)
│   └── ... (8 used files)
├── ui/
│   ├── BankingStats.astro (unused)
│   ├── BankingFAQ.astro (unused)
│   ├── CasinoCard.astro (unused but keeping)
│   └── ... (9 used files)
├── mdx/
│   └── ProseTable.astro (unused)
└── ... (other folders)

public/images/software/
├── pragmatic-play.png (unused duplicate)
└── ... (8 used images)

src/content/guides/
├── how-to-deposit.md (minimal draft)
└── ... (1 used guide)
```

### After Cleanup (Recommended)
```
src/components/
├── common/
│   ├── OptimizedImage.astro (keeping for future use)
│   └── ... (8 used files)
├── ui/
│   ├── CasinoCard.astro (keeping for future use)
│   └── ... (9 used files)
├── mdx/
│   └── (folder removed - no files)
└── ... (other folders)

public/images/software/
└── ... (8 used images)

src/content/guides/
└── ... (1 used guide OR 2 if keeping how-to-deposit)
```

---

## Estimated Impact

### Storage Savings
- **Total file size**: ~50KB (minimal)
- **More important**: Improved code navigation and reduced cognitive load

### Build Performance
- **Impact**: Negligible (Astro only builds referenced files)
- **Benefit**: Cleaner dist folder

### Developer Experience
- **Before**: 7 unused files causing confusion
- **After**: Clean codebase with only active files
- **Benefit**: Easier to navigate and understand project structure

---

## Recommendations

### Immediate Actions (HIGH priority)
✅ **Delete** the 4 files marked as "Safe to Delete"
- They have zero impact and clean up the codebase

### Decision Needed (MEDIUM priority)
🤔 **Decide** on OptimizedImage.astro
- Keep if you plan to optimize images project-wide
- Delete if you're happy with current image approach

🤔 **Decide** on how-to-deposit.md
- Complete it if it's planned content
- Delete it if it's an abandoned draft

### Future Considerations (LOW priority)
📝 **Consider** using CasinoCard.astro
- Currently kept for future use
- Could replace inline card markup in some places

---

## Post-Cleanup Checklist

After running deletions:

- [ ] Run `npm run build` successfully
- [ ] Verify site loads in `npm run dev`
- [ ] Check that all pages render correctly
- [ ] Verify images load (especially software provider logos)
- [ ] Test search functionality
- [ ] Test comparison tool
- [ ] Check that no 404s occur
- [ ] Review git diff to confirm only intended files deleted

---

## Git Commands

### To review changes before committing:
```bash
git status
git diff
```

### To commit cleanup:
```bash
git add -A
git commit -m "chore: remove unused components and assets

- Delete BankingStats, BankingFAQ, ProseTable components
- Remove duplicate pragmatic-play.png image
- [Optional] Remove OptimizedImage component
- [Optional] Remove how-to-deposit.md draft

These files were not referenced anywhere in the codebase."
```

---

## Conclusion

This cleanup removes **4-6 unused files** (depending on decisions) with:
- ✅ Zero impact on functionality
- ✅ Improved code navigation
- ✅ Reduced cognitive load
- ✅ Cleaner project structure

All dependencies are actively used, so no package.json changes needed.

**Ready to proceed with cleanup!**
