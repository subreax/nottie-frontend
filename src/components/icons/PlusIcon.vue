<script setup lang="ts">
interface Props {
  size: number
}

defineProps<Props>();
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :height="size + 'px'" 
    viewBox="0 -960 960 960" 
    :width="size + 'px'">
    <path d="M444-444H240v-72h204v-204h72v204h204v72H516v204h-72v-204Z"/>
  </svg>
</template>

<style scoped>
svg { fill: currentColor; }
</style>