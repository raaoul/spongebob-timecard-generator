<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Documentation policy

When you finish implementing a feature or change, update the knowledgebase in [`docs/`](docs/) so it reflects the **current** state of the project.

- **Update/rewrite the relevant existing doc — do NOT append patch notes, changelogs, or "recently changed" sections.** The docs describe how things work *now*, not their history.
- Keep the docs in sync with reality: if you add a background, a color preset, an aspect ratio, or change the export pipeline, edit the matching doc.
- `docs/README.md` is the index. The other docs are `architecture.md`, `features.md`, and `customization.md`.
