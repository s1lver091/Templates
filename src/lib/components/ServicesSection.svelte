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
