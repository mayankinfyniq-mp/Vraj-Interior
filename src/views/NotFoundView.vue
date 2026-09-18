<script setup>
import RevealText from '@/components/ui/RevealText.vue'
</script>

<template>
  <section class="relative flex min-h-[86svh] items-center overflow-hidden bg-ink">
    <div class="pointer-events-none absolute inset-0 opacity-[0.07]"
      style="background-image: radial-gradient(circle at 1px 1px, #f7f8f5 1px, transparent 0); background-size: 24px 24px;" />
    <div class="shell relative">
      <span class="numbered text-gold">Error 404</span>
      <RevealText text="This room does not exist." tag="h1" class="display-xl mt-6 block max-w-[18ch] !text-porcelain" />
      <p class="lede mt-6 !text-porcelain/60">The page moved, or the link was mistyped.</p>
      <div class="mt-10 flex flex-wrap gap-4">
        <RouterLink to="/" class="btn btn-gold" data-cursor="link"><span>Back home</span></RouterLink>
        <RouterLink to="/projects" class="btn btn-ghost-light" data-cursor="link"><span>See projects</span></RouterLink>
      </div>
    </div>
  </section>
</template>
