# AI Things You Should Know

A calm, mobile-first learning experience for understanding Artificial Intelligence concepts through clear explanations, practical examples, interactive diagrams, and knowledge checks.

## Project goals

- Make complex AI concepts easier to understand.
- Keep the interface quiet, readable, and distraction-free.
- Provide a consistent experience across mobile, tablet, and desktop.
- Preserve the content from the supplied HTML source containing 58 AI concepts.
- Use interactions only when they improve understanding.

## Features

- Browse and search all 58 AI concepts.
- Read focused concept lessons.
- Navigate to the previous or next concept.
- Explore relevant interactive diagrams and comparisons.
- Use knowledge checks where supported by the source material.
- Responsive, mobile-first layout.
- Calm dark theme with restrained blue accents.

## Design principles

- Neutral dark surfaces and readable text.
- Generous spacing and clear typography.
- Minimal decoration and subtle borders.
- No neon effects, excessive gradients, or crowded dashboards.
- No accounts, profiles, bookmarks, saved lessons, streaks, or persistent learning progress.
- No unrelated technology categories.

## Tech stack

- [Vite](https://vite.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules or organized CSS
- [Lucide React](https://lucide.dev/)

## Getting started

### Prerequisites

- Node.js (use a currently supported LTS version)
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

If the project uses a different package manager, follow the lockfile and existing project scripts.

## Content source

The learning content comes from a single HTML file containing 58 AI concepts. That file is the source of truth for lesson content.

When integrating the content:

- Preserve all 58 concepts and their original order.
- Keep explanations, examples, code samples, diagrams, and relevant links intact.
- Do not invent or silently omit content.
- Verify that every concept is discoverable and can be opened.
- Report any source sections that cannot be parsed or migrated reliably.

## Responsive design

The application is designed mobile-first and should be checked at these viewport widths:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px

Lesson text and diagrams should remain readable without horizontal page overflow.

## Project principles

1. **Content first:** lesson material should dominate the interface.
2. **Simple by default:** avoid features that do not directly support learning.
3. **Accessible interactions:** support keyboard, touch, focus visibility, and reduced motion.
4. **Accurate content:** use the supplied source as the authority.
5. **No persistent tracking:** temporary interaction state is fine, but learning activity is not stored.

## Status

This README describes the intended project scope. Update it as implementation details, scripts, and verified functionality become available.
