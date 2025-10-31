<script setup lang="ts">
import type { TagIconId } from '@/model/Tag';
import { resolveTagIcon } from '../icons/TagIcons';

interface Props {
  text: string,
  icon?: TagIconId
}

const {
  icon = 'default'
} = defineProps<Props>();

</script>

<template>
  <div class="tag">
    <component :is="resolveTagIcon(icon)" :size=16 />
    <span>{{ text }}</span>
  </div>
</template>

<style scoped>
.tag {
  display: inline-flex;
  gap: 4px;
  align-items: center;

  font: var(--font-body2);
}
</style>