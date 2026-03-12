<script lang="ts">
  import { meta } from '$lib/content/meta'
</script>

<footer class="border-t border-border/50 bg-background">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-8">
    <p class="text-sm text-muted-foreground">
      © {new Date().getFullYear()} {meta.siteName}. Tutti i diritti riservati.
    </p>
    <nav aria-label="Footer navigation">
      <ul class="flex gap-6">
        <li>
          <a href="#works" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Lavori
          </a>
        </li>
        <li>
          <a href="#contact" class="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Contatti
          </a>
        </li>
      </ul>
    </nav>
  </div>
</footer>
