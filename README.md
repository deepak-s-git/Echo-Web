# Echo Web

This repository contains the marketing website and distribution endpoint for **Echo** — a lightweight, privacy-first workflow memory assistant for macOS.

The actual macOS application source code is maintained in a separate, proprietary repository.

## Overview
This site is built with Next.js and serves three primary purposes:
1. **Landing Page:** Showcases Echo's features (Workflow Timeline, Smart Timing Rules, Custom Aesthetics) to users.
2. **Lead Generation:** Provides a secure download form to capture emails and distribute the `Echo.zip` application bundle.
3. **Update Distribution (Sparkle):** Hosts the `appcast.xml` and release binaries required by the Sparkle auto-update framework to silently push updates to active macOS users.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
