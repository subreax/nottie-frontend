<script setup lang="ts">
import Icon from '../icons/Icon.vue';
import type { IconId } from '../icons/IconRegister';

interface Props {
  icon: IconId,
  text: string
}

defineProps<Props>();

defineEmits<{
  onClick: []
}>();
</script>

<template>
  <div class="item" @click="$emit('onClick')">
    <Icon :icon-id="icon" :size="20" /> 
    <p class="text">{{ text }}</p>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 8px;
  
  font: var(--font-body2);

  text-wrap: nowrap;
}

.item,
.text {
  transition-duration: var(--transition-s);
}

.item:hover {
  background-color: var(--color-base05);
  cursor: pointer;
}

.text {
  margin: 0;
}
</style>