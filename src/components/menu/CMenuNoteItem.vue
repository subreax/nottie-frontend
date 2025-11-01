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
      <div class="tags" v-if="note.tags.length > 0">
        <CTinyTag v-for="tag in note.tags" :key="tag.id" :text="tag.text" :icon="tag.iconId" />
      </div>
    </header>

    <p class="content" v-if="note.content.length > 0">{{ note.content }}</p>

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

header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

h5 {
  font: var(--font-h5);
  margin: 0;
}

.tags {
  color: var(--color-base70);
}

.content {
  height: auto;
  margin: 0;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space-collapse: preserve-breaks;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  -webkit-line-clamp: 3;
}

.last-edit {
  margin: 0;
  color: var(--color-base70);
}
</style>