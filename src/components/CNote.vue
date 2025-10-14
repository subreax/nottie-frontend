<script setup lang="ts">
import type { Note } from '@/Note';

defineProps<{
  note: Note
}>();
</script>

<template>
<div class="note yellow">
  <header class="title">{{ note.title }}</header>
  <p class="content">{{ note.content }}</p>
</div>
</template>

<style scoped>
.note {
  padding: 16px;
  border: 1px solid black;
  border-radius: 12px;
  transition-duration: var(--transition-s);
  cursor: pointer;
}

.content {
  line-height: 1.2;
  max-height: 6em;
  text-overflow: ellipsis; /* todo */
  overflow: hidden;
}

p {
  margin: 0;
}

.title {
  font-size: 18px;
  font-weight: 500;
  padding-bottom: 8px;
}

.note.yellow {
  background-color: rgb(255, 249, 232);
  border-color: rgb(255, 211, 161);
}

.note.yellow:hover {
  background-color: rgb(255, 243, 211);
}
</style>