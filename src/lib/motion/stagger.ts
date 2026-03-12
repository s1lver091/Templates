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
