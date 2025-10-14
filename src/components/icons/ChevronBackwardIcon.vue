<template>
  <svg xmlns="http://www.w3.org/2000/svg" :height="size + 'px'" :width="size + 'px'" viewBox="0 -960 960 960"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
</template>

<script setup lang="ts">
interface Props {
  size: number
}

defineProps<Props>();
</script>

<style scoped>
svg { fill: currentColor; }
</style>