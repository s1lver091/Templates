<script lang="ts">
  import { meta } from '$lib/content/meta'

  const links = [
    { label: 'Lavori', href: '#works' },
    { label: 'Servizi', href: '#services' },
    { label: 'Chi siamo', href: '#about' },
    { label: 'Contatti', href: '#contact' },
  ]

  let menuOpen = $state(false)
</script>

<header class="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
  <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
    <a href="/" class="text-lg font-bold tracking-tight text-foreground">
      {meta.siteName}
    </a>

    <ul class="hidden gap-8 md:flex">
      {#each links as link}
        <li>
          <a
            href={link.href}
            class="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        </li>
      {/each}
    </ul>

    <button
      class="flex flex-col gap-1.5 md:hidden"
      onclick={() => (menuOpen = !menuOpen)}
      aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
      aria-expanded={menuOpen}
    >
      <span class="h-px w-6 bg-foreground transition-all" class:rotate-45={menuOpen} class:translate-y-2={menuOpen}></span>
      <span class="h-px w-6 bg-foreground transition-all" class:opacity-0={menuOpen}></span>
      <span class="h-px w-6 bg-foreground transition-all" class:-rotate-45={menuOpen} class:-translate-y-2={menuOpen}></span>
    </button>
  </nav>

  {#if menuOpen}
    <div class="border-t border-border/50 bg-background px-6 py-4 md:hidden">
      <ul class="flex flex-col gap-4">
        {#each links as link}
          <li>
            <a
              href={link.href}
              class="text-sm text-muted-foreground transition-colors hover:text-foreground"
              onclick={() => (menuOpen = false)}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</header>
