# Grok Media Handoff

## Reader

The published site already uses the dossier reader skin.

- Chapter and TOC pages load `static/dossier.css`
- Pages use the `dossier-reader` body class
- The root `index.html` redirects to `en/toc/`

Do not rebuild the site as a generic blog or plain static reader.

## Canonical source images

The current source pool is the raw scenic set in `reference-sources/`.

Use those files as the **input** for Grok image-to-image.

Do not use:

- chapter-rendered `scene-*.webp` files
- derived composites
- any earlier diagram-like placeholders

## Required media order

1. Select a raw scenic reference image from `reference-sources/`.
2. Run Grok image-to-image on that source with a chapter-specific prompt.
3. Save the i2i output as the visual seed for that scene.
4. Run Grok image-to-video using that i2i output as the source frame.
5. Replace the chapter asset with the final i2v result only after it reads as a real location plate.

## Prompt rules

- Keep the scenic language grounded in real Kauai / Isla Nublar geography.
- Avoid schematic, diagram, blueprint, or game-engine looks.
- Vary camera angle, focal length, and weather across adjacent scenes.
- Keep human figures small unless the scene is specifically character-driven.
- Use the same visual continuity for the park infrastructure, but do not reuse the same crop repeatedly.

## Chapter coverage

The story is already structured into 25 chapters.

Future novel runs can reuse the same pattern:

- dossier reader skin
- one raw scenic source pack
- Grok i2i seed pass
- Grok i2v final pass
- publish to GitHub Pages

## What to do next

- Generate the missing Grok i2i outputs for each scene.
- Animate those outputs with Grok i2v.
- Swap the chapter assets in `images/jurassic-left-behind/`.
- Rebuild and republish the site.
