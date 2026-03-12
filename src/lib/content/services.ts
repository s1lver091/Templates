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
