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
