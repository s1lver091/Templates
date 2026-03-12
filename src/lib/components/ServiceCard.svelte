<script lang="ts">
  import type { Service } from '$lib/content/services'

  let { service }: { service: Service } = $props()
</script>

<article class="rounded-lg border border-border bg-card p-8">
  <h3 class="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
  <p class="mb-6 text-muted-foreground">{service.description}</p>
  <ul class="flex flex-wrap gap-2">
    {#each service.features as feature}
      <li class="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
        {feature}
      </li>
    {/each}
  </ul>
</article>
