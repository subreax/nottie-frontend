<script setup lang="ts">
import type { Note } from '@/model/Note';
import CMenuItem from './CMenuItem.vue';
import ChevronBackwardIcon from '../icons/ChevronBackwardIcon.vue';
import AddNoteIcon from '../icons/AddNoteIcon.vue';
import SearchIcon from '../icons/SearchIcon.vue';
import FilterIcon from '../icons/FilterIcon.vue';
import CMenuNoteItem from './CMenuNoteItem.vue';

interface Props {
  notes: Note[]
}

defineProps<Props>();

defineEmits<{
  onCollapse: [],
  onNewNote: [],
  onSearch: []
}>();

</script>

<template>
  <div class="menu">
    <div class="menu-items">
      <CMenuItem class="item-collapse" @on-click="$emit('onCollapse')">
        <template #icon><ChevronBackwardIcon :size="20" /></template>
        <template #text><span>Свернуть</span></template>
      </CMenuItem>
  
      <CMenuItem @on-click="$emit('onNewNote')">
        <template #icon><AddNoteIcon :size="20" /></template>
        <template #text><span>Новая заметка</span></template>
      </CMenuItem>
  
      <CMenuItem @on-click="$emit('onSearch')">
        <template #icon><SearchIcon :size="20" /></template>
        <template #text><span>Поиск</span></template>
      </CMenuItem>
    </div>

    <header>
      <p>Notes</p>
      <FilterIcon :size="24" />
    </header>

    <template v-for="note in notes">
      <CMenuNoteItem :note class="note" />
      <div class="h-line"></div>
    </template>
  </div>
</template>

<style scoped>
.menu {
  margin: 8px;
}

.item-collapse {
  color: var(--color-base70);
  margin-bottom: 8px;
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

.note {
  margin-top: 8px;
  margin-bottom: 8px;
}

.h-line {
  height: 1px;
  background-color: var(--color-base10);
}

</style>