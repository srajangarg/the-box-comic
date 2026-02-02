# The Box Comic

A visual essay exploring the simulation hypothesis, technological singularity, and the nature of intelligence—presented through a chat-like interface.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI**: React 19, Tailwind CSS v4
- **Styling**: PostCSS with Tailwind

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── simulation-hook/   # Opening hook section
│   ├── simulation-why/    # Why simulations exist
│   ├── simulation-why-now/# Why simulate this era
│   └── simulation-takeoff/# The singularity/takeoff
├── components/
│   └── Chat.tsx           # Chat interface component
writing/                    # Content drafts and structure
├── structure.md           # Main outline and research notes
├── draft.md               # Full draft content
├── takeoff.md             # Takeoff section content
└── ...
public/                     # Static assets and images
```

## Key Concepts

The essay explores interconnected themes:
- **Simulation Hypothesis**: Why advanced civilizations might run simulations
- **Recursive Self-Improvement (RSI)**: How intelligence bootstraps itself
- **The Singularity**: Exponential technological progress and its implications
- **Consciousness & Memetics**: The nature of self and information patterns

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Content Guidelines

- The content is presented as a conversational chat interface
- Each section should have 1-3 representative sentences capturing the essence
- Tone is casual but intellectually rigorous
- References academic sources (Bostrom, Kurzweil, Vinge, etc.)
