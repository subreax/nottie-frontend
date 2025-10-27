<script setup lang="ts">
import type { Component } from 'vue';
import TagIcon from './icons/TagIcon.vue';
import PlusIcon from './icons/PlusIcon.vue';

export type TagIcon = 'default' | 'plus';

interface Props {
  text: string,
  icon?: TagIcon
}

const {
  icon = 'default'
} = defineProps<Props>();

const icons2components: Record<TagIcon, Component> = {
  'default': TagIcon,
  'plus': PlusIcon
}

</script>

<template>
  <div class="tag">
    <component :is="icons2components[icon]" :size=16 />
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

  font: var(--font-body2);
}
</style>