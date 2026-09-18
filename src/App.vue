<script setup>
import Toast from 'primevue/toast'
import Preloader from '@/components/layout/Preloader.vue'
import CursorRing from '@/components/layout/CursorRing.vue'
import SiteLayout from '@/components/layout/SiteLayout.vue'
</script>

<template>
  <Preloader />
  <CursorRing />
  <Toast position="bottom-right" />
  <SiteLayout />
</template>
