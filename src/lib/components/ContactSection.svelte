<script lang="ts">
  import { contact } from '$lib/content/contact'
  import { Button } from '$lib/components/ui/button/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Textarea } from '$lib/components/ui/textarea/index.js'
</script>

<section id="contact" class="px-6 py-24 bg-card/30" aria-label="Contatti">
  <div class="mx-auto max-w-2xl">
    <h2 class="mb-4 text-4xl font-black tracking-tighter text-foreground md:text-5xl">
      {contact.headline}
    </h2>
    <p class="mb-10 text-lg text-muted-foreground">{contact.description}</p>

    <form
      class="flex flex-col gap-6"
      onsubmit={(e) => e.preventDefault()}
      aria-label="Form di contatto"
    >
      <div class="flex flex-col gap-2">
        <label for="name" class="text-sm font-medium text-foreground">
          {contact.fields.name.label}
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder={contact.fields.name.placeholder}
          autocomplete="name"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="email" class="text-sm font-medium text-foreground">
          {contact.fields.email.label}
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={contact.fields.email.placeholder}
          autocomplete="email"
          required
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="message" class="text-sm font-medium text-foreground">
          {contact.fields.message.label}
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder={contact.fields.message.placeholder}
          rows={5}
          required
        />
      </div>
      <Button type="submit" size="lg" class="rounded-full self-start px-8">
        {contact.submit}
      </Button>
    </form>
  </div>
</section>
