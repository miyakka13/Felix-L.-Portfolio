# Felix Lömahàn — Portfolio

Production-ready React/TypeScript portfolio for Felix Lömahàn, Senior Compliance Officer & AML Consultant.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion, Lucide React
- Radix UI primitives (Dialog, Sheet)

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Type check:

```bash
npx tsc -b
```

## Environment

Copy `.env.example` to `.env` and set `VITE_CONTACT_EMAIL` only after Felix confirms a verified professional email. By default the contact section uses an honest fallback (LinkedIn CTA + notice).

## Deployment (Vercel)

1. Push to GitHub.
2. Import into Vercel; framework auto-detected as Vite.
3. Build command: `npm run build`, output: `dist`.
4. Set `VITE_CONTACT_EMAIL` in Vercel env vars if applicable.

## Data & verification

All professional data lives in `src/data/` (`profile.ts`, `experience.ts`, `certifications.ts`, `education.ts`). Verification status is flagged per entry.

## Name spelling

The exact spelling "Felix Lömahàn" and the LinkedIn URL are used verbatim throughout.
