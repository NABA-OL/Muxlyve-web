---
name: Muxlyve
description: Multistreaming de escritorio sin marca de agua — landing, ayuda y panel admin
colors:
  bg: "#0d1117"
  surface: "#161b22"
  surface-2: "#1c2230"
  border: "#2a3140"
  text: "#e6edf3"
  muted: "#8b949e"
  accent: "#7c5cff"
  accent-2: "#4da3ff"
  success: "#2ea043"
  twitch: "#9146ff"
  kick: "#53fc18"
  youtube: "#ff0000"
  tiktok: "#25f4ee"
typography:
  hero:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(2.4rem, 1.2rem + 4.6vw, 4.6rem)"
    fontWeight: 700
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.6rem, 1rem + 2vw, 2.6rem)"
    fontWeight: 700
  body:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
  lead:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "clamp(1.05rem, 0.95rem + 0.6vw, 1.3rem)"
    fontWeight: 400
  label:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.08em"
rounded:
  sm: "8px"
  md: "12px"
  pill: "999px"
spacing:
  section: "clamp(4rem, 3rem + 5vw, 8rem)"
components:
  button-primary:
    backgroundColor: "rgba(255,255,255,0.1)"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.3rem"
  button-primary-hover:
    backgroundColor: "rgba(255,255,255,0.15)"
  button-ghost:
    backgroundColor: "rgba(13,17,23,0.4)"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.3rem"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "1.5rem"
---

# Design System: Muxlyve

## Overview

**Creative North Star: "Prisma Nocturno"**

Muxlyve's interface is a night-dark control room lit by a single accent: violet-blue light bending through glass. The hero shader is the thesis made literal — four platform-colored beams (Twitch, Kick, YouTube, TikTok) that read as pure white near the center and separate into color at the edges, like light through a prism. Every glass surface in the system — buttons, the mobile nav panel — carries that same idea forward: a cursor-tracked spotlight that makes the surface feel like it's catching real light, not painted with a gradient.

The palette stays almost monochrome (near-black bg, single violet accent) specifically so the four platform colors — which appear in badges, icons, and the shader — read as the interesting color event on the page, not competition for the brand's own accent. This is a technical product for streamers who know their tools; the visual language is confident and understated, not loud. No gradient text, no decorative color for its own sake.

**Key Characteristics:**
- Near-black background with a single violet accent (Electric Violet), used sparingly
- Frosted glass surfaces (backdrop-filter blur) with cursor-reactive spotlight highlights, not flat fills
- Platform brand colors (Twitch/Kick/YouTube/TikTok) are the system's only permitted color variety, reserved for icons/badges/the hero shader
- Pill-shaped buttons, soft-radius cards — no sharp corners anywhere
- Dark-only; no light theme

## Colors

Near-monochrome dark palette. One accent does all the brand-color work; everything else is neutral or a platform's own color.

### Primary
- **Electric Violet** (#7c5cff): The one brand accent. Links, focus rings, primary icon color, badge/eyebrow text, the "Muxlyve" wordmark. Used on a small fraction of any given screen — its rarity is what makes it register as "the brand color."

### Secondary
- **Sky Accent** (#4da3ff): Paired with Electric Violet in the two-stop brand gradient (`--grad`, used for backgrounds/glows, never for text since gradient-text was retired). Rarely stands alone.

### Tertiary — Platform Colors
- **Twitch Violet** (#9146ff), **Kick Green** (#53fc18), **YouTube Red** (#ff0000), **TikTok Cyan** (#25f4ee): Reserved exclusively for platform badges/icons and the hero shader's four light beams. Never repurposed as UI accent colors — keeping them platform-exclusive is what makes the hero shader read as "these are the platforms" rather than generic decoration.

### Neutral
- **Void** (#0d1117): Page background. Near-black, not pure black — leaves room for the glass surfaces to read as lighter.
- **Surface** (#161b22): Card and panel backgrounds.
- **Surface Raised** (#1c2230): Secondary surface, one step lighter than Surface (inputs, nested panels).
- **Border** (#2a3140): All hairline borders and dividers.
- **Text** (#e6edf3): Primary reading text. Off-white, not pure white — softer against the near-black bg.
- **Muted** (#8b949e): Secondary text (leads, captions, timestamps). Verified ≥5.6:1 contrast against both Void and Surface — deliberately not pushed lighter for "elegance."

### Named Rules
**The One Accent Rule.** Electric Violet is the only brand color used as UI accent. Platform colors are read-only — they represent the platforms, they don't decorate the UI.

## Typography

**Display/Body Font:** Inter (with system-ui, -apple-system, "Segoe UI", sans-serif fallback)

**Character:** A single, well-worn geometric-humanist sans doing every job — hero headline down to captions — differentiated by weight and size, not by switching families. Confident and legible over expressive.

### Hierarchy
- **Hero** (700, `clamp(2.4rem, 1.2rem + 4.6vw, 4.6rem)`, tracking -0.03em): The one headline per page (the `<h1>`). Fluid-scales with viewport, capped well under the 6rem display ceiling.
- **Headline** (700, `clamp(1.6rem, 1rem + 2vw, 2.6rem)`): Section titles (`.section-title`), capped at 24ch so they wrap into a deliberate shape, not a run-on line.
- **Lead** (400, `clamp(1.05rem, 0.95rem + 0.6vw, 1.3rem)`): The one supporting paragraph under a headline.
- **Body** (400, 1rem): Default reading text everywhere else.
- **Label** (600, 0.8rem, tracking 0.08em, uppercase): `.eyebrow` — used sparingly, not stacked above every section (the kicker-on-every-section pattern is explicitly avoided).

### Named Rules
**The One Family Rule.** Inter carries the entire type system. Hierarchy comes from weight and fluid clamp() scale, never from mixing in a second typeface.

## Layout

Single-column, container-constrained (`--maxw: 1120px`) marketing layout with a `--space-section: clamp(4rem, 3rem + 5vw, 8rem)` rhythm between major sections — spacing itself scales with viewport rather than jumping at fixed breakpoints. Primary responsive break is 680px (mobile nav collapses to a hamburger + slide-down panel below it) and 1400px (hero switches from side-by-side to stacked/centered). Mobile-first touch targets hold to 44×44px minimum.

## Elevation & Depth

**Vidrio físico, no capas planas** — physical glass, not flat layers. Instead of a drop-shadow-under-a-card model, elevated surfaces (buttons) use `backdrop-filter: blur()` plus **inset** shadows that simulate a real glass edge: a bright inset highlight along the top (light catching the top edge) and a dark inset shadow along the bottom, with only a soft ambient drop-shadow beneath for lift. Hover states shift the inset highlight to the accent color rather than just darkening — the glass "catches" brand-colored light. Cards stay flatter: a 1px border plus a small `translateY(-3px)` lift and border-color shift on hover, no shadow at all.

### Shadow Vocabulary
- **Glass rest** (`inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -10px 16px -10px rgba(0,0,0,0.35), 0 8px 24px -10px rgba(0,0,0,0.55)`): Default `.btn-primary` state — simulates a lit glass edge over ambient lift.
- **Glass hover** (`inset 0 1px 0 rgba(124,92,255,0.9), inset 0 -10px 16px -10px rgba(124,92,255,0.5), 0 12px 30px -10px rgba(0,0,0,0.6)`): The edge highlight shifts to Electric Violet and the ambient shadow deepens.

### Named Rules
**The Glass-Edge Rule.** Elevation on interactive glass surfaces comes from inset highlight/shadow pairs simulating a physical edge, never from a plain drop-shadow alone.

## Shapes

Two radii cover the whole system: **pill** (`border-radius: 999px`) for every button, and **12px** (`--radius`) for cards and panels. Nothing in between, nothing sharp — the pill/rounded-rectangle vocabulary is consistent everywhere from the hero CTAs to the mobile nav dropdown.

## Components

### Buttons (signature component)
- **Shape:** Pill (999px), border 1px.
- **Primary:** `rgba(255,255,255,0.1)` frosted glass fill, `backdrop-filter: blur(10px) saturate(160%) brightness(1.05)`, white text. A radial-gradient spotlight (`140px` radius, violet at 20% opacity) follows the cursor via `--x`/`--y` custom properties set on `pointermove`, fading in on hover.
- **Ghost:** `rgba(13,17,23,0.4)` dark glass fill, `blur(10px)`, same spotlight-on-hover behavior, body-text color.
- **Hover / Focus:** `translateY(-2px)` lift, glass-hover shadow (above), spotlight opacity → 1. Global `:focus-visible` gives every interactive element a 2px Sky Accent outline with 2px offset — never suppressed.
- **Disabled:** `opacity: 0.6`, `cursor: not-allowed`, no active-state scale.

### Cards
- **Corner Style:** 12px (`--radius`).
- **Background:** Surface (#161b22), 1px Border.
- **Shadow Strategy:** None at rest — depth comes from the `-3px` hover lift and a border-color shift toward Electric Violet (`color-mix(in oklab, var(--accent) 50%, var(--border))`), not shadow.
- **Internal Padding:** 1.5rem.

### Navigation
- Sticky, transparent at scroll-top (hero bleeds through), gains a blurred `rgba(22,27,34,0.72)` background + border past an 8px scroll threshold. Below 680px, links collapse into a hamburger (44×44px) revealing a full-bleed glass dropdown animated via `grid-template-rows: 0fr → 1fr` (not `max-height`) with a tap-to-dismiss backdrop. Focus/hover on nav links shifts to Sky Accent.

### Badges (platform icons)
- Circular ring container, border colored per-platform, icon in `currentColor`. The only place in the UI where more than one saturated color appears together — deliberately, since it represents the actual platform list.

## Do's and Don'ts

### Do:
- **Do** use the inset-highlight glass-edge shadow pattern (Elevation) for any new elevated interactive surface — it's the system's one depth idiom.
- **Do** keep platform colors (Twitch/Kick/YouTube/TikTok) scoped to platform representation only (icons, badges, the hero shader).
- **Do** use `grid-template-rows: 0fr → 1fr` for auto-height reveal animations, animating any padding on the collapsing child in lockstep — a fixed padding on a 0fr-collapsed element leaves a visible residue.
- **Do** keep the eyebrow/label style (`.eyebrow`) rare and intentional, not stacked above every section.

### Don't:
- **Don't** use gradient text (`background-clip: text` + gradient) for emphasis — solid Electric Violet does the job; this was an active retired pattern in this codebase.
- **Don't** introduce a second typeface. Inter's weight range carries the whole hierarchy.
- **Don't** add drop-shadow-under-card as a depth pattern — cards lift via `translateY` + border-color, not shadow.
- **Don't** hardcode hex colors outside this token set in new component CSS; reference the `--` custom properties.
