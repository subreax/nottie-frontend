<script setup lang="ts">
import TagIcon from '../icons/TagIcon.vue';

interface Props {
  text: string
}

defineProps<Props>();
</script>

<template>
  <div class="tag">
    <TagIcon :size=16 />
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