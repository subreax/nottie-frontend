<script setup lang="ts">
import type { Note } from '@/model/Note';

defineProps<{
  note: Note
}>();

defineEmits<{
  click: [note: Note]
}>();
</script>

<template>
<div class="note grey" @click="$emit('click', note)">
  <header class="title">{{ note.title }}</header>
  <p class="content">{{ note.content }}</p>
</div>
</template>

<style scoped>
.note {
  padding: 32px;
  border-radius: 32px;
  transition-duration: var(--transition-s);
  cursor: pointer;
}

.title {
  font: var(--font-h4);
  padding-bottom: 0.6rem;

  overflow-wrap: break-word;
}

.content {
  margin: 0;
  max-height: 6em;
  text-overflow: ellipsis; /* todo */
  overflow: hidden;
  color: var(--color-text-variant);
}

.note.grey {
  background-color: var(--color-gray05);
}
</style>