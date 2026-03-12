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
