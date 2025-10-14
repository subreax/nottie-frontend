<script setup lang="ts">
interface Props {
    size?: number
}

const { size = 24 } = defineProps<Props>();
</script>

<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 -960 960 960">
    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
</svg>
</template>

<style scoped>
svg {
    fill: currentColor;
}
</style>