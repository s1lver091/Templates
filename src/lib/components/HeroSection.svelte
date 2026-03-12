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
