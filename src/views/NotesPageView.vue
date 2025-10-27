<script setup lang="ts">
import { BackendApi } from '@/Api';
import CIconButton from '@/components/CIconButton.vue';
import CNote from '@/components/CNote.vue';
import CPlusIcon from '@/components/CPlusIcon.vue';
import type { Note } from '@/Note'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import "masonry-layout";

const router = useRouter();

const notes = ref<Note[]>();

const api = new BackendApi();

api.getNotes().then((result) => {
  notes.value = result;
})

function onAddClicked() {
  
}

function onNoteClicked(note: Note) {
  router.push(`/note/${note.id}`);
}

</script>

<template>
<header class="header">
  <h2>Notes</h2>
  <CIconButton @click="onAddClicked">
    <CPlusIcon />
  </CIconButton>
</header>
<div class="notes">
  <CNote v-for="note in notes" 
    :note 
    @click="onNoteClicked" />
</div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 8px;
}

h2 {
  font: var(--font-h1);
  margin: 0;
}

.notes {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
</style>