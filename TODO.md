# Optimization TODO: Home & About Sections

## Plan
- [x] Analyze files and create optimization plan
- [x] Get user approval

## Phase 1: Critical — Star Background (Biggest Impact)
- [x] Update `components/main/star-background.tsx` — disable on mobile, reduce particles to 600, cap DPR to 1.5, add `gl={{ antialias: false }}`
- [x] Update `app/layout.tsx` — StarsCanvas handles mobile internally (returns null on mobile)

## Phase 2: About Section — Remove Heavy Effects
- [x] Update `components/main/about.tsx` — major overhaul:
  - [x] Removed orbiting icons component entirely
  - [x] Static gradient border (no CSS spin animation)
  - [x] Simplified TiltCard (stiffness 50, damping 15, rotation 1.5deg)
  - [x] Removed background video from About section
  - [x] Removed large blur glows on mobile, reduced on desktop (blur-[40px])
  - [x] Reduced backdrop-filter intensity (2xl→md)
  - [x] Simplified floating badge — static div on mobile, motion.div only on desktop
  - [x] Mobile: skip motion variants, use simple fade-in-up
  - [x] Added useCallback for mouse handlers to prevent re-renders
  - [x] Social buttons: CSS transitions only, removed will-change

## Phase 3: Hero Section — Reduce Rerenders
- [x] Update `components/sub/hero-content.tsx` — wider stagger delays, explicit will-change on motion.divs, inline-block on Link
- [x] Keep `components/main/hero.tsx` as-is (already optimized with mobile gradient)

## Phase 4: Motion Utilities — Fix Static Checks
- [x] Update `src/utils/motion.ts` — dynamic `getIsMobile()` / `getPrefersReducedMotion()`, reduced distances (20/40), cap duration on mobile
- [x] Update `lib/motion.ts` — dynamic `getIsMobile()`, reduced distances (30/60), shorter durations

## Phase 5: CSS — Mobile Performance Utilities
- [x] Update `app/globals.css` — disable backdrop-filter/blur on mobile, reduce heavy shadows, simplify gpu-layer on mobile

## Phase 6: Verify
- [x] Build project — SUCCESS
- [x] Check for TypeScript errors — NONE (only pre-existing warning in experience.tsx)
- [x] Verify no broken design — PASSED

