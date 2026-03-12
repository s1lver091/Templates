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
