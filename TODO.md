# TODO: Premium Focus Animation for Experience Cards

## Plan Overview
Enhance the experience cards with a more premium focus/hover animation including mouse-following spotlight, rotating border gradient, enhanced transforms, and staggered glow effects.

## Steps

### Step 1: Update `app/globals.css`
- [x] Add mouse-following spotlight effect styles (`--mouse-x`, `--mouse-y` custom properties)
- [x] Add rotating conic gradient border animation on hover/focus
- [x] Enhance hover transform (scale 1.02 + spring lift)
- [x] Add staggered content glow for bullet points on hover
- [x] Add focus-visible ring for keyboard accessibility
- [x] Enhance background glow orb intensity on hover
- [x] Add new keyframe animations (`@keyframes rotate-border`, `@keyframes pulse-premium`)

### Step 2: Update `components/main/experience.tsx`
- [x] Add `useRef` and `useState` for mouse position tracking
- [x] Create `handleMouseMove` handler to update CSS custom properties (`--mouse-x`, `--mouse-y`)
- [x] Wrap `VerticalTimelineElement` content with mouse event handlers
- [x] Add Framer Motion `whileHover` / `whileFocus` variants for spring animation
- [x] Ensure smooth cleanup on unmount

### Step 3: Testing & Verification
- [ ] Verify hover spotlight follows cursor smoothly
- [ ] Verify rotating border appears on hover/focus
- [ ] Check staggered bullet point glow
- [ ] Test keyboard focus-visible states
- [ ] Confirm responsive behavior on mobile/tablet
- [ ] Ensure no performance issues (60fps)

## Dependencies
- No new packages required (Framer Motion already installed)
- Uses existing `react-vertical-timeline-component` CSS overrides

## Expected Result
Experience cards will have a luxurious, interactive feel with:
1. Dynamic spotlight following the mouse cursor
2. Animated rotating gradient border on hover
3. Smooth spring-based lift + scale transform
4. Bullet points that glow in sequence when card is focused
5. Strong focus-visible indicator for accessibility

