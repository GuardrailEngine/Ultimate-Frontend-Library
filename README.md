# Ultimate Frontend Library

A visual field guide to 100 production-grade interface components built with pure HTML, CSS, and Vanilla JavaScript.

This repository powers the public demo and marketing showcase for the library. Visitors can browse the finished interfaces, test the interactions, and understand the quality and range of the collection before purchasing the complete package.

## Explore the showcase

- Browse the live component previews in the demo.
- Search by component name and category.
- Open the project on GitHub to inspect the public project context.
- Get the complete source package, commercial delivery, and product updates on [Gumroad](https://simochakir.gumroad.com/l/szcvz).

## What the library covers

- 100 standalone interface components
- 10 focused categories
- Navigation, forms, motion, data visualisation, layouts, cards, feedback, loading, commerce, and product UI patterns
- HTML, CSS, and JavaScript components with zero runtime dependencies
- Responsive, interaction-focused examples built for real product interfaces

## Demo versus the complete product

The public demo is a visual showcase. It lets you see the result and interact with each component before purchasing the complete product package.

The complete library is distributed through Gumroad with the full organised collection and product delivery details. Keep the demo link and the GitHub link in your marketing posts so people can evaluate the work before they buy.

## Links

- [GitHub repository](https://github.com/GuardrailEngine/Ultimate-Frontend-Library)
- [Get the complete library on Gumroad](https://simochakir.gumroad.com/l/szcvz)

## Project structure

- `artifacts/frontend-library` — the public showcase application and preview catalogue
- `artifacts/frontend-library/public/components` — preview assets used by the demo
- `artifacts/frontend-library/src` — the React/Vite showcase interface
- `.github/workflows` — deployment automation

## Development

This repository uses pnpm workspaces. From the repository root:

```bash
pnpm install
pnpm --filter @workspace/frontend-library run dev
```

Before publishing a change, run:

```bash
pnpm run typecheck
pnpm run build
```

## Product updates

Keep release notes and demo changes visible in the repository so the public showcase stays aligned with the product being sold.
