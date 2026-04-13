# Tideon Site — Style Guide for Claude

## Main Site (/)
- Dark industrial aesthetic: background `#0A0A0B`, accent `#00F5D1`
- Font: Outfit (900 weight for headings)
- Scroll-scrubbed video intro (VideoScrub.tsx) — do not modify smoothness logic without testing on iOS + Android
- Nav appears after scrolling past video (controlled by scroll position > 120vh)
- Light mode forced via `forcedTheme="light"` in ThemeProvider — do NOT re-add dark mode

## Shop Page (/shop)
- **Aesthetic**: Soft-Industrial — warm, airy, high-end craft storefront
- **Background**: `#F9F7F2` (warm cream)
- **Text**: `#2C2825` (charcoal), secondary `#6B6560`
- **Accent**: per-category (Aquatics `#6BAED6`, EDC `#A8887A`, Tech `#74C69D`, Fidgets `#C9A96E`)
- **Radius**: `24px` (cards), `100px` (pills/buttons)
- **Typography**: Outfit 800 for headings, generous line-height (1.7) for body
- **Spacing**: Heavy white space — minimum 48px section padding
- **Animations**: Framer Motion `fadeUp` on scroll into view, `whileHover` lift on cards
- **CTA**: "View on Etsy" buttons — charcoal bg, accent on hover, always `target="_blank"`

## Categories (Shop)
1. Aquatics — feeding rings, skimmers, mounts
2. Everyday Carry — pocket whistles, keychains
3. Tech & PC — cable management, fan grills, GPU supports
4. Fidgets — precision spinners

## Rules
- Never add dark mode classes to /shop — it has its own layout.tsx
- Keep Etsy links as placeholders (`https://www.etsy.com`) until real shop URLs are provided
- Do not modify VideoScrub.tsx scroll math without user approval
