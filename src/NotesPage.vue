<script setup lang="ts">
import type { Note } from './Note';

defineProps<{
  notes: Note[]
}>();

function onAddClicked() {
  
}

</script>

<template>
<div class="header">
  <h1>Notes</h1>
  <CIconButton @click="onAddClicked">
    <CPlusIcon />
  </CIconButton>
</div>
<div class="notes">
  <CNote v-for="note in notes" :note />
</div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 8px;

  border-bottom: 1px solid var(--color-text-secondary);
}

h1 {
  margin: 0;
}

.notes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
</style>