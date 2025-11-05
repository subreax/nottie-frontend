<script setup lang="ts">
import { resolveIcon, type IconId } from './IconRegister';

interface Props {
  iconId: IconId,
  size: number
}

defineProps<Props>();
</script>

<template>
  <component :is="resolveIcon(iconId)" :size="size" />
</template>