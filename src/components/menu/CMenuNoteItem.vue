<script setup lang="ts">
import type { Note } from '@/model/Note';
import CTinyTag from './CTinyTag.vue';

interface Props {
  note: Note
}

defineProps<Props>();

defineEmits<{
  onClick: [note: Note]
}>();

</script>

<template>
  <div class="note" @click="$emit('onClick', note)">
    <header>
      <h5>{{ note.title }}</h5>
      <div class="tags" v-if="note.tags?.length > 0">
        <CTinyTag v-for="tag in note.tags" :key="tag.id" :text="tag.text" :icon="tag.iconId" />
      </div>
    </header>
  
    <p class="content">{{ note.content }}</p>
  
    <p class="last-edit">30 минут назад</p>
  </div>
</template>

<style scoped>
.note {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;

  font: var(--font-body2);

  transition-duration: var(--transition-s);
}

.note:hover {
  background-color: var(--color-base05);
  cursor: pointer;
}

h5 {
  font: var(--font-h5);
  margin: 0;
}

.tags {
  color: var(--color-base70);
}

.content {
  margin: 0;
  max-height: calc(2em * 1.25);
  overflow: hidden;
}

.last-edit {
  margin: 0;
  color: var(--color-base70);
  font: var(--font-body2);
}
</style>