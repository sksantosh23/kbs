# KBS design system

The active Release 1 identity is the supplied Kora Business Solutions brand specification and the exact supplied SVG artwork.

## Brand foundation

- Deep Black: `#070909` for primary dark surfaces and navigation.
- Premium Gold: `#D4AF37` for restrained accents, actions, indicators, and wordmark gradients.
- Off-White: `#F2F2F2` for primary light surfaces and text on dark surfaces.
- Supporting typeface: locally hosted Manrope, weights 400, 500, 600, and 700.
- The KORA wordmark is custom vector artwork. It is never recreated with Manrope or another text font.
- Composition target: approximately 80–85% black, 10–15% off-white, and 2–5% gold.

## Surfaces and semantics

`--ink`, `--paper`, `--surface-muted`, `--accent`, `--muted`, and `--line` are the shared visual tokens in `src/styles/global.css`. Semantic `--error`, `--warning`, `--success`, and `--focus` tokens remain independent of the gold accent so validation, status, and focus states stay legible. Gold is not used as small normal body text where contrast fails.

Public and admin pages share the same tokens and Manrope stack. Government pages use the same restrained palette and preserve factual procurement language. Print styles switch to high-contrast black and white output.

## Exact asset provenance

| Supplied source | Detected type | Canonical use | Transformation and validation |
|---|---|---|---|
| `src/assets/brand/KORA_Business_Solutions_Exact_BlackBG.svg` | Standalone valid SVG/XML, 508 × 212, includes `#070909` background rect | `src/assets/brand/kora-logo-on-dark.svg` | Byte-preserving copy; parsed as XML, no script/image/HTML wrapper; visually identified as the dark-surface variant |
| `src/assets/brand/KORA_Business_Solutions_Exact.svg` | Standalone valid SVG/XML, 508 × 212, transparent background | `src/assets/brand/kora-logo-on-light.svg` | Byte-preserving copy; parsed as XML, no script/image/HTML wrapper; visually identified as the light-surface variant |
| `src/assets/brand/KBS Font Color.png` | PNG reference image, 1122 × 1402 | Reference only | Inspected as an image; records the approved colors, typography, usage balance, and wordmark intent |

The original supplied files, including their source metadata sidecars, remain preserved. The canonical SVGs are imported by `src/components/Brand.astro`; no remote logo or font dependency is used.

Manrope files in `public/fonts/` are from the Ubuntu `fonts-manrope` package, licensed under SIL Open Font License 1.1. The license text is stored alongside the font files in `public/fonts/OFL-1.1.txt`. Only the four weights used by the interface are shipped.

## Verification

`npm run verify:brand` scans source, public assets, and (when present) generated client output for retired palette/font references, remote font URLs, and missing canonical assets. It runs as part of `npm run release:check`.

## Editorial media layer

Photography is supporting evidence, not the identity. Release 1 uses locally hosted, reviewed free-standard Pexels assets only. Canonical provenance is maintained in `content/media/media-manifest.json`; source-page and license URLs remain internal manifest data and are never requested by the site. `EditorialImage.astro` emits AVIF/WebP/JPEG sources with intrinsic dimensions, responsive sizes, useful neutral alt text, lazy loading below the fold, and no ownership or endorsement claims. `npm run verify:media` checks manifest completeness, local files, provider allowlist, dimensions, hotlink absence, public-path restrictions, and prohibited Government identifiers.
