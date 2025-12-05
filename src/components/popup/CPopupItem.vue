<script setup lang="ts">
interface Props {
  text: string,
}

defineProps<Props>();

defineEmits<{
  click: []
}>();

</script>

<template>
  <div class="popup-item" @click="$emit('click')">
    {{ text }}
  </div>
</template>

<style scoped>
.popup-item {
  font: var(--font-body2);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
}

.popup-item:hover {
  background-color: var(--color-base30);
}
</style>