<script setup lang="ts">
defineEmits<{
  onClick: []
}>();
</script>

<template>
  <div class="item" @click="$emit('onClick')">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 8px;
  
  font: var(--font-body2);

  border-radius: 8px;
  padding: 6px 8px;

  transition-duration: var(--transition-s);
}

.item:hover {
  background-color: var(--color-base05);
  cursor: pointer;
}
</style>