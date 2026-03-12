# Design Spec — SvelteKit Portfolio Templates

**Data:** 2026-03-12
**Progetto:** Templates (repository GitHub)
**Obiettivo:** Creare 3 template SvelteKit pronti per portfolio e siti clienti, moderni, responsive e facilmente personalizzabili.

---

## Contesto

Template da utilizzare per clienti di una SRL di sviluppo web e sistemi WMS/MES custom. Ogni template è un progetto SvelteKit autonomo, gestito su un branch dedicato del repository GitHub `Templates`.

---

## Stack tecnico

| Tecnologia | Versione | Motivo |
|---|---|---|
| SvelteKit | 2.x | Framework SSR/SSG, routing, performance |
| TypeScript | 5.x | Tipizzazione, manutenibilità |
| shadcn-svelte | latest | Componenti UI accessibili e personalizzabili |
| Tailwind CSS | 4.x | Utility classes, design system |
| Motion One | latest | Animazioni leggere (~2KB), Web Animations API |

---

## Architettura comune

### Struttura directory
```
src/
  lib/
    components/     # componenti riutilizzabili (Navbar, Footer, Section, ecc.)
    content/        # testi e dati separati dai componenti (i18n-ready)
    motion/         # helpers Motion One (entrance, scroll triggers)
  routes/           # pagine SvelteKit
  app.css           # CSS custom properties per tema
static/
  fonts/
  images/
docs/
README.md
CUSTOMIZATION.md
.env.example
```

### Sistema di temi (CSS custom properties)
Ogni template definisce il proprio tema in `src/app.css`:
```css
:root {
  --color-primary: ...;
  --color-primary-foreground: ...;
  --color-background: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-border: ...;
  --radius: ...;
  --font-sans: ...;
  --font-display: ...;
}
```
Personalizzare il tema = modificare queste variabili.

### Contenuto i18n-ready
I file `src/lib/content/*.ts` esportano oggetti TypeScript con tutti i testi. I componenti importano da questi file e non contengono testo hardcoded. In futuro si sostituisce l'import con una libreria i18n (es. `svelte-i18n`) senza toccare i componenti.

### Animazioni
Motion One usato via helper in `src/lib/motion/`:
- `entrance(node, options)` — fade+slide all'entrata nel viewport
- `stagger(nodes, options)` — entrata scalata per liste/grid
- Rispetto automatico di `prefers-reduced-motion`

---

## Template 1 — Studio

**Branch:** `template/studio`
**Target:** freelancer, piccolo studio creativo, agenzia boutique

### Direzione artistica
- Tema: scuro
- Background: `#0A0A0A`
- Testo: `#FFFFFF`
- Accento: `#C8F44A` (lime elettrico)
- Tipografia: grande, d'impatto, molto spazio

### Struttura
Single-page con anchor scroll:

| Sezione | Descrizione |
|---|---|
| Hero | Full-screen, headline bold, sottotitolo, CTA |
| Works | Grid progetti con hover effect |
| Services | 3 card servizi principali |
| About | Breve bio/studio, 2-3 numeri chiave |
| Contact | Form placeholder (nome, email, messaggio) |

### Routing
```
/   → unica pagina con scroll anchor
```

---

## Template 2 — Servizi

**Branch:** `template/servizi`
**Target:** società di consulenza, IT services, studio professionale

### Direzione artistica
- Tema: chiaro
- Background: `#FAFAF8`
- Testo: `#0F1B2D` (navy)
- Accento: `#2563EB` (blu elettrico)
- Stile: corporate moderno, trasmette fiducia

### Struttura
Multi-pagina:

| Route | Contenuto |
|---|---|
| `/` | Hero, panoramica servizi, perché sceglierci, CTA |
| `/servizi` | Lista completa servizi con filtro categoria |
| `/servizi/[slug]` | Pagina servizio: problema → soluzione → processo → CTA |
| `/chi-siamo` | Storia, team, valori, numeri chiave |
| `/contatti` | Form placeholder, dati aziendali, mappa placeholder |

### Architettura contenuto
Servizi come array in `src/lib/content/services.ts`. Le pagine `/servizi/[slug]` si generano automaticamente via SvelteKit dynamic routes.

---

## Template 3 — Prodotti

**Branch:** `template/prodotti`
**Target:** azienda SaaS, prodotto digitale, software gestionale (WMS/MES)

### Direzione artistica
- Tema: chiaro con energia
- Background: `#FFFFFF`
- Testo: `#111827`
- Accento: `#4F39F6` (viola intenso) con gradiente su hero e CTA
- Stile: bold, tech-forward

### Struttura
Multi-pagina:

| Route | Contenuto |
|---|---|
| `/` | Hero con product mockup, Features, Come funziona, Pricing teaser, ultimi articoli, CTA |
| `/prodotti` | Catalogo con filtro categoria |
| `/prodotti/[slug]` | Descrizione, features, screenshot, CTA |
| `/pricing` | Tabella piani (Starter/Pro/Enterprise), FAQ |
| `/blog` | Lista articoli con filtro tag/categoria |
| `/blog/[slug]` | Articolo + related posts |
| `/contatti` | Form placeholder + opzione "richiedi demo" |

### Architettura contenuto
- `src/lib/content/products.ts` — array prodotti
- `src/lib/content/pricing.ts` — piani e features
- `src/lib/content/blog.ts` — array articoli (title, slug, date, tags, excerpt, body Markdown)

Struttura dati pronta per sostituzione con CMS headless senza refactoring dei componenti.

---

## Repository GitHub

**Nome:** `Templates`
**Branch:**

| Branch | Contenuto |
|---|---|
| `main` | README generale con panoramica dei 3 template |
| `template/studio` | Template 1 |
| `template/servizi` | Template 2 |
| `template/prodotti` | Template 3 |

**Ogni branch include:**
- `README.md` — installazione, personalizzazione, deploy
- `CUSTOMIZATION.md` — guida CSS variables e content files
- `.env.example` — variabili d'ambiente vuote

**Workflow nuovo cliente:**
```bash
git clone --branch template/servizi https://github.com/USERNAME/Templates
# modifica src/lib/content/ e src/app.css
```

---

## Vincoli di sviluppo

- Codice leggibile, autoesplicativo, nomi significativi
- Max 3 livelli di indentazione
- Nessuna emoji nel codice
- Commenti solo per logica non immediatamente comprensibile
- Componenti con il minimo codice necessario, nessuna duplicazione
- Performance: lazy loading immagini, bundle ottimizzato
- Accessibilità: aria-label, ruoli semantici, focus management
- Form: placeholder, pronti per integrazione futura
- Contenuto: solo italiano, architettura i18n-ready
