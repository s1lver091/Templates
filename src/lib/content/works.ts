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
