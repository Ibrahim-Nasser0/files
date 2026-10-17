# StudySync (Campus OS) · Next.js + TypeScript + Tailwind CSS

> An enterprise-grade, institutional campus operating system for deterministic bylaw attendance, encrypted dynamic QR verification, curriculum ML modeling, and academic early-warning systems.

---

## 🚀 Technology Stack & Packages

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, interface contracts)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens & glassmorphic utilities
- **Typography**: Optimized zero-layout-shift Google Fonts (`Inter` & `Cairo` via `next/font/google`)
- **Iconography**: [lucide-react](https://lucide.dev/) (Industry standard dependable SVG icon system)
- **Animations & Micro-interactions**: [framer-motion](https://www.framer.com/motion/)
- **Utility Libraries**:
  - `clsx` & `tailwind-merge` (`cn` helper)
  - `canvas-confetti` (Celebration effects upon verified attendance check-in)
- **Internationalization (i18n)**: Native bilingual English (LTR) & Arabic (RTL) support with dynamic `dir="rtl"` adaptation

---

## 📂 Project Architecture

```
studysync-next/
├── public/                 # Static assets, SVG icons, and campus graphics
├── src/
│   ├── app/
│   │   ├── globals.css     # Tailwind v4 configuration, theme tokens, print styles
│   │   ├── layout.tsx      # Root layout with Inter & Cairo fonts and LanguageProvider
│   │   └── page.tsx        # Single-page application entry point
│   ├── components/
│   │   ├── common/
│   │   │   └── Icon.tsx    # Typed Lucide icon wrapper
│   │   ├── Header.tsx      # Sticky blur navbar with language switch & print action
│   │   ├── Hero.tsx        # Dynamic QR rotation, simulated check-in, portal mockup
│   │   ├── Overview.tsx    # Problem vs. architecture transformation view
│   │   ├── Features.tsx    # 9 modular platform capabilities (MOD #01-09)
│   │   ├── UserRoles.tsx   # Multi-role governance (Student, TA, Doctor, Admin)
│   │   ├── Workflows.tsx   # 5-step operational architecture pipeline
│   │   ├── AISection.tsx   # NLP syllabus classification & recommendation engine
│   │   ├── Architecture.tsx# 4-tier interactive infrastructure stack
│   │   ├── RiskDetection.tsx# Interactive Bylaw Policy Simulator (sliders & rules)
│   │   ├── Roadmap.tsx     # Strategic milestones & timeline nodes
│   │   ├── Team.tsx        # Engineering group cards with glowing avatars
│   │   ├── Footer.tsx      # Campus OS branding, quick links, system status
│   │   └── BackToTop.tsx   # Floating smooth-scroll button
│   ├── context/
│   │   └── LanguageContext.tsx # Typed i18n context with localStorage persistence
│   ├── locales/
│   │   ├── en.json         # Complete English translation catalog
│   │   └── ar.json         # Complete Arabic translation catalog
│   ├── lib/
│   │   └── utils.ts        # Type-safe class merging utility (cn)
│   └── types/
│       └── index.ts        # TypeScript data contracts & models
└── package.json
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) (or the active port) in your browser.

### 3. Production Build
```bash
npm run build
npm run start
```
