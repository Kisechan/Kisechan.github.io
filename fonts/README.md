---
title: ''
url: https://blog.kisechan.space/fonts/README.html
type: page
time: '2026-11-06T05:43:46.184Z'
---

# Blog fonts

Fonts are served locally as WOFF2 with `font-display: swap`. Each family's SIL Open Font License is included alongside the fonts. WOFF2 files are lossless conversions of the upstream OTF files, preserving complete glyph coverage.

- Source Sans 3 Regular, Italic, Bold: https://github.com/adobe-fonts/source-sans/tree/release/OTF
- Source Code Pro Regular, Italic, Bold: https://github.com/adobe-fonts/source-code-pro/tree/release/OTF
- Source Han Sans SC Light, Bold: https://github.com/adobe-fonts/source-han-sans/tree/release/OTF/SimplifiedChinese
- Fira Math Light: https://github.com/firamath/firamath/releases/tag/v0.4-beta-3 (prerelease)

Avenir is referenced exclusively through local() and restricted to Latin Unicode ranges. Greek and Cyrillic use Source Sans 3. CJK normal text maps the Light outlines to CSS weight 400 so Latin stays Regular; bold uses actual Bold outlines.

Math uses KaTeX's MathML output and browser-native OpenType MATH layout. Fallbacks: STIX Two Math, Cambria Math, generic math. Current browsers with native MathML support are required. Fira Math Light is mapped to CSS weight 300 (the upstream prerelease internally labels its weight as 200). Formula text marked with a TeX font variant can select the corresponding mathematical alphabet.

Typography rules: `/css/fonts.css`. Font families and stylesheet registration: `_config.fluid.yml`. MathML output: `_config.yml`.
