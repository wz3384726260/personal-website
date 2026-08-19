# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Project-specific design decisions

- The site owner identifies as an AI trainer. Do not reposition them as a generic designer or developer.
- Keep the agreed six-part structure: cinematic hero, practice showcase, about, capabilities, selected projects, and contact.
- The supplied `深空几何.mp4` is the selected hero visual source. Preserve its black, graphite, silver, and restrained cool-blue art direction.
- Project history, contact details, personal name, and performance metrics are not yet supplied. Use transparent replace-later copy and never invent credentials or results.
- The second-section carousel source library contains 22 optimized WebP files under `public/media/showcase/`. The desktop portfolio now presents an editorial selection of 8 representative images across character, behavior, world-building, material, motion, style, and illustration studies; keep the full source library available for future re-curation.
- The selected-projects archive currently uses the three user-supplied MP4 clips in the order provided. Keep the stable assets under `public/media/projects/` and use neutral numbered titles until the user supplies official project names and case-study details.
- The former capabilities list is now the selected dark-stage `工具伙伴 / TOOL PARTNERS` carousel. Preserve the partner order Claude, Codex, DeepSeek, Cursor; the generated transparent WebP assets under `public/media/partners/`; the oversized Anton ghost title; and the 650ms depth/role transitions unless the user requests a new direction.
- Treat typography as a three-level reading system: body copy stays at 16px or larger on compact screens, section and interaction labels stay at 11–14px, and display headings carry the cinematic scale. Do not shrink important portfolio information into decorative microcopy.
- Give each section its own motion language instead of applying one global fade: staggered hero lines, rhythmic showcase cards, editorial text reveals, spatial partner transitions, masked project reveals, and a restrained contact close. Every motion treatment must collapse cleanly under `prefers-reduced-motion`.
- For the current desktop-first direction, keep the sticky active-section navigation, the off-white About chapter break, the explicit three-step AI training method, and the project observation fields. Mobile-specific redesign is deferred; shared content must still remain structurally usable below 900px.
- Keep the browser scrollbar visually hidden while preserving normal wheel, trackpad, keyboard, and anchor scrolling. The hero must equal exactly one small viewport height and keep its metadata inside that boundary; do not let the next section read as part of the hero.
- Keep the refined portfolio copy hierarchy: concise AI-trainer proposition in the hero, process-led About copy, and a direct collaboration-oriented Contact close. Prefer controlled two-line display headings and shorter supporting paragraphs over dense technical prose.
- The desktop navigation now uses a shared sliding active pill adapted to the supplied Framer Floating Pill reference. Preserve the brand and contact actions around it, keep section-aware movement, and retain the existing mobile menu below 900px.
- The hero primary project CTA now uses the supplied Framer Eye Follow interaction: two eyes track fine-pointer movement within a constrained radius and remain centered for coarse pointers or reduced-motion users. Keep this behavior limited to the primary CTA so it stays distinctive.
