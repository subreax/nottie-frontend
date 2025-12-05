<script setup lang="ts">
defineEmits<{
  click: [event: Event]
}>();
</script>

<template>
<button @click="(e: Event) => $emit('click', e)">
  <slot></slot>
</button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  padding: 0.5em;
  line-height: 0;

  aspect-ratio: 1;
  border-radius: 50%;
  
  transition-duration: var(--transition-s);
  cursor: pointer;
}

button:hover {
  background-color: var(--color-base10);
}

button:active {
  background-color: var(--color-pressed);
}
</style>