<script lang="ts">
  import { meta } from '$lib/content/meta'
  import HeroSection from '$lib/components/HeroSection.svelte'
  import WorksSection from '$lib/components/WorksSection.svelte'
  import ServicesSection from '$lib/components/ServicesSection.svelte'
  import AboutSection from '$lib/components/AboutSection.svelte'
  import ContactSection from '$lib/components/ContactSection.svelte'
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
</svelte:head>

<HeroSection />
<WorksSection />
<ServicesSection />
<AboutSection />
<ContactSection />
