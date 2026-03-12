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
