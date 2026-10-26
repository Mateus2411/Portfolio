<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import CursorFx from './components/CursorFx.vue'
import { lenis } from './lib/motion'

const route = useRoute()
// toda troca de página volta pro topo
watch(() => route.path, () => lenis.scrollTo(0, { immediate: true }))
</script>

<template>
  <CursorFx />
  <router-view />
</template>
