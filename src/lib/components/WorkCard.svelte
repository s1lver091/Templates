<script lang="ts">
  import { worksContent } from '$lib/content/works'
  import type { Work } from '$lib/content/works'

  let { work }: { work: Work } = $props()
</script>

<article class="group relative overflow-hidden rounded-lg bg-card border border-border">
  <div class="aspect-video overflow-hidden">
    <img
      src={work.image}
      alt={work.title}
      loading="lazy"
      class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  </div>
  <div class="p-6">
    <span class="mb-2 inline-block text-xs font-medium tracking-wider text-primary uppercase">
      {work.category}
    </span>
    <h3 class="mb-2 text-lg font-semibold text-foreground">{work.title}</h3>
    <p class="text-sm text-muted-foreground">{work.description}</p>
    {#if work.link}
      <a
        href={work.link}
        class="mt-4 inline-block text-sm font-medium text-primary hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {worksContent.linkLabel}
      </a>
    {/if}
  </div>
</article>
