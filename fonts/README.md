---
title: ''
url: https://blog.kisechan.space/fonts/README.html
type: page
time: '2026-11-15T08:57:06.623Z'
---

# Blog fonts

Fonts are served locally as WOFF2 with `font-display: swap`. Each family's SIL Open Font License is included alongside the fonts. WOFF2 files are lossless conversions of the upstream OTF files, preserving complete glyph coverage.

- Source Sans 3 Light, Light Italic, Medium: https://github.com/adobe-fonts/source-sans/tree/release/OTF
- Source Code Pro Regular, Italic, Bold: https://github.com/adobe-fonts/source-code-pro/tree/release/OTF
- Source Han Sans SC Light: https://github.com/adobe-fonts/source-han-sans/tree/release/OTF/SimplifiedChinese
- Source Han Sans CN Medium (Simplified Chinese regional subset): https://github.com/adobe-fonts/source-han-sans/tree/release/SubsetOTF/CN
- Source Han Sans CN Regular (Simplified Chinese regional subset): https://github.com/adobe-fonts/source-han-sans/tree/release/SubsetOTF/CN

Avenir is referenced exclusively through local() and restricted to Latin Unicode ranges. CSS weight 700 explicitly selects Avenir Medium (500), avoiding synthesized bold for emphasis and headings. Greek and Cyrillic use Source Sans 3 Light. Source Sans 3 maps CSS weight 400 to Light (300) and CSS weight 700 to Medium (500), preserving the theme’s existing emphasis semantics. CJK normal text maps the Light outlines to CSS weight 400 alongside Source Sans 3 Light; CSS weight 700 maps to Regular (400) outlines for lighter headings and emphasis. The CN Regular WOFF2 is converted losslessly from the upstream OTF, preserving its glyph coverage.

Math uses KaTeX’s default HTML + MathML output and bundled KaTeX font families, served locally by `scripts/katex-assets.js` from the installed KaTeX package. Its versioned stylesheet URL keeps rendering code, styles and math fonts aligned.

Typography rules: `/css/fonts.css`. Font families and stylesheet registration: `_config.fluid.yml`. Math renderer: `_config.yml`.
