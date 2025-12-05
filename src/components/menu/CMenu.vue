<script setup lang="ts">
import type { Note } from '@/model/Note';
import CMenuItem from './CMenuItem.vue';
import CMenuNoteItem from './note/CMenuNoteItem.vue';
import Icon from '../icons/Icon.vue';

interface Props {
  notes: Note[],
  selectedNote: Note
}

defineProps<Props>();

const emit = defineEmits<{
  onNewNote: [],
  onSearch: [],
  onNoteSelected: [note: Note],
  onDelete: [note: Note]
}>();

</script>

<template>
  <div class="menu">
    <div class="menu-items">
      <CMenuItem 
        @on-click="$emit('onNewNote')" 
        icon="add-note" 
        text="Новая заметка" />

      <CMenuItem 
        @on-click="$emit('onSearch')" 
        icon="search" 
        text="Поиск" />
    </div>

    <header>
      <h5 class="notes-title">Заметки</h5>
      <Icon icon-id="filter" :size="24" />
    </header>

    <CMenuNoteItem 
      v-for="note in notes"
      :note 
      class="note" 
      :is-active="selectedNote.id === note.id"
      @on-click="$emit('onNoteSelected', note)"
      @on-delete="$emit('onDelete', note)" />
  </div>
</template>

<style scoped>
.menu {
  padding: 8px;
}

.menu-items {
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 16px;
  margin-bottom: 32px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-base70);

  font: var(--font-body2);

  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 8px;
}

header p {
  margin: 0;
}

.notes-title {
  margin: 0;
  font: var(--font-h5);
}

.note {
  margin-top: 8px;
  margin-bottom: 8px;
}

.h-line {
  height: 1px;
  background-color: var(--color-base10);
}

</style>