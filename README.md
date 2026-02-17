# Personal Portfolio

A modern personal portfolio built with Next.js App Router, React 19, TypeScript, Tailwind CSS v4, Framer Motion, and Three.js.

## Overview

This project is a single-page portfolio site with animated sections, a dynamic 3D/starfield background, and a working contact form powered by a Next.js API route and Resend.

## Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP
- Three.js via `@react-three/fiber` and `@react-three/drei`
- Resend (email delivery for contact form)
- Bun (runtime used by project scripts)

## Features

- Section-based portfolio layout: Hero, About, Skills, Highlights, Experience, Contact
- Reusable portfolio data source in `src/data/portfolio.ts`
- Animated UI elements and scroll progress
- Dynamic client-side 3D background canvas
- Contact form API with validation, sanitization, and Resend integration

## Getting Started

### Prerequisites

- Bun installed (`bun --version`)
- Node.js 20+ recommended for tooling compatibility

### Install dependencies

```bash
bun install
```

### Configure environment variables

1. Copy example env file:

```bash
cp .env.local.example .env.local
```

2. Set values in `.env.local`:

- `RESEND_API_KEY`: your Resend API key (must start with `re_`)
- `CONTACT_TO_EMAIL`: recipient inbox for contact form messages
- `CONTACT_FROM_EMAIL`: verified sender address in Resend (for production)

### Run development server

```bash
bun run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `bun run dev` - start local development server
- `bun run build` - production build
- `bun run start` - run production build locally
- `bun run lint` - run ESLint

## Project Structure

```text
src/
  app/
    api/contact/route.ts      # Contact form backend endpoint
    globals.css
    layout.tsx
    page.tsx                  # Main page composition
  components/
    layout/
    sections/
    three/
    ui/
  data/
    portfolio.ts              # Main portfolio content/config
  hooks/
    useMousePosition.ts
```

## Contact API Notes

The API route lives at `src/app/api/contact/route.ts` and:

- validates request shape and field sizes
- validates email format
- sanitizes user input
- rejects missing/placeholder Resend API keys
- sends formatted HTML email via Resend

If email is not configured, the endpoint returns `503` with a clear error message.

## Customizing Content

Update `src/data/portfolio.ts` to edit:

- personal information
- hero section text and CTA labels
- skills/categories
- highlights and achievements
- work experience

## Deployment

Deploy on Vercel or any platform that supports Next.js.

Set the same environment variables in your hosting provider:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

For production email delivery, ensure `CONTACT_FROM_EMAIL` is a verified sender/domain in Resend.
