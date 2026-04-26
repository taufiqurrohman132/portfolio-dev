# Performance Optimization TODO

## Phase 1: Global CSS & Layout Optimizations ✅
- [x] Optimize `app/globals.css` - Add GPU helpers, reduce-motion media query, content-visibility
- [x] Optimize `app/layout.tsx` - Add antialiased class for smoother text rendering

## Phase 2: Heavy Animation Components ✅
- [x] Optimize `components/main/star-background.tsx` - Already had particle reduction (1200/600)
- [x] Optimize `components/main/about.tsx` - Disable 3D tilt on mobile, reduce blur, fix video preload
- [x] Optimize `components/ui/3d-pin.tsx` - Replace 3 infinite motion loops with single CSS animation

## Phase 3: Interactive Components ✅
- [x] Optimize `components/sub/certificate-card.tsx` - Debounce mouse handlers, remove heavy effects
- [x] Optimize `components/main/experience.tsx` - Replace spring hover with CSS, throttle mouse move

## Phase 4: Video & Media ✅
- [x] Optimize `components/main/hero.tsx` - Fix preload="metadata", add playsInline
- [x] Optimize `components/main/skills.tsx` - Fix video preload, add gpu-layer
- [x] Optimize `components/main/about.tsx` - Fix video preload

## Phase 5: Motion Utilities ✅
- [x] Optimize `src/utils/motion.ts` - Prefer tween over spring, respect reduced-motion

## Phase 6: Testing & Polish ⏳
- [ ] Run build to verify no errors
- [ ] Test scroll smoothness
- [ ] Verify mobile performance

## Summary of Changes

### Performance Improvements:
1. **GPU Layering**: Added `.gpu-layer` class with `translateZ(0)` and `will-change` for composited layers
2. **Reduced Motion**: Added `prefers-reduced-motion` media query support
3. **Mobile Optimizations**: Disabled heavy blur/glow effects on mobile (<768px)
4. **Video Preload**: Fixed invalid `preload="false"` to `preload="metadata"`
5. **3D Tilt**: Disabled on mobile (window width < 1024), reduced stiffness on desktop
6. **Mouse Handlers**: Added requestAnimationFrame throttling to certificate and experience cards
7. **Backdrop Blur**: Reduced from `blur-2xl`/`blur-[120px]` to `blur-[80px]`/`blur-[100px]`
8. **Framer Motion**: Replaced heavy spring animations with lighter tween animations
9. **3D Pin**: Replaced 3 infinite framer-motion loops with single CSS `pulse-slow` animation
10. **Experience Cards**: Replaced spring whileHover with CSS transitions
11. **Certificate Cards**: Removed expensive SVG noise filter, reduced backdrop-blur layers

