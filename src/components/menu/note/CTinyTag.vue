<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue';

interface Props {
  text: string
}

defineProps<Props>();
</script>

<template>
  <div class="tag">
    <Icon :icon-id="'tag'" :size=16 />
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