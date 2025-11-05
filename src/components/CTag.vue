<script setup lang="ts">
import Icon from './icons/Icon.vue';
import type { IconId } from './icons/IconRegister';

interface Props {
  text: string,
  icon?: IconId
}

const {
  icon = 'tag'
} = defineProps<Props>();
</script>

<template>
  <div class="tag">
    <Icon :icon-id="icon" :size="16" />
    <span>{{ text }}</span>
  </div>
</template>

<style scoped>
.tag {
  padding: 8px;
  background-color: var(--color-base10);
  border-radius: 8px;

  display: inline-flex;
  gap: 4px;
  align-items: center;

  font: var(--font-body2);
}
</style>