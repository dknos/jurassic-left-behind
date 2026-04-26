# Jurassic Left Behind

Standalone static repo for the 1993 Isla Nublar side-story.

Read the story here:

- [Table of contents](./en/toc/)
- [Chapter 1](./en/chapter-001/)

This repo contains the published dossier reader, chapter pages, glossary,
character pages, static assets, and generated chapter images for the story.

Media workflow:

- Raw scenic references live in `reference-sources/`.
- Use those files as the source pool for Grok image-to-image passes.
- Use the Grok i2i outputs as the only inputs for Grok image-to-video.
- Do not use the derived chapter art as a source seed for future image runs.

See `GROK_MEDIA_HANDOFF.md` for the full handoff.
