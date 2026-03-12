# SvelteKit Portfolio Templates — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Creare 3 template SvelteKit completi (Studio, Servizi, Prodotti) con shadcn-svelte, Tailwind CSS 4 e Motion, ognuno su un branch GitHub dedicato.

**Architecture:** Ogni template è un progetto SvelteKit autonomo su branch `template/*`. Contenuto separato in `src/lib/content/*.ts`, tema via CSS custom properties in `app.css`, animazioni via `motion` package con helper centralizzati.

**Tech Stack:** SvelteKit 2, TypeScript, shadcn-svelte, Tailwind CSS 4, motion (npm), Playwright (test E2E)

**Spec:** `docs/superpowers/specs/2026-03-12-templates-design.md`

---

## Chunk 1: Repository GitHub e setup iniziale

### Task 1: Creare repository GitHub e branch main

**Files:**
- Create: `README.md`

- [ ] **Step 1: Verificare che gh CLI sia installato e autenticato**

```bash
gh auth status
```
Expected: account autenticato. Se non lo è: `gh auth login`

- [ ] **Step 2: Creare il repository su GitHub**

```bash
gh repo create Templates --public --description "SvelteKit portfolio templates con shadcn-svelte" --source=. --remote=origin --push
```

- [ ] **Step 3: Creare README principale su main**

```markdown
# Templates

Tre template SvelteKit pronti per portfolio e siti clienti.

| Branch | Template | Descrizione |
|---|---|---|
| `template/studio` | Studio | Piccolo studio creativo, single-page, tema scuro |
| `template/servizi` | Servizi | Azienda di servizi, multi-pagina, tema chiaro navy |
| `template/prodotti` | Prodotti | Azienda prodotti/SaaS, multi-pagina, blog incluso |

## Utilizzo rapido

```bash
# Scegli il template desiderato
git clone --branch template/studio https://github.com/USERNAME/Templates mio-progetto
cd mio-progetto
npm install
npm run dev
```

## Personalizzazione

Ogni template ha un `CUSTOMIZATION.md` con istruzioni dettagliate per modificare colori e contenuto.

## Stack

- [SvelteKit 2](https://svelte.dev/docs/kit)
- [shadcn-svelte](https://www.shadcn-svelte.com)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Motion](https://motion.dev)
```

- [ ] **Step 4: Commit e push main**

```bash
git add README.md
git commit -m "feat: add repository overview README"
git push -u origin main
```

---

## Chunk 2: Template 1 — Studio

### File map

```
src/
  lib/
    components/
      Navbar.svelte           # logo + anchor links
      Footer.svelte           # copyright + link
      HeroSection.svelte      # fullscreen, headline, CTA
      WorksSection.svelte     # grid progetti
      WorkCard.svelte         # singolo progetto
      ServicesSection.svelte  # 3 card servizi
      ServiceCard.svelte      # singola card servizio
      AboutSection.svelte     # bio + numeri
      ContactSection.svelte   # form placeholder
    content/
      meta.ts                 # title, description, og
      hero.ts                 # headline, subheadline, cta
      works.ts                # array progetti
      services.ts             # array servizi
      about.ts                # bio, numeri chiave
      contact.ts              # label form
    motion/
      entrance.ts             # fade+slide on scroll
      stagger.ts              # staggered entrance
  routes/
    +layout.svelte            # Navbar + Footer
    +page.svelte              # tutte le sezioni
  app.css                     # CSS custom properties tema scuro
  app.d.ts
static/
  images/
    placeholder-work.svg      # placeholder 400x300
    placeholder-about.svg     # placeholder 400x400
README.md
CUSTOMIZATION.md
.env.example
playwright.config.ts
tests/
  smoke.test.ts
```

---

### Task 2: Scaffolding branch template/studio

- [ ] **Step 1: Creare branch**

```bash
git checkout -b template/studio
```

- [ ] **Step 2: Scaffolding SvelteKit**

```bash
npx sv create . --template minimal --types ts --no-add-ons
```

Rispondere alle prompt: TypeScript → sì, ESLint → sì, Prettier → sì, Playwright → sì, Vitest → no.

- [ ] **Step 3: Installare dipendenze base**

```bash
npm install
```

- [ ] **Step 4: Aggiungere Tailwind CSS via sv**

```bash
npx sv add tailwindcss
```

- [ ] **Step 5: Inizializzare shadcn-svelte**

```bash
npx shadcn-svelte@latest init
```

Rispondere alle prompt con i default (usa `$lib` per i path, `src/app.css` per il CSS).

- [ ] **Step 6: Installare motion**

```bash
npm install motion
```

- [ ] **Step 7: Aggiungere componenti shadcn necessari**

```bash
npx shadcn-svelte@latest add button card input textarea badge separator
```

- [ ] **Step 8: Commit scaffolding**

```bash
git add -A
git commit -m "feat: scaffold Studio template with SvelteKit, shadcn-svelte, Tailwind, Motion"
```

---

### Task 3: Tema CSS — Studio (scuro, lime)

**Files:**
- Modify: `src/app.css`

- [ ] **Step 1: Sostituire il contenuto di `src/app.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

/* ===================================================
   TEMA STUDIO
   Per personalizzare: modifica le variabili qui sotto.
   Colori in formato oklch(lightness chroma hue)
   =================================================== */
:root {
  /* Palette */
  --brand-accent: oklch(0.91 0.24 130);   /* lime #C8F44A */

  /* shadcn tokens */
  --background: oklch(0.07 0 0);           /* #0A0A0A */
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.10 0 0);
  --card-foreground: oklch(0.98 0 0);
  --primary: var(--brand-accent);
  --primary-foreground: oklch(0.07 0 0);
  --secondary: oklch(0.15 0 0);
  --secondary-foreground: oklch(0.98 0 0);
  --muted: oklch(0.15 0 0);
  --muted-foreground: oklch(0.55 0 0);
  --accent: var(--brand-accent);
  --accent-foreground: oklch(0.07 0 0);
  --border: oklch(0.18 0 0);
  --input: oklch(0.18 0 0);
  --ring: var(--brand-accent);
  --radius: 0.5rem;

  /* Tipografia */
  --font-display: 'Inter', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

- [ ] **Step 2: Verificare che il dev server parta senza errori**

```bash
npm run dev
```

Expected: pagina vuota senza errori in console.

- [ ] **Step 3: Commit**

```bash
git add src/app.css
git commit -m "feat: add dark lime theme CSS variables for Studio"
```

---

### Task 4: Motion helpers — Studio

**Files:**
- Create: `src/lib/motion/entrance.ts`
- Create: `src/lib/motion/stagger.ts`

- [ ] **Step 1: Creare `src/lib/motion/entrance.ts`**

```typescript
import { animate, inView } from 'motion'

export type EntranceOptions = {
  delay?: number
  duration?: number
  y?: number
}

export function entrance(node: HTMLElement, options: EntranceOptions = {}) {
  const { delay = 0, duration = 0.6, y = 24 } = options

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  node.style.opacity = '0'
  node.style.transform = `translateY(${y}px)`

  inView(node, () => {
    animate(
      node,
      { opacity: 1, transform: 'translateY(0px)' },
      { delay, duration, easing: [0.25, 0.1, 0.25, 1] }
    )
  }, { margin: '-10% 0px' })
}
```

- [ ] **Step 2: Creare `src/lib/motion/stagger.ts`**

```typescript
import { animate, inView } from 'motion'

export type StaggerOptions = {
  delay?: number
  stagger?: number
  duration?: number
  y?: number
}

export function staggerEntrance(nodes: HTMLElement[], options: StaggerOptions = {}) {
  const { delay = 0, stagger = 0.1, duration = 0.5, y = 20 } = options

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  nodes.forEach((node) => {
    node.style.opacity = '0'
    node.style.transform = `translateY(${y}px)`
  })

  if (nodes[0]) {
    inView(nodes[0], () => {
      nodes.forEach((node, i) => {
        animate(
          node,
          { opacity: 1, transform: 'translateY(0px)' },
          { delay: delay + i * stagger, duration, easing: [0.25, 0.1, 0.25, 1] }
        )
      })
    }, { margin: '-10% 0px' })
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion/
git commit -m "feat: add Motion entrance and stagger helpers"
```

---

### Task 5: Content files — Studio

**Files:**
- Create: `src/lib/content/meta.ts`
- Create: `src/lib/content/hero.ts`
- Create: `src/lib/content/works.ts`
- Create: `src/lib/content/services.ts`
- Create: `src/lib/content/about.ts`
- Create: `src/lib/content/contact.ts`

- [ ] **Step 1: Creare `src/lib/content/meta.ts`**

```typescript
export const meta = {
  siteName: 'Studio Name',
  title: 'Studio Name — Design & Web',
  description: 'Progettiamo esperienze digitali che lasciano il segno.',
  url: 'https://example.com',
}
```

- [ ] **Step 2: Creare `src/lib/content/hero.ts`**

```typescript
export const hero = {
  tagline: 'Design. Codice. Risultati.',
  headline: 'Trasformiamo\nle tue idee\nin realtà.',
  subheadline: 'Studio di design e sviluppo web con sede a Milano. Lavoriamo con brand che vogliono distinguersi.',
  cta: {
    primary: { label: 'Vedi i nostri lavori', href: '#works' },
    secondary: { label: 'Contattaci', href: '#contact' },
  },
}
```

- [ ] **Step 3: Creare `src/lib/content/works.ts`**

```typescript
export type Work = {
  id: string
  title: string
  category: string
  description: string
  image: string
  link?: string
}

export const works: Work[] = [
  {
    id: 'progetto-1',
    title: 'Brand Identity Rossi & Co.',
    category: 'Branding',
    description: 'Identità visiva completa per studio legale milanese.',
    image: '/images/placeholder-work.svg',
  },
  {
    id: 'progetto-2',
    title: 'E-commerce Moda Italiana',
    category: 'Web Design',
    description: 'Sito e-commerce con focus su UX e conversioni.',
    image: '/images/placeholder-work.svg',
  },
  {
    id: 'progetto-3',
    title: 'App Gestionale Interno',
    category: 'UI/UX',
    description: 'Interfaccia per sistema gestionale aziendale.',
    image: '/images/placeholder-work.svg',
  },
  {
    id: 'progetto-4',
    title: 'Campagna Digitale Estate',
    category: 'Digital',
    description: 'Strategia e creatività per campagna social multicanale.',
    image: '/images/placeholder-work.svg',
  },
]
```

- [ ] **Step 4: Creare `src/lib/content/services.ts`**

```typescript
export type Service = {
  id: string
  title: string
  description: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'web-design',
    title: 'Web Design',
    description: 'Siti web moderni, veloci e ottimizzati per la conversione.',
    features: ['UI/UX Design', 'Responsive', 'SEO Ready', 'CMS integrato'],
  },
  {
    id: 'branding',
    title: 'Branding',
    description: "Identità visiva coerente che rispecchia i valori del tuo brand.",
    features: ['Logo Design', 'Brand Guidelines', 'Typography System', 'Color Palette'],
  },
  {
    id: 'sviluppo',
    title: 'Sviluppo Web',
    description: 'Applicazioni web performanti con le tecnologie più moderne.',
    features: ['SvelteKit / Next.js', 'API Integration', 'Performance', 'Accessibilità'],
  },
]
```

- [ ] **Step 5: Creare `src/lib/content/about.ts`**

```typescript
export const about = {
  headline: 'Chi siamo',
  description:
    'Siamo uno studio creativo fondato nel 2020. Uniamo estetica e funzionalità per creare esperienze digitali che fanno la differenza.',
  stats: [
    { value: '50+', label: 'Progetti completati' },
    { value: '30+', label: 'Clienti soddisfatti' },
    { value: '5', label: 'Anni di esperienza' },
  ],
  image: '/images/placeholder-about.svg',
}
```

- [ ] **Step 6: Creare `src/lib/content/contact.ts`**

```typescript
export const contact = {
  headline: 'Iniziamo a lavorare insieme',
  description: 'Hai un progetto in mente? Scrivici, ti risponderemo entro 24 ore.',
  fields: {
    name: { label: 'Nome', placeholder: 'Mario Rossi' },
    email: { label: 'Email', placeholder: 'mario@esempio.it' },
    message: { label: 'Messaggio', placeholder: 'Raccontaci del tuo progetto...' },
  },
  submit: 'Invia messaggio',
}
```

- [ ] **Step 7: Commit**

```bash
git add src/lib/content/
git commit -m "feat: add Studio content files"
```

---

### Task 6: Immagini placeholder — Studio

**Files:**
- Create: `static/images/placeholder-work.svg`
- Create: `static/images/placeholder-about.svg`

- [ ] **Step 1: Creare `static/images/placeholder-work.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#1a1a1a"/>
  <rect x="160" y="120" width="80" height="60" rx="4" fill="#333"/>
  <circle cx="200" cy="150" r="24" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
  <text x="200" y="240" text-anchor="middle" fill="#555" font-family="system-ui" font-size="12">Immagine progetto</text>
</svg>
```

- [ ] **Step 2: Creare `static/images/placeholder-about.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#1a1a1a"/>
  <circle cx="200" cy="160" r="60" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
  <ellipse cx="200" cy="300" rx="90" ry="60" fill="#2a2a2a" stroke="#444" stroke-width="1"/>
  <text x="200" y="370" text-anchor="middle" fill="#555" font-family="system-ui" font-size="12">Foto team / studio</text>
</svg>
```

- [ ] **Step 3: Commit**

```bash
git add static/
git commit -m "feat: add SVG placeholder images for Studio"
```

---

### Task 7: Componenti layout — Studio (Navbar, Footer)

**Files:**
- Create: `src/lib/components/Navbar.svelte`
- Create: `src/lib/components/Footer.svelte`

- [ ] **Step 1: Creare `src/lib/components/Navbar.svelte`**

```svelte
<script lang="ts">
  import { meta } from '$lib/content/meta'

  const links = [
    { label: 'Lavori', href: '#works' },
    { label: 'Servizi', href: '#services' },
    { label: 'Chi siamo', href: '#about' },
    { label: 'Contatti', href: '#contact' },
  ]

  let menuOpen = $state(false)
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a href="/" class="text-lg font-bold tracking-tight text-foreground">
      {meta.siteName}
    </a>

    <ul class="hidden gap-8 md:flex">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <button
      class="flex flex-col gap-1.5 md:hidden"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={menuOpen}
    >
      <span class="h-px w-6 bg-foreground transition-all" class:rotate-45={menuOpen} class:translate-y-2={menuOpen}></span>
      <span class="h-px w-6 bg-foreground transition-all" class:opacity-0={menuOpen}></span>
      <span class="h-px w-6 bg-foreground transition-all" class:-rotate-45={menuOpen} class:-translate-y-2={menuOpen}></span>
    </button>
  </nav>

  {#if menuOpen}
    <div class="border-t border-border/50 bg-background px-6 py-4 md:hidden">
      <ul class="flex flex-col gap-4">
        {#each links as link}
          <li>
            <a
              href={link.href}
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onclick={() => (menuOpen = false)}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</header>
```

- [ ] **Step 2: Creare `src/lib/components/Footer.svelte`**

```svelte
<script lang="ts">
  import { meta } from '$lib/content/meta'
</script>

<footer class="border-t border-border/50 bg-background">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
    <p class="text-sm text-muted-foreground">
      © {new Date().getFullYear()} {meta.siteName}. Tutti i diritti riservati.
    </p>
    <nav aria-label="Footer navigation">
      <ul class="flex gap-6">
        <li>
          <a href="#works" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Lavori
          </a>
        </li>
        <li>
          <a href="#contact" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contatti
          </a>
        </li>
      </ul>
    </nav>
  </div>
</footer>
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/components/Navbar.svelte src/lib/components/Footer.svelte
git commit -m "feat: add Navbar and Footer components for Studio"
```

---

### Task 8: Sezioni pagina — Studio

**Files:**
- Create: `src/lib/components/HeroSection.svelte`
- Create: `src/lib/components/WorkCard.svelte`
- Create: `src/lib/components/WorksSection.svelte`
- Create: `src/lib/components/ServiceCard.svelte`
- Create: `src/lib/components/ServicesSection.svelte`
- Create: `src/lib/components/AboutSection.svelte`
- Create: `src/lib/components/ContactSection.svelte`

- [ ] **Step 1: Creare `src/lib/components/HeroSection.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '$lib/components/ui/button/index.js'
  import { hero } from '$lib/content/hero'
  import { entrance } from '$lib/motion/entrance'

  let headlineEl: HTMLHeadingElement
  let subEl: HTMLParagraphElement
  let ctaEl: HTMLDivElement

  onMount(() => {
    entrance(headlineEl, { delay: 0.1, y: 32 })
    entrance(subEl, { delay: 0.25, y: 24 })
    entrance(ctaEl, { delay: 0.4, y: 16 })
  })
</script>

<section
  id="hero"
  class="relative flex min-h-screen items-center justify-center px-6 pt-20"
  aria-label="Hero"
>
  <div class="mx-auto max-w-4xl text-center">
    <p class="mb-6 text-sm font-medium tracking-widest text-primary uppercase">
      {hero.tagline}
    </p>
    <h1
      bind:this={headlineEl}
      class="mb-6 whitespace-pre-line text-5xl font-black leading-none tracking-tighter text-foreground md:text-7xl lg:text-8xl"
    >
      {hero.headline}
    </h1>
    <p
      bind:this={subEl}
      class="mx-auto mb-10 max-w-xl text-lg text-muted-foreground"
    >
      {hero.subheadline}
    </p>
    <div bind:this={ctaEl} class="flex flex-wrap items-center justify-center gap-4">
      <Button href={hero.cta.primary.href} size="lg" class="rounded-full px-8">
        {hero.cta.primary.label}
      </Button>
      <Button
        href={hero.cta.secondary.href}
        variant="outline"
        size="lg"
        class="rounded-full px-8"
      >
        {hero.cta.secondary.label}
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Creare `src/lib/components/WorkCard.svelte`**

```svelte
<script lang="ts">
  import type { Work } from '$lib/content/works'

  let { work }: { work: Work } = $props()
</script>

<article class="group relative overflow-hidden rounded-lg bg-card border border-border">
  <div class="aspect-video overflow-hidden">
    <img
      src={work.image}
      alt={work.title}
      loading="lazy"
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  <div class="p-6">
    <span class="mb-2 inline-block text-xs font-medium tracking-wider text-primary uppercase">
      {work.category}
    </span>
    <h3 class="mb-2 text-lg font-semibold text-foreground">{work.title}</h3>
    <p class="text-sm text-muted-foreground">{work.description}</p>
    {#if work.link}
      <a
        href={work.link}
        class="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vedi progetto →
      </a>
    {/if}
  </div>
</article>
```

- [ ] **Step 3: Creare `src/lib/components/WorksSection.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { works } from '$lib/content/works'
  import WorkCard from './WorkCard.svelte'
  import { staggerEntrance } from '$lib/motion/stagger'

  let headlineEl: HTMLElement
  let cardEls: HTMLElement[] = []

  onMount(() => {
    staggerEntrance([headlineEl, ...cardEls])
  })
</script>

<section id="works" class="px-6 py-24" aria-label="I nostri lavori">
  <div class="mx-auto max-w-6xl">
    <h2 bind:this={headlineEl} class="mb-16 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      Lavori
    </h2>
    <div class="grid gap-6 sm:grid-cols-2">
      {#each works as work, i}
        <div bind:this={cardEls[i]}>
          <WorkCard {work} />
        </div>
      {/each}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Creare `src/lib/components/ServiceCard.svelte`**

```svelte
<script lang="ts">
  import type { Service } from '$lib/content/services'

  let { service }: { service: Service } = $props()
</script>

<article class="rounded-lg border border-border bg-card p-8">
  <h3 class="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
  <p class="mb-6 text-muted-foreground">{service.description}</p>
  <ul class="flex flex-wrap gap-2">
    {#each service.features as feature}
      <li class="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
        {feature}
      </li>
    {/each}
  </ul>
</article>
```

- [ ] **Step 5: Creare `src/lib/components/ServicesSection.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { services } from '$lib/content/services'
  import ServiceCard from './ServiceCard.svelte'
  import { staggerEntrance } from '$lib/motion/stagger'

  let headlineEl: HTMLElement
  let cardEls: HTMLElement[] = []

  onMount(() => {
    staggerEntrance([headlineEl, ...cardEls], { stagger: 0.12 })
  })
</script>

<section id="services" class="px-6 py-24 bg-card/30" aria-label="Servizi">
  <div class="mx-auto max-w-6xl">
    <h2 bind:this={headlineEl} class="mb-16 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      Servizi
    </h2>
    <div class="grid gap-6 md:grid-cols-3">
      {#each services as service, i}
        <div bind:this={cardEls[i]}>
          <ServiceCard {service} />
        </div>
      {/each}
    </div>
  </div>
</section>
```

- [ ] **Step 6: Creare `src/lib/components/AboutSection.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { about } from '$lib/content/about'
  import { entrance } from '$lib/motion/entrance'

  let sectionEl: HTMLElement

  onMount(() => {
    entrance(sectionEl, { y: 20 })
  })
</script>

<section id="about" class="px-6 py-24" aria-label="Chi siamo">
  <div class="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2" bind:this={sectionEl}>
    <div>
      <h2 class="mb-6 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
        {about.headline}
      </h2>
      <p class="mb-10 text-lg text-muted-foreground">{about.description}</p>
      <dl class="grid grid-cols-3 gap-6">
        {#each about.stats as stat}
          <div>
            <dt class="text-3xl font-black text-primary">{stat.value}</dt>
            <dd class="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
          </div>
        {/each}
      </dl>
    </div>
    <div class="overflow-hidden rounded-lg">
      <img
        src={about.image}
        alt="Team dello studio"
        loading="lazy"
        class="h-full w-full object-cover"
      />
    </div>
  </div>
</section>
```

- [ ] **Step 7: Creare `src/lib/components/ContactSection.svelte`**

```svelte
<script lang="ts">
  import { contact } from '$lib/content/contact'
  import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Textarea } from '$lib/components/ui/textarea/index.js'
</script>

<section id="contact" class="px-6 py-24 bg-card/30" aria-label="Contatti">
  <div class="mx-auto max-w-2xl">
    <h2 class="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      {contact.headline}
    </h2>
    <p class="mb-10 text-lg text-muted-foreground">{contact.description}</p>

    <form
      class="flex flex-col gap-6"
      onsubmit={(e) => e.preventDefault()}
      aria-label="Form di contatto"
    >
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium text-foreground">
          {contact.fields.name.label}
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={contact.fields.name.placeholder}
          autocomplete="name"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium text-foreground">
          {contact.fields.email.label}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={contact.fields.email.placeholder}
          autocomplete="email"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="message" class="text-sm font-medium text-foreground">
          {contact.fields.message.label}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={contact.fields.message.placeholder}
          rows={5}
          required
        />
      </div>
      <Button type="submit" size="lg" class="rounded-full self-start px-8">
        {contact.submit}
      </Button>
    </form>
  </div>
</section>
```

- [ ] **Step 8: Commit**

```bash
git add src/lib/components/
git commit -m "feat: add all section components for Studio"
```

---

### Task 9: Layout e pagina principale — Studio

**Files:**
- Modify: `src/routes/+layout.svelte`
- Modify: `src/routes/+page.svelte`

- [ ] **Step 1: Modificare `src/routes/+layout.svelte`**

```svelte
<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/Navbar.svelte'
  import Footer from '$lib/components/Footer.svelte'

  let { children } = $props()
</script>

<Navbar />
<main>
  {@render children()}
</main>
<Footer />
```

- [ ] **Step 2: Modificare `src/routes/+page.svelte`**

```svelte
<script lang="ts">
  import { meta } from '$lib/content/meta'
  import HeroSection from '$lib/components/HeroSection.svelte'
  import WorksSection from '$lib/components/WorksSection.svelte'
  import ServicesSection from '$lib/components/ServicesSection.svelte'
  import AboutSection from '$lib/components/AboutSection.svelte'
  import ContactSection from '$lib/components/ContactSection.svelte'
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<HeroSection />
<WorksSection />
<ServicesSection />
<AboutSection />
<ContactSection />
```

- [ ] **Step 3: Verificare che il sito funzioni**

```bash
npm run dev
```

Aprire http://localhost:5173 e verificare che tutte le sezioni siano visibili.

- [ ] **Step 4: Commit**

```bash
git add src/routes/
git commit -m "feat: compose Studio single-page layout"
```

---

### Task 10: Documentazione e test E2E — Studio

**Files:**
- Create: `README.md`
- Create: `CUSTOMIZATION.md`
- Create: `.env.example`
- Modify: `tests/smoke.test.ts`

- [ ] **Step 1: Creare `README.md`**

```markdown
# Template Studio

Template per piccolo studio creativo / freelancer. Single-page con tema scuro e accento lime.

## Installazione

```bash
git clone --branch template/studio https://github.com/USERNAME/Templates mio-studio
cd mio-studio
npm install
npm run dev
```

## Personalizzazione rapida

1. **Colori** → modifica le variabili in `src/app.css` (sezione `TEMA STUDIO`)
2. **Contenuto** → modifica i file in `src/lib/content/`
3. **Immagini** → sostituisci i placeholder in `static/images/`

Vedi `CUSTOMIZATION.md` per dettagli completi.

## Build produzione

```bash
npm run build
npm run preview
```

## Deploy

Compatibile con Vercel, Netlify, e qualsiasi host con supporto Node.js.
```

- [ ] **Step 2: Creare `CUSTOMIZATION.md`**

```markdown
# Guida alla personalizzazione — Studio

## Cambiare i colori

Apri `src/app.css` e modifica le variabili nella sezione `:root`:

| Variabile | Descrizione | Default |
|---|---|---|
| `--brand-accent` | Colore accento principale | lime `oklch(0.91 0.24 130)` |
| `--background` | Sfondo della pagina | quasi-nero `oklch(0.07 0 0)` |
| `--foreground` | Testo principale | bianco `oklch(0.98 0 0)` |
| `--muted-foreground` | Testo secondario | grigio `oklch(0.55 0 0)` |
| `--radius` | Border radius base | `0.5rem` |

Esempio per tema viola invece di lime:
```css
--brand-accent: oklch(0.65 0.25 290); /* viola */
```

## Cambiare il contenuto

Tutti i testi sono in `src/lib/content/`:

| File | Cosa modifica |
|---|---|
| `meta.ts` | Nome sito, titolo SEO, descrizione |
| `hero.ts` | Headline, sottotitolo, CTA |
| `works.ts` | Portfolio progetti |
| `services.ts` | Servizi offerti |
| `about.ts` | Bio, statistiche |
| `contact.ts` | Label del form |

## Aggiungere un progetto

In `src/lib/content/works.ts`, aggiungere un oggetto all'array:

```typescript
{
  id: 'nuovo-progetto',
  title: 'Titolo Progetto',
  category: 'Categoria',
  description: 'Descrizione breve.',
  image: '/images/mia-immagine.webp',
  link: 'https://...',  // opzionale
}
```

## Internazionalizzazione (futuro)

I file di content sono già strutturati per supportare i18n.
Per aggiungere l'inglese, installa `svelte-i18n` e sostituisci le importazioni dai file content con `$t('chiave')`.
```

- [ ] **Step 3: Creare `.env.example`**

```
# Variabili d'ambiente
# Copia in .env e compila i valori

# PUBLIC_SITE_URL=https://tuo-dominio.it
# Aggiungi qui le variabili per l'integrazione del form (es. Resend, Formspree)
# RESEND_API_KEY=
```

- [ ] **Step 4: Scrivere test E2E in `tests/smoke.test.ts`**

```typescript
import { test, expect } from '@playwright/test'

test('homepage carica senza errori', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Studio Name/)
})

test('tutte le sezioni principali sono visibili', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#hero')).toBeVisible()
  await expect(page.locator('#works')).toBeVisible()
  await expect(page.locator('#services')).toBeVisible()
  await expect(page.locator('#about')).toBeVisible()
  await expect(page.locator('#contact')).toBeVisible()
})

test('navbar contiene i link di navigazione', async ({ page }) => {
  await page.goto('/')
  const nav = page.locator('header nav')
  await expect(nav.locator('a[href="#works"]')).toBeVisible()
  await expect(nav.locator('a[href="#contact"]')).toBeVisible()
})

test('form di contatto ha i campi richiesti', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('input[name="name"]')).toBeVisible()
  await expect(page.locator('input[name="email"]')).toBeVisible()
  await expect(page.locator('textarea[name="message"]')).toBeVisible()
})

test('nessun errore di accessibilità base', async ({ page }) => {
  await page.goto('/')
  const imagesWithoutAlt = await page.locator('img:not([alt])').count()
  expect(imagesWithoutAlt).toBe(0)
})
```

- [ ] **Step 5: Eseguire i test**

```bash
npm run build
npx playwright test
```

Expected: tutti i test passano.

- [ ] **Step 6: Commit finale e push**

```bash
git add .
git commit -m "feat: complete Studio template with docs and E2E tests"
git push -u origin template/studio
```

---

## Chunk 3: Template 2 — Servizi

### File map

```
src/
  lib/
    components/
      Navbar.svelte
      Footer.svelte
      HeroSection.svelte
      ServiceCard.svelte          # card nella home
      ServiceDetail.svelte        # contenuto pagina servizio
      WhyUsSection.svelte
      TeamCard.svelte
      StatCounter.svelte          # numero animato
      ContactForm.svelte
    content/
      meta.ts
      hero.ts
      services.ts                 # array con slug per dynamic routes
      whyus.ts
      team.ts
      about.ts
      contact.ts
    motion/
      entrance.ts
      stagger.ts
      counter.ts                  # animazione counter numeri
  routes/
    +layout.svelte
    +page.svelte                  # home
    servizi/
      +page.svelte                # lista servizi
      [slug]/
        +page.svelte              # dettaglio servizio
        +page.ts                  # load + entries per prerender
    chi-siamo/
      +page.svelte
    contatti/
      +page.svelte
  app.css
static/images/
README.md
CUSTOMIZATION.md
.env.example
tests/smoke.test.ts
```

---

### Task 11: Scaffolding branch template/servizi

- [ ] **Step 1: Creare branch da main**

```bash
git checkout main
git checkout -b template/servizi
```

- [ ] **Step 2: Scaffolding SvelteKit (identico al Task 2)**

```bash
npx sv create . --template minimal --types ts --no-add-ons
npm install
npx sv add tailwindcss
npx shadcn-svelte@latest init
npm install motion
npx shadcn-svelte@latest add button card input textarea badge separator navigation-menu
```

- [ ] **Step 3: Commit scaffolding**

```bash
git add -A
git commit -m "feat: scaffold Servizi template"
```

---

### Task 12: Tema CSS — Servizi (chiaro, navy/blu)

**Files:**
- Modify: `src/app.css`

- [ ] **Step 1: Sostituire `src/app.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

/* ===================================================
   TEMA SERVIZI
   =================================================== */
:root {
  --brand-accent: oklch(0.55 0.22 261);   /* blu #2563EB */
  --brand-navy: oklch(0.18 0.06 261);     /* navy #0F1B2D */

  --background: oklch(0.99 0.005 90);     /* bianco caldo #FAFAF8 */
  --foreground: var(--brand-navy);
  --card: oklch(1 0 0);
  --card-foreground: var(--brand-navy);
  --primary: var(--brand-accent);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.96 0.005 90);
  --secondary-foreground: var(--brand-navy);
  --muted: oklch(0.96 0.005 90);
  --muted-foreground: oklch(0.45 0.04 261);
  --accent: oklch(0.95 0.04 261);
  --accent-foreground: var(--brand-accent);
  --border: oklch(0.91 0.01 261);
  --input: oklch(0.91 0.01 261);
  --ring: var(--brand-accent);
  --radius: 0.5rem;

  --font-display: 'Inter', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app.css
git commit -m "feat: add light navy theme for Servizi template"
```

---

### Task 13: Motion helpers — Servizi

**Files:**
- Create: `src/lib/motion/entrance.ts` (identico al Task 4)
- Create: `src/lib/motion/stagger.ts` (identico al Task 4)
- Create: `src/lib/motion/counter.ts`

- [ ] **Step 1: Copiare entrance.ts e stagger.ts dal Task 4**

(codice identico, crea i file con lo stesso contenuto)

- [ ] **Step 2: Creare `src/lib/motion/counter.ts`**

```typescript
import { animate, inView } from 'motion'

export function animateCounter(node: HTMLElement, target: number, duration = 1.5) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  inView(node, () => {
    if (prefersReduced) {
      node.textContent = target.toString()
      return
    }
    animate(0, target, {
      duration,
      easing: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => {
        node.textContent = Math.round(v).toString()
      },
    })
  })
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/motion/
git commit -m "feat: add motion helpers including counter animation for Servizi"
```

---

### Task 14: Content files — Servizi

**Files:**
- Create: `src/lib/content/meta.ts`
- Create: `src/lib/content/hero.ts`
- Create: `src/lib/content/services.ts`
- Create: `src/lib/content/whyus.ts`
- Create: `src/lib/content/team.ts`
- Create: `src/lib/content/about.ts`
- Create: `src/lib/content/contact.ts`

- [ ] **Step 1: Creare `src/lib/content/services.ts`** (file più importante per le dynamic routes)

```typescript
export type ServiceFeature = {
  title: string
  description: string
}

export type Service = {
  slug: string
  title: string
  shortDescription: string
  description: string
  problem: string
  solution: string
  process: string[]
  features: ServiceFeature[]
  cta: string
}

export const services: Service[] = [
  {
    slug: 'consulenza-it',
    title: 'Consulenza IT',
    shortDescription: 'Supporto strategico per la trasformazione digitale della tua azienda.',
    description: 'Affianchiamo le aziende nel percorso di digitalizzazione, dalla valutazione dello stato attuale alla definizione della roadmap tecnologica.',
    problem: 'Molte aziende faticano a identificare le priorità tecnologiche e a integrare nuovi sistemi con quelli esistenti.',
    solution: 'Offriamo un approccio strutturato che parte dagli obiettivi di business per arrivare alle soluzioni tecnologiche più adatte.',
    process: [
      'Analisi del contesto aziendale',
      'Definizione degli obiettivi',
      'Valutazione delle soluzioni',
      'Piano di implementazione',
      'Supporto continuo',
    ],
    features: [
      { title: 'Assessment tecnologico', description: 'Valutazione completa dello stack attuale.' },
      { title: 'Roadmap digitale', description: 'Piano strutturato per la trasformazione.' },
      { title: 'Vendor selection', description: 'Selezione dei fornitori più adatti.' },
      { title: 'Change management', description: 'Supporto al cambiamento organizzativo.' },
    ],
    cta: 'Richiedi una consulenza gratuita',
  },
  {
    slug: 'sviluppo-software',
    title: 'Sviluppo Software',
    shortDescription: 'Applicazioni web e sistemi gestionali su misura per il tuo business.',
    description: "Sviluppiamo software personalizzato che si adatta ai tuoi processi, non il contrario.",
    problem: "I software standard spesso non coprono tutte le esigenze specifiche di un'azienda.",
    solution: 'Progettiamo e sviluppiamo soluzioni su misura usando tecnologie moderne e best practice.',
    process: [
      'Analisi dei requisiti',
      'Prototipazione UI/UX',
      'Sviluppo iterativo',
      'Testing e QA',
      'Deploy e manutenzione',
    ],
    features: [
      { title: 'Applicazioni web', description: 'Frontend moderni con SvelteKit, Next.js.' },
      { title: 'Sistemi gestionali', description: 'WMS, MES e ERP personalizzati.' },
      { title: 'API e integrazioni', description: 'Connessione con sistemi di terze parti.' },
      { title: 'Manutenzione', description: 'Supporto e aggiornamenti continui.' },
    ],
    cta: 'Raccontaci il tuo progetto',
  },
  {
    slug: 'formazione',
    title: 'Formazione',
    shortDescription: 'Percorsi di formazione tecnica per team aziendali.',
    description: 'Formiamo i tuoi team sulle tecnologie e metodologie che fanno la differenza.',
    problem: "L'adozione di nuove tecnologie fallisce spesso per mancanza di formazione adeguata.",
    solution: 'Percorsi di formazione pratici, calibrati sul livello del team e sugli strumenti in uso.',
    process: [
      'Valutazione del livello attuale',
      'Definizione del percorso',
      'Sessioni pratiche',
      'Materiali di riferimento',
      'Follow-up',
    ],
    features: [
      { title: 'Workshop pratici', description: 'Sessioni hands-on su tecnologie specifiche.' },
      { title: 'Percorsi custom', description: 'Formazione calibrata sul tuo team.' },
      { title: 'Materiali didattici', description: 'Documentazione e reference guide.' },
      { title: 'Supporto post-corso', description: 'Q&A e supporto nelle settimane successive.' },
    ],
    cta: 'Scopri i percorsi disponibili',
  },
]
```

- [ ] **Step 2: Creare gli altri file di content**

`src/lib/content/meta.ts`:
```typescript
export const meta = {
  siteName: 'Azienda Srl',
  title: 'Azienda Srl — Servizi IT e Consulenza',
  description: 'Consulenza IT, sviluppo software e formazione per aziende che vogliono crescere.',
  url: 'https://example.com',
}
```

`src/lib/content/hero.ts`:
```typescript
export const hero = {
  tagline: 'Tecnologia al servizio del business',
  headline: 'Soluzioni IT che fanno crescere la tua azienda',
  subheadline: 'Consulenza, sviluppo software e formazione per PMI e grandi aziende.',
  cta: {
    primary: { label: 'Scopri i servizi', href: '/servizi' },
    secondary: { label: 'Contattaci', href: '/contatti' },
  },
}
```

`src/lib/content/whyus.ts`:
```typescript
export const whyus = {
  headline: 'Perché sceglierci',
  items: [
    {
      title: 'Esperienza comprovata',
      description: 'Anni di esperienza con aziende di ogni dimensione, da startup a grandi gruppi industriali.',
    },
    {
      title: 'Approccio su misura',
      description: 'Nessuna soluzione preconfezionata. Ogni progetto parte dalle tue esigenze specifiche.',
    },
    {
      title: 'Risultati misurabili',
      description: "Definiamo KPI chiari e misuriamo i risultati durante l'intero percorso.",
    },
    {
      title: 'Supporto continuo',
      description: 'Non sparisci dopo il go-live. Siamo al tuo fianco nel tempo.',
    },
  ],
  stats: [
    { value: 80, label: 'Clienti serviti', suffix: '+' },
    { value: 95, label: 'Tasso di soddisfazione', suffix: '%' },
    { value: 10, label: 'Anni di esperienza', suffix: '' },
  ],
}
```

`src/lib/content/team.ts`:
```typescript
export type TeamMember = {
  name: string
  role: string
  bio: string
  image: string
}

export const team: TeamMember[] = [
  {
    name: 'Marco Bianchi',
    role: 'CEO & Consulente Senior',
    bio: 'Oltre 15 anni di esperienza in trasformazione digitale.',
    image: '/images/placeholder-team.svg',
  },
  {
    name: 'Laura Verdi',
    role: 'Lead Developer',
    bio: 'Specializzata in architetture cloud e sistemi distribuiti.',
    image: '/images/placeholder-team.svg',
  },
  {
    name: 'Andrea Neri',
    role: 'UX Designer',
    bio: 'Progetta interfacce che le persone amano usare.',
    image: '/images/placeholder-team.svg',
  },
]
```

`src/lib/content/about.ts`:
```typescript
export const about = {
  headline: 'La nostra storia',
  description:
    'Fondata nel 2015, siamo cresciuti da piccola software house a partner tecnologico di riferimento per decine di aziende italiane.',
  mission: 'La nostra missione è rendere la tecnologia accessibile e utile per ogni tipo di azienda.',
  values: [
    { title: 'Trasparenza', description: 'Comunichiamo in modo chiaro su costi, tempi e risultati.' },
    { title: 'Qualità', description: 'Non consegniamo nulla che non superi i nostri standard.' },
    { title: 'Innovazione', description: 'Restiamo aggiornati per portarti le soluzioni più efficaci.' },
  ],
}
```

`src/lib/content/contact.ts`:
```typescript
export const contact = {
  headline: 'Parliamo del tuo progetto',
  description: 'Compila il form o scrivici direttamente. Ti risponderemo entro un giorno lavorativo.',
  info: {
    address: 'Via Roma 1, 20100 Milano',
    email: 'info@azienda.it',
    phone: '+39 02 1234567',
    hours: 'Lun–Ven, 9:00–18:00',
  },
  fields: {
    name: { label: 'Nome e cognome', placeholder: 'Mario Rossi' },
    email: { label: 'Email aziendale', placeholder: 'mario@azienda.it' },
    company: { label: 'Azienda', placeholder: 'Nome azienda' },
    message: { label: 'Come possiamo aiutarti?', placeholder: 'Descrivi la tua esigenza...' },
  },
  submit: 'Invia richiesta',
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/
git commit -m "feat: add Servizi content files with full service data"
```

---

### Task 15: Dynamic routes servizi — Servizi

**Files:**
- Create: `src/routes/servizi/[slug]/+page.ts`
- Create: `src/routes/servizi/[slug]/+page.svelte`
- Create: `src/routes/servizi/+page.svelte`

- [ ] **Step 1: Creare `src/routes/servizi/[slug]/+page.ts`**

```typescript
import { services } from '$lib/content/services'
import { error } from '@sveltejs/kit'
import type { EntryGenerator, PageLoad } from './$types'

export const prerender = true

export const entries: EntryGenerator = () =>
  services.map((s) => ({ slug: s.slug }))

export const load: PageLoad = ({ params }) => {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) throw error(404, 'Servizio non trovato')
  return { service }
}
```

- [ ] **Step 2: Creare `src/routes/servizi/[slug]/+page.svelte`**

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import { meta } from '$lib/content/meta'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const { service } = data
</script>

<svelte:head>
  <title>{service.title} — {meta.siteName}</title>
  <meta name="description" content={service.shortDescription} />
</svelte:head>

<div class="px-6 py-24">
  <div class="mx-auto max-w-4xl">
    <a href="/servizi" class="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      ← Tutti i servizi
    </a>

    <h1 class="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      {service.title}
    </h1>
    <p class="mb-16 text-xl text-muted-foreground">{service.description}</p>

    <div class="mb-16 grid gap-8 md:grid-cols-2">
      <div class="rounded-lg bg-card border border-border p-8">
        <h2 class="mb-3 font-semibold text-foreground">Il problema</h2>
        <p class="text-muted-foreground">{service.problem}</p>
      </div>
      <div class="rounded-lg bg-primary/5 border border-primary/20 p-8">
        <h2 class="mb-3 font-semibold text-foreground">La nostra soluzione</h2>
        <p class="text-muted-foreground">{service.solution}</p>
      </div>
    </div>

    <h2 class="mb-8 text-2xl font-bold text-foreground">Come lavoriamo</h2>
    <ol class="mb-16 flex flex-col gap-4">
      {#each service.process as step, i}
        <li class="flex items-start gap-4">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
            {i + 1}
          </span>
          <span class="pt-1 text-foreground">{step}</span>
        </li>
      {/each}
    </ol>

    <h2 class="mb-8 text-2xl font-bold text-foreground">Cosa include</h2>
    <div class="mb-16 grid gap-4 sm:grid-cols-2">
      {#each service.features as feature}
        <div class="rounded-lg border border-border bg-card p-6">
          <h3 class="mb-2 font-semibold text-foreground">{feature.title}</h3>
          <p class="text-sm text-muted-foreground">{feature.description}</p>
        </div>
      {/each}
    </div>

    <div class="rounded-xl bg-primary px-8 py-10 text-center">
      <h2 class="mb-4 text-2xl font-bold text-primary-foreground">{service.cta}</h2>
      <Button href="/contatti" variant="secondary" size="lg">
        Contattaci
      </Button>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Creare `src/routes/servizi/+page.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '$lib/components/ui/button/index.js'
  import { services } from '$lib/content/services'
  import { meta } from '$lib/content/meta'
  import { staggerEntrance } from '$lib/motion/stagger'

  let cardEls: HTMLElement[] = []

  onMount(() => {
    staggerEntrance(cardEls, { stagger: 0.08 })
  })
</script>

<svelte:head>
  <title>Servizi — {meta.siteName}</title>
  <meta name="description" content="Tutti i servizi offerti da {meta.siteName}." />
</svelte:head>

<div class="px-6 py-24">
  <div class="mx-auto max-w-6xl">
    <h1 class="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      I nostri servizi
    </h1>
    <p class="mb-16 text-xl text-muted-foreground max-w-xl">
      Dalla consulenza allo sviluppo, dalla formazione al supporto continuativo.
    </p>

    <div class="grid gap-8 md:grid-cols-3">
      {#each services as service, i}
        <article
          bind:this={cardEls[i]}
          class="flex flex-col rounded-xl border border-border bg-card p-8"
        >
          <h2 class="mb-3 text-xl font-bold text-foreground">{service.title}</h2>
          <p class="mb-6 flex-1 text-muted-foreground">{service.shortDescription}</p>
          <Button href="/servizi/{service.slug}" variant="outline" class="w-full">
            Scopri di più
          </Button>
        </article>
      {/each}
    </div>
  </div>
</div>
```

- [ ] **Step 4: Commit**

```bash
git add src/routes/servizi/
git commit -m "feat: add services list and dynamic service detail pages"
```

---

### Task 16: Componenti home e pagine statiche — Servizi

**Files:**
- Create: `src/lib/components/HeroSection.svelte`
- Create: `src/lib/components/WhyUsSection.svelte`
- Create: `src/lib/components/StatCounter.svelte`
- Create: `src/routes/+page.svelte`
- Create: `src/routes/chi-siamo/+page.svelte`
- Create: `src/routes/contatti/+page.svelte`
- Create: `src/lib/components/Navbar.svelte`
- Create: `src/lib/components/Footer.svelte`
- Create: `src/routes/+layout.svelte`

- [ ] **Step 1: Creare `src/lib/components/StatCounter.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { animateCounter } from '$lib/motion/counter'

  let { value, label, suffix = '' }: { value: number; label: string; suffix?: string } = $props()

  let numberEl: HTMLElement
  let displayed = $state(0)

  onMount(() => {
    animateCounter(numberEl, value)
  })
</script>

<div class="text-center">
  <div class="text-4xl font-black text-primary" bind:this={numberEl}>0</div>
  <div class="mt-1 text-sm text-muted-foreground">{label}</div>
</div>
```

- [ ] **Step 2: Creare `src/lib/components/HeroSection.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { Button } from '$lib/components/ui/button/index.js'
  import { hero } from '$lib/content/hero'
  import { entrance } from '$lib/motion/entrance'

  let headlineEl: HTMLElement
  let subEl: HTMLElement
  let ctaEl: HTMLElement

  onMount(() => {
    entrance(headlineEl, { delay: 0.1 })
    entrance(subEl, { delay: 0.25 })
    entrance(ctaEl, { delay: 0.4 })
  })
</script>

<section class="bg-background px-6 pb-24 pt-32" aria-label="Hero">
  <div class="mx-auto max-w-6xl">
    <p class="mb-4 text-sm font-medium text-primary">{hero.tagline}</p>
    <h1
      bind:this={headlineEl}
      class="mb-6 max-w-3xl text-5xl font-black leading-tight tracking-tighter text-foreground md:text-6xl"
    >
      {hero.headline}
    </h1>
    <p bind:this={subEl} class="mb-10 max-w-xl text-lg text-muted-foreground">
      {hero.subheadline}
    </p>
    <div bind:this={ctaEl} class="flex flex-wrap gap-4">
      <Button href={hero.cta.primary.href} size="lg">{hero.cta.primary.label}</Button>
      <Button href={hero.cta.secondary.href} variant="outline" size="lg">
        {hero.cta.secondary.label}
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Creare `src/lib/components/WhyUsSection.svelte`**

```svelte
<script lang="ts">
  import { onMount } from 'svelte'
  import { whyus } from '$lib/content/whyus'
  import StatCounter from './StatCounter.svelte'
  import { staggerEntrance } from '$lib/motion/stagger'

  let cardEls: HTMLElement[] = []

  onMount(() => {
    staggerEntrance(cardEls, { stagger: 0.1 })
  })
</script>

<section class="bg-secondary/50 px-6 py-24" aria-label="Perché sceglierci">
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-16 text-3xl font-black tracking-tighter text-foreground md:text-4xl">
      {whyus.headline}
    </h2>

    <div class="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {#each whyus.items as item, i}
        <div bind:this={cardEls[i]} class="rounded-xl border border-border bg-card p-6">
          <h3 class="mb-2 font-semibold text-foreground">{item.title}</h3>
          <p class="text-sm text-muted-foreground">{item.description}</p>
        </div>
      {/each}
    </div>

    <div class="grid grid-cols-3 gap-8 border-t border-border pt-12">
      {#each whyus.stats as stat}
        <StatCounter value={stat.value} label={stat.label} />
      {/each}
    </div>
  </div>
</section>
```

- [ ] **Step 4: Creare Navbar con NavigationMenu**

```svelte
<!-- src/lib/components/Navbar.svelte -->
<script lang="ts">
  import { page } from '$app/state'
  import { Button } from '$lib/components/ui/button/index.js'
  import { meta } from '$lib/content/meta'

  const links = [
    { label: 'Servizi', href: '/servizi' },
    { label: 'Chi siamo', href: '/chi-siamo' },
  ]

  let menuOpen = $state(false)
</script>

<header class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a href="/" class="text-lg font-bold text-foreground">{meta.siteName}</a>

    <ul class="hidden items-center gap-8 md:flex">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-sm transition-colors hover:text-foreground"
            class:text-foreground={page.url.pathname.startsWith(link.href)}
            class:text-muted-foreground={!page.url.pathname.startsWith(link.href)}
            aria-current={page.url.pathname.startsWith(link.href) ? 'page' : undefined}
          >
            {link.label}
          </a>
        </li>
      {/each}
      <li>
        <Button href="/contatti" size="sm">Contattaci</Button>
      </li>
    </ul>

    <button
      class="flex flex-col gap-1.5 md:hidden"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={menuOpen}
    >
      <span class="h-px w-6 bg-foreground"></span>
      <span class="h-px w-6 bg-foreground"></span>
      <span class="h-px w-6 bg-foreground"></span>
    </button>
  </nav>

  {#if menuOpen}
    <div class="border-t border-border bg-background px-6 py-4 md:hidden">
      <ul class="flex flex-col gap-4">
        {#each links as link}
          <li>
            <a href={link.href} class="text-sm text-muted-foreground hover:text-foreground" onclick={() => (menuOpen = false)}>
              {link.label}
            </a>
          </li>
        {/each}
        <li>
          <Button href="/contatti" size="sm" class="w-full" onclick={() => (menuOpen = false)}>
            Contattaci
          </Button>
        </li>
      </ul>
    </div>
  {/if}
</header>
```

- [ ] **Step 5: Creare Footer**

```svelte
<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
  import { meta } from '$lib/content/meta'
  import { contact } from '$lib/content/contact'
  import { services } from '$lib/content/services'
</script>

<footer class="border-t border-border bg-background">
  <div class="mx-auto max-w-6xl px-6 py-16">
    <div class="grid gap-12 md:grid-cols-3">
      <div>
        <p class="mb-2 font-bold text-foreground">{meta.siteName}</p>
        <p class="text-sm text-muted-foreground">{meta.description}</p>
      </div>
      <div>
        <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Servizi</p>
        <ul class="flex flex-col gap-2">
          {#each services as service}
            <li>
              <a href="/servizi/{service.slug}" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {service.title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <div>
        <p class="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Contatti</p>
        <address class="not-italic flex flex-col gap-2">
          <span class="text-sm text-muted-foreground">{contact.info.email}</span>
          <span class="text-sm text-muted-foreground">{contact.info.phone}</span>
          <span class="text-sm text-muted-foreground">{contact.info.address}</span>
        </address>
      </div>
    </div>
    <div class="mt-12 border-t border-border pt-8">
      <p class="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {meta.siteName}. Tutti i diritti riservati.
      </p>
    </div>
  </div>
</footer>
```

- [ ] **Step 6: Creare layout e home**

`src/routes/+layout.svelte`:
```svelte
<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/Navbar.svelte'
  import Footer from '$lib/components/Footer.svelte'

  let { children } = $props()
</script>

<Navbar />
<main>
  {@render children()}
</main>
<Footer />
```

`src/routes/+page.svelte`:
```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import { meta } from '$lib/content/meta'
  import { services } from '$lib/content/services'
  import HeroSection from '$lib/components/HeroSection.svelte'
  import WhyUsSection from '$lib/components/WhyUsSection.svelte'
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<HeroSection />

<section class="px-6 py-24" aria-label="Servizi in evidenza">
  <div class="mx-auto max-w-6xl">
    <h2 class="mb-4 text-3xl font-black tracking-tighter text-foreground">I nostri servizi</h2>
    <p class="mb-12 text-muted-foreground">Soluzioni su misura per ogni esigenza aziendale.</p>
    <div class="mb-10 grid gap-6 md:grid-cols-3">
      {#each services as service}
        <a
          href="/servizi/{service.slug}"
          class="group rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-md"
        >
          <h3 class="mb-2 font-bold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p class="text-sm text-muted-foreground">{service.shortDescription}</p>
        </a>
      {/each}
    </div>
    <Button href="/servizi" variant="outline">Vedi tutti i servizi</Button>
  </div>
</section>

<WhyUsSection />

<section class="bg-primary px-6 py-20 text-center" aria-label="CTA finale">
  <div class="mx-auto max-w-2xl">
    <h2 class="mb-4 text-3xl font-black text-primary-foreground">
      Pronti a lavorare insieme?
    </h2>
    <p class="mb-8 text-primary-foreground/80">Contattaci per una consulenza gratuita senza impegno.</p>
    <Button href="/contatti" variant="secondary" size="lg">Inizia ora</Button>
  </div>
</section>
```

- [ ] **Step 7: Creare pagine Chi siamo e Contatti**

`src/routes/chi-siamo/+page.svelte` — pagina con storia, valori e team (importa da content, segue lo stesso pattern delle sezioni Studio, max 80 righe).

`src/routes/contatti/+page.svelte` — form placeholder con campi da `contact.ts` + dati aziendali.

_(Il codice di queste due pagine segue gli stessi pattern già stabiliti: import da content, layout con max-w-6xl, form con Input/Textarea da shadcn.)_

- [ ] **Step 8: Commit**

```bash
git add src/
git commit -m "feat: add all pages and components for Servizi template"
```

---

### Task 17: Immagini, docs, test e push — Servizi

- [ ] **Step 1: Aggiungere placeholder immagini** (stesso pattern Task 6, aggiungi `placeholder-team.svg`)

- [ ] **Step 2: Scrivere `README.md` e `CUSTOMIZATION.md`** (stesso pattern Task 10, adattato per Servizi — multi-pagina, dynamic routes)

- [ ] **Step 3: Scrivere test E2E `tests/smoke.test.ts`**

```typescript
import { test, expect } from '@playwright/test'

test('homepage carica', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Azienda Srl/)
})

test('link ai servizi funziona', async ({ page }) => {
  await page.goto('/')
  await page.click('a[href="/servizi"]')
  await expect(page).toHaveURL('/servizi')
})

test('pagina servizio dinamica carica', async ({ page }) => {
  await page.goto('/servizi/consulenza-it')
  await expect(page.locator('h1')).toContainText('Consulenza IT')
})

test('pagina 404 per slug inesistente', async ({ page }) => {
  const response = await page.goto('/servizi/non-esiste')
  expect(response?.status()).toBe(404)
})

test('navigazione chi-siamo funziona', async ({ page }) => {
  await page.goto('/chi-siamo')
  await expect(page.locator('h1')).toBeVisible()
})

test('nessuna immagine senza alt', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('img:not([alt])').count()).toBe(0)
})
```

- [ ] **Step 4: Eseguire test**

```bash
npm run build && npx playwright test
```

- [ ] **Step 5: Commit e push**

```bash
git add .
git commit -m "feat: complete Servizi template with docs and E2E tests"
git push -u origin template/servizi
```

---

## Chunk 4: Template 3 — Prodotti

### File map

```
src/
  lib/
    components/
      Navbar.svelte
      Footer.svelte
      HeroSection.svelte         # hero con gradient + mockup
      FeatureCard.svelte
      FeaturesSection.svelte
      HowItWorksSection.svelte
      ProductCard.svelte
      PricingCard.svelte
      PricingTable.svelte
      TestimonialCard.svelte
      BlogCard.svelte
      ContactForm.svelte
    content/
      meta.ts
      hero.ts
      features.ts
      howitworks.ts
      products.ts
      pricing.ts
      testimonials.ts
      blog.ts                    # array articoli con body Markdown
      contact.ts
    motion/
      entrance.ts
      stagger.ts
      parallax.ts
  routes/
    +layout.svelte
    +page.svelte                 # home
    prodotti/
      +page.svelte
      [slug]/
        +page.svelte
        +page.ts
    pricing/
      +page.svelte
    blog/
      +page.svelte
      [slug]/
        +page.svelte
        +page.ts
    contatti/
      +page.svelte
  app.css
static/images/
README.md
CUSTOMIZATION.md
.env.example
tests/smoke.test.ts
```

---

### Task 18: Scaffolding branch template/prodotti

- [ ] **Step 1: Creare branch da main**

```bash
git checkout main
git checkout -b template/prodotti
```

- [ ] **Step 2: Scaffold + dipendenze**

```bash
npx sv create . --template minimal --types ts --no-add-ons
npm install
npx sv add tailwindcss
npx shadcn-svelte@latest init
npm install motion marked
npx shadcn-svelte@latest add button card input textarea badge separator tabs
```

`marked` serve per renderizzare il Markdown del blog.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: scaffold Prodotti template with marked for blog"
```

---

### Task 19: Tema CSS — Prodotti (bianco, viola)

**Files:**
- Modify: `src/app.css`

- [ ] **Step 1: Sostituire `src/app.css`**

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
}

/* ===================================================
   TEMA PRODOTTI
   =================================================== */
:root {
  --brand-accent: oklch(0.55 0.27 290);        /* viola #4F39F6 */
  --brand-accent-light: oklch(0.92 0.06 290);  /* viola chiaro per sfondi */

  --background: oklch(1 0 0);
  --foreground: oklch(0.13 0.01 270);          /* quasi nero */
  --card: oklch(0.99 0 0);
  --card-foreground: oklch(0.13 0.01 270);
  --primary: var(--brand-accent);
  --primary-foreground: oklch(1 0 0);
  --secondary: var(--brand-accent-light);
  --secondary-foreground: var(--brand-accent);
  --muted: oklch(0.96 0.005 270);
  --muted-foreground: oklch(0.50 0.02 270);
  --accent: var(--brand-accent-light);
  --accent-foreground: var(--brand-accent);
  --border: oklch(0.92 0.005 270);
  --input: oklch(0.92 0.005 270);
  --ring: var(--brand-accent);
  --radius: 0.75rem;

  --font-display: 'Inter', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;

  /* Gradiente hero */
  --gradient-hero: linear-gradient(135deg, oklch(0.55 0.27 290) 0%, oklch(0.45 0.22 310) 100%);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app.css
git commit -m "feat: add bold violet theme for Prodotti template"
```

---

### Task 20: Content files — Prodotti

**Files:** tutti in `src/lib/content/`

- [ ] **Step 1: Creare `src/lib/content/products.ts`**

```typescript
export type ProductFeature = {
  title: string
  description: string
}

export type Product = {
  slug: string
  title: string
  shortDescription: string
  description: string
  features: ProductFeature[]
  image: string
  badge?: string
}

export const products: Product[] = [
  {
    slug: 'wms-cloud',
    title: 'WMS Cloud',
    shortDescription: 'Gestione magazzino intelligente, accessibile da qualsiasi dispositivo.',
    description: 'Sistema di warehouse management completamente cloud-based. Ottimizza i flussi di magazzino, riduce gli errori e migliora la produttività.',
    badge: 'Bestseller',
    features: [
      { title: 'Gestione ubicazioni', description: 'Organizza il magazzino con ubicazioni multi-livello.' },
      { title: 'Picking ottimizzato', description: 'Algoritmi per percorsi di picking efficienti.' },
      { title: 'Integrazioni ERP', description: 'Connettori per SAP, Odoo, e altri gestionali.' },
      { title: 'Dashboard real-time', description: 'KPI aggiornati in tempo reale.' },
    ],
    image: '/images/placeholder-product.svg',
  },
  {
    slug: 'mes-produzione',
    title: 'MES Produzione',
    shortDescription: 'Controllo e tracciabilità della produzione in tempo reale.',
    description: 'Manufacturing Execution System per tenere sotto controllo ogni fase del processo produttivo.',
    features: [
      { title: 'Tracciabilità lotti', description: 'Traccabilità completa dalla materia prima al prodotto finito.' },
      { title: 'OEE monitoring', description: 'Monitoraggio continuo dell\'efficienza degli impianti.' },
      { title: 'Qualità integrata', description: 'Controlli qualità integrati nel flusso produttivo.' },
      { title: 'Reporting avanzato', description: 'Report personalizzabili e schedulabili.' },
    ],
    image: '/images/placeholder-product.svg',
  },
]
```

- [ ] **Step 2: Creare `src/lib/content/pricing.ts`**

```typescript
export type PricingFeature = {
  label: string
  included: boolean | string
}

export type PricingPlan = {
  id: string
  name: string
  description: string
  price: string
  period: string
  highlighted: boolean
  cta: string
  features: PricingFeature[]
}

export const plans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Per iniziare, piccole realtà e test del prodotto.',
    price: '99',
    period: '/ mese',
    highlighted: false,
    cta: 'Inizia gratis',
    features: [
      { label: 'Fino a 3 utenti', included: true },
      { label: 'Modulo base WMS', included: true },
      { label: '10.000 movimenti/mese', included: true },
      { label: 'Supporto via email', included: true },
      { label: 'Integrazioni ERP', included: false },
      { label: 'API access', included: false },
      { label: 'SLA garantito', included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Per aziende in crescita che hanno bisogno di più potenza.',
    price: '299',
    period: '/ mese',
    highlighted: true,
    cta: 'Prova 14 giorni gratis',
    features: [
      { label: 'Fino a 15 utenti', included: true },
      { label: 'WMS + MES completo', included: true },
      { label: 'Movimenti illimitati', included: true },
      { label: 'Supporto prioritario', included: true },
      { label: 'Integrazioni ERP', included: true },
      { label: 'API access', included: true },
      { label: 'SLA 99.9%', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Per grandi aziende con esigenze personalizzate.',
    price: 'Su misura',
    period: '',
    highlighted: false,
    cta: 'Contattaci',
    features: [
      { label: 'Utenti illimitati', included: true },
      { label: 'Tutti i moduli', included: true },
      { label: 'Volume personalizzato', included: true },
      { label: 'Supporto dedicato H24', included: true },
      { label: 'Integrazioni custom', included: true },
      { label: 'API access completo', included: true },
      { label: 'SLA 99.99% garantito', included: true },
    ],
  },
]

export const pricingFaq = [
  {
    question: 'Posso cambiare piano in qualsiasi momento?',
    answer: 'Sì, puoi passare a un piano superiore o inferiore in qualsiasi momento. La variazione è effettiva dal prossimo ciclo di fatturazione.',
  },
  {
    question: 'I dati sono al sicuro?',
    answer: 'I tuoi dati sono protetti con crittografia end-to-end e backup giornalieri. I server sono in data center certificati ISO 27001 in Europa.',
  },
  {
    question: 'È possibile un periodo di prova?',
    answer: 'Sì, il piano Pro include 14 giorni di prova gratuita senza inserire dati di pagamento.',
  },
]
```

- [ ] **Step 3: Creare `src/lib/content/blog.ts`**

```typescript
export type BlogPost = {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  author: string
  readingTime: string
  body: string
}

export const posts: BlogPost[] = [
  {
    slug: 'wms-vs-gestionale',
    title: 'WMS vs modulo magazzino del gestionale: quando conviene passare?',
    date: '2026-02-15',
    tags: ['WMS', 'Gestionale', 'Magazzino'],
    excerpt: 'I moduli magazzino dei gestionali standard vanno bene per volumi piccoli. Scopri quando il salto a un WMS dedicato diventa necessario.',
    author: 'Team Redazione',
    readingTime: '5 min',
    body: `## Il limite dei moduli standard

I gestionali aziendali includono quasi sempre un modulo magazzino. Per molte aziende, questo è sufficiente. Ma quando i volumi crescono, le limitazioni emergono.

### I segnali che indicano che è ora di cambiare

- Gli operatori passano troppo tempo a cercare la merce
- Gli errori di picking aumentano
- Non riesci a tracciare in tempo reale le quantità

## Cosa offre un WMS dedicato

Un WMS (Warehouse Management System) è progettato specificamente per la logistica. Gestisce ubicazioni multi-livello, ottimizza i percorsi di picking e si integra con i sistemi di automazione.

### I vantaggi principali

1. **Accuratezza inventario**: riduzione degli errori fino al 99%
2. **Produttività picking**: +30-40% con percorsi ottimizzati
3. **Visibilità real-time**: stock aggiornato in tempo reale

## Conclusione

Se il tuo magazzino movimenta più di 500 righe al giorno, il ROI di un WMS dedicato è generalmente positivo entro 18 mesi.
`,
  },
  {
    slug: 'mes-industria-40',
    title: 'MES e Industria 4.0: come iniziare senza stravolgere tutto',
    date: '2026-01-20',
    tags: ['MES', 'Industria 4.0', 'Produzione'],
    excerpt: 'L\'Industria 4.0 sembra complessa e costosa. Ma con un approccio modulare, anche le PMI possono partire con un MES senza investimenti proibitivi.',
    author: 'Team Redazione',
    readingTime: '6 min',
    body: `## Industria 4.0 non significa rivoluzione totale

Molte aziende rimandano la digitalizzazione della produzione perché la percepiscono come un progetto enorme. In realtà, si può iniziare in piccolo.

### Il punto di partenza: misurare l'OEE

L'OEE (Overall Equipment Effectiveness) è il primo KPI da monitorare. Un MES moderno permette di calcolarlo automaticamente da ogni macchina.

## Un approccio modulare

Non è necessario implementare tutto insieme. Parti con:

1. Raccolta dati produzione (tempi ciclo, fermi)
2. Dashboard operatori
3. Gestione ordini di lavoro
4. Tracciabilità lotti (quando necessario)

## Conclusione

Un MES non deve essere un progetto da 18 mesi. Con i sistemi cloud moderni, puoi essere operativo in settimane.
`,
  },
]
```

- [ ] **Step 4: Creare gli altri file di content** (meta, hero, features, howitworks, testimonials, contact — seguendo lo stesso pattern dei template precedenti, adattando i testi al contesto prodotto SaaS)

- [ ] **Step 5: Commit**

```bash
git add src/lib/content/
git commit -m "feat: add Prodotti content files including pricing and blog posts"
```

---

### Task 21: Motion parallax helper — Prodotti

**Files:**
- Create: `src/lib/motion/parallax.ts`
- Create: `src/lib/motion/entrance.ts` (identico ai template precedenti)
- Create: `src/lib/motion/stagger.ts` (identico ai template precedenti)

- [ ] **Step 1: Creare `src/lib/motion/parallax.ts`**

```typescript
import { animate, scroll } from 'motion'

export function parallax(node: HTMLElement, speed = 0.3) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const stop = scroll(
    animate(node, { y: [`0px`, `${100 * speed}px`] }),
    { target: node.parentElement ?? node }
  )

  return { destroy: stop }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/motion/
git commit -m "feat: add parallax helper for Prodotti hero"
```

---

### Task 22: Componenti e pagine — Prodotti

**Files:** tutti i componenti e le route

- [ ] **Step 1: Creare `src/lib/components/PricingCard.svelte`**

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import type { PricingPlan } from '$lib/content/pricing'

  let { plan }: { plan: PricingPlan } = $props()
</script>

<article
  class="flex flex-col rounded-2xl border p-8"
  class:border-primary={plan.highlighted}
  class:border-border={!plan.highlighted}
  class:bg-primary={plan.highlighted}
  class:bg-card={!plan.highlighted}
  class:shadow-xl={plan.highlighted}
>
  <div class="mb-6">
    <p
      class="mb-1 text-sm font-semibold"
      class:text-primary-foreground={plan.highlighted}
      class:text-primary={!plan.highlighted}
    >
      {plan.name}
    </p>
    <div class="flex items-baseline gap-1">
      <span
        class="text-4xl font-black"
        class:text-primary-foreground={plan.highlighted}
        class:text-foreground={!plan.highlighted}
      >
        {plan.price.startsWith('S') ? plan.price : `€${plan.price}`}
      </span>
      {#if plan.period}
        <span
          class="text-sm"
          class:text-primary-foreground/70={plan.highlighted}
          class:text-muted-foreground={!plan.highlighted}
        >
          {plan.period}
        </span>
      {/if}
    </div>
    <p
      class="mt-2 text-sm"
      class:text-primary-foreground/80={plan.highlighted}
      class:text-muted-foreground={!plan.highlighted}
    >
      {plan.description}
    </p>
  </div>

  <ul class="mb-8 flex-1 flex flex-col gap-3">
    {#each plan.features as feature}
      <li class="flex items-center gap-3 text-sm">
        <span
          class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs"
          class:bg-primary-foreground={plan.highlighted && feature.included}
          class:text-primary={plan.highlighted && feature.included}
          class:bg-primary/10={!plan.highlighted && feature.included}
          class:text-primary={!plan.highlighted && feature.included}
          class:bg-muted={!feature.included}
          class:text-muted-foreground={!feature.included}
        >
          {feature.included ? '✓' : '×'}
        </span>
        <span
          class:text-primary-foreground={plan.highlighted}
          class:text-foreground={!plan.highlighted}
          class:opacity-50={!feature.included}
        >
          {feature.label}
        </span>
      </li>
    {/each}
  </ul>

  <Button
    href="/contatti"
    variant={plan.highlighted ? 'secondary' : 'outline'}
    class="w-full"
  >
    {plan.cta}
  </Button>
</article>
```

- [ ] **Step 2: Creare `src/routes/blog/[slug]/+page.ts`**

```typescript
import { posts } from '$lib/content/blog'
import { error } from '@sveltejs/kit'
import type { EntryGenerator, PageLoad } from './$types'

export const prerender = true

export const entries: EntryGenerator = () =>
  posts.map((p) => ({ slug: p.slug }))

export const load: PageLoad = ({ params }) => {
  const post = posts.find((p) => p.slug === params.slug)
  if (!post) throw error(404, 'Articolo non trovato')
  return { post }
}
```

- [ ] **Step 3: Creare `src/routes/blog/[slug]/+page.svelte`**

```svelte
<script lang="ts">
  import { marked } from 'marked'
  import { meta } from '$lib/content/meta'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const { post } = data

  const htmlContent = marked(post.body)
</script>

<svelte:head>
  <title>{post.title} — {meta.siteName}</title>
  <meta name="description" content={post.excerpt} />
</svelte:head>

<article class="px-6 py-24">
  <div class="mx-auto max-w-3xl">
    <a href="/blog" class="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      ← Tutti gli articoli
    </a>

    <div class="mb-4 flex flex-wrap gap-2">
      {#each post.tags as tag}
        <span class="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {tag}
        </span>
      {/each}
    </div>

    <h1 class="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      {post.title}
    </h1>

    <div class="mb-8 flex items-center gap-4 text-sm text-muted-foreground">
      <span>{post.author}</span>
      <span>·</span>
      <time datetime={post.date}>
        {new Date(post.date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
      <span>·</span>
      <span>{post.readingTime} di lettura</span>
    </div>

    <div
      class="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-headings:font-bold prose-a:text-primary"
    >
      {@html htmlContent}
    </div>
  </div>
</article>
```

- [ ] **Step 4: Creare tutte le route rimanenti**

`/prodotti` — catalogo prodotti con ProductCard (pattern identico a servizi)
`/prodotti/[slug]` — dettaglio prodotto (pattern simile a service detail)
`/pricing` — PricingCard per ogni piano + FAQ
`/blog` — lista BlogCard con post da `blog.ts`
`/contatti` — form con opzione "Richiedi demo"
`+layout.svelte` — Navbar (con link a /prodotti /pricing /blog) + Footer
`+page.svelte` — home con Hero (gradient viola), Features, HowItWorks, ultimi 2 post blog, CTA

- [ ] **Step 5: Commit**

```bash
git add src/
git commit -m "feat: add all pages and components for Prodotti template"
```

---

### Task 23: Docs, test e push finale — Prodotti

- [ ] **Step 1: Aggiungere `static/images/placeholder-product.svg`**

SVG con sfondo viola chiaro, icona prodotto schematica.

- [ ] **Step 2: Scrivere `README.md` e `CUSTOMIZATION.md`** (adattati a Prodotti — include sezione blog e pricing)

- [ ] **Step 3: Test E2E `tests/smoke.test.ts`**

```typescript
import { test, expect } from '@playwright/test'

test('homepage carica', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(//)
})

test('pagina pricing carica', async ({ page }) => {
  await page.goto('/pricing')
  await expect(page.locator('h1')).toBeVisible()
})

test('pagina blog carica', async ({ page }) => {
  await page.goto('/blog')
  await expect(page.locator('article')).toHaveCount({ minimum: 1 } as any)
})

test('articolo blog dinamico carica', async ({ page }) => {
  await page.goto('/blog/wms-vs-gestionale')
  await expect(page.locator('h1')).toContainText('WMS')
})

test('pagina prodotto dinamica carica', async ({ page }) => {
  await page.goto('/prodotti/wms-cloud')
  await expect(page.locator('h1')).toContainText('WMS Cloud')
})

test('nessuna immagine senza alt', async ({ page }) => {
  await page.goto('/')
  expect(await page.locator('img:not([alt])').count()).toBe(0)
})
```

- [ ] **Step 4: Build e test**

```bash
npm run build && npx playwright test
```

- [ ] **Step 5: Commit finale e push**

```bash
git add .
git commit -m "feat: complete Prodotti template with blog, pricing, docs and E2E tests"
git push -u origin template/prodotti
```

---

## Chunk 5: Verifica finale e memory

### Task 24: Aggiornare README principale su main

- [ ] **Step 1: Tornare su main e aggiornare README con link corretti**

```bash
git checkout main
```

Aggiornare `README.md` con l'URL GitHub reale (sostituire `USERNAME` con il tuo username).

- [ ] **Step 2: Push main aggiornato**

```bash
git add README.md
git commit -m "docs: update README with final GitHub URLs"
git push
```

- [ ] **Step 3: Verifica branch su GitHub**

```bash
gh repo view --web
```

Verificare che i 4 branch (main, template/studio, template/servizi, template/prodotti) siano visibili su GitHub.

---

## Note implementative

**Versioni target (verificare compatibilità prima di iniziare):**
- SvelteKit 2.x
- shadcn-svelte latest (`npx shadcn-svelte@latest`)
- Tailwind CSS 4.x
- motion (`npm install motion`)
- marked (`npm install marked` — solo Template Prodotti)

**Se `npx sv create` non supporta `--no-add-ons`:** usare la modalità interattiva e selezionare manualmente TypeScript, ESLint, Prettier, Playwright.

**Svelte 5 runes:** il codice usa la syntax runes (`$state`, `$props`, `$derived`). Verificare che il progetto sia in modalità runes (default in SvelteKit 2 con Svelte 5).

**Tailwind CSS 4 + shadcn-svelte:** la configurazione colori usa `@theme` e variabili CSS in formato OKLCH. Se `shadcn-svelte init` genera file con colori HSL, aggiornare a OKLCH come mostrato nei task tema.
