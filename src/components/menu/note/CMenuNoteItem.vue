<script setup lang="ts">
import type { Note } from '@/model/Note';
import CTinyTag from './CTinyTag.vue';
import CNotePopup from './CNotePopup.vue';

interface Props {
  note: Note,
  isActive: boolean
}

defineProps<Props>();

const emit = defineEmits<{
  onClick: [],
  onDelete: []
}>();

</script>

<template>
  <div 
    class="note" 
    :class="{active: isActive}" 
    @click="$emit('onClick')">

    <div class="note-content">
      <header>
        <h5>{{ note.title }}</h5>
        <div class="tags" v-if="note.tags.length > 0">
          <CTinyTag v-for="tag in note.tags" :key="tag.id" :text="tag.text" />
        </div>
      </header>
  
      <p class="content" v-if="note.content.length > 0">{{ note.content }}</p>
  
      <p class="last-edit">30 минут назад</p>
    </div>

    <CNotePopup class="options-btn" @on-delete="$emit('onDelete')" />
  </div>
</template>

<style scoped>
.note {
  display: flex;
  align-items: start;

  border-radius: 8px;
  transition-duration: var(--transition-s);

  font: var(--font-body2);
}

.note:hover {
  background-color: var(--color-base03);
  cursor: pointer;
}

.note.active {
  background-color: var(--color-base05);
}


.note-content {
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
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
  overflow-y: hidden;
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

.options-btn {
  opacity: 0;
  margin: 0.25em;
  transition-duration: var(--transition-s);
}

.note.active .options-btn,
.note:hover .options-btn {
  opacity: 1;
  pointer-events: unset;
}
</style>