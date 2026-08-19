# Design QA — Framer interaction integration

## Comparison target

- Source visual truth: `design-audit-current-20260818/39-hero-after-1440.png` (the approved site composition before this interaction pass).
- Interaction truth: the user-supplied Framer Eye Follow Button and Floating Pill Navigation modules. The links expose component code rather than a rendered canvas, so their observable anatomy and motion parameters were used as the behavior specification: paired cursor-following eyes with constrained pupil travel, and a shared active pill that slides between links.
- Implementation screenshot: `design-audit-framer-20260819/01-hero-nav-eye-1440.png`.
- Active navigation state: `design-audit-framer-20260819/02-about-active-pill-1440.png`.
- Full-view comparison evidence: `design-audit-framer-20260819/03-before-after-full.png` (source left, implementation right).
- Focused navigation comparison: `design-audit-framer-20260819/04-nav-focused-before-after.png` (source left, implementation right).
- Focused CTA comparison: `design-audit-framer-20260819/05-cta-focused-before-after.png` (source left, implementation right).

## Normalization

- Viewport and CSS size: 1440 × 900.
- Source pixels: 1440 × 900.
- Implementation pixels: 1440 × 900.
- Device scale normalization: both captures compare at the same CSS viewport and 1:1 output size; no downsampling was required.
- State: desktop, dark theme, hero at top for the main comparison. A separate About-section screenshot records the selected navigation state.
- The hero background differs frame-to-frame because it is a live looping video; this is expected and excluded from fidelity findings.

## Findings

- No remaining P0/P1/P2 visual or functional mismatch.
- Typography: the existing Space Grotesk / Noto Sans SC hierarchy, sizes, weights, and wrapping remain unchanged. The navigation and CTA additions use the established UI type scale and do not compete with the cinematic display heading.
- Spacing and layout rhythm: brand, central navigation, contact action, hero copy, CTA group, and metadata retain the source alignment. The pill adds a compact 5 px shell without changing the header height. The eye tray expands only the primary CTA and preserves the action-group gap.
- Colors and visual tokens: both components are translated into the established graphite, silver, off-white, and cool-blue palette. The active pill uses the same off-white as the primary CTA, while blue appears only in focus/glow details.
- Image and asset quality: all existing video and image assets remain untouched. The supplied Framer effects are code-native interface geometry and do not replace any source image asset.
- Copy and content: navigation labels and the primary CTA wording are unchanged.
- Icons and controls: the removed CTA arrow is replaced by the two-eye interaction as requested; the contact arrow, mobile menu, and all other iconography remain intact.
- Accessibility: anchors remain semantic and keyboard reachable; the active section exposes `aria-current="page"`; decorative eyes are hidden from assistive technology; visible focus rings are present; pointer tracking is disabled for coarse pointers and reduced-motion users.
- Responsiveness: desktop interaction is enabled above 900 px. Below 900 px the existing mobile menu remains the navigation model, and the eye button scales down without overflowing.

## Interaction verification

- Eye tracking: moving the pointer to the CTA's upper-right produced independent constrained pupil transforms of `translate(8.24px, -2.41px)` and `translate(7.18px, -4.69px)`; initial position was centered.
- Navigation: clicking “项目” updated the URL to `#projects`, set “项目” to `aria-current="page"`, and moved the indicator to the corresponding 152 px offset.
- Hero boundary: hero rendered at exactly 900 px in a 900 px viewport.
- Horizontal overflow: document `scrollWidth` and `clientWidth` both measured 1440 px.
- Browser console: no errors or warnings.
- Build: `npm run build` passed and emitted `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
- Sites packaging tests: all 4 tests passed.

## Comparison history

1. Initial implementation pass
   - [P2] Clicking the “项目” anchor scrolled correctly but the old intersection-ratio observer temporarily marked “工作流” active.
   - Fix: replaced ratio-based section selection with a requestAnimationFrame-throttled scroll marker that resolves the last section crossing 34% of the viewport.
2. Post-fix pass
   - Evidence: the browser reported hash `#projects`, active label “项目”, `aria-current="page"`, indicator offset 152 px, and no horizontal overflow.
   - Result: no actionable P0/P1/P2 findings remain.

## Follow-up polish

- P3: once the owner supplies final project naming and contact details, retest long Chinese and English navigation labels at the 900 px breakpoint.

## Implementation checklist

- [x] Preserve the approved hero composition and six-section structure.
- [x] Integrate the paired eye-follow interaction into the primary CTA.
- [x] Integrate a shared section-aware navigation pill on desktop.
- [x] Preserve the existing mobile menu.
- [x] Add reduced-motion, coarse-pointer, focus, and semantic states.
- [x] Verify build, Sites packaging, browser interaction, viewport boundary, overflow, and console.

final result: passed
