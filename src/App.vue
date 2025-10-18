<script setup lang="ts">
import 'modern-normalize/modern-normalize.css';
import './style.css'
import { ref, watch } from 'vue';
import NotesPage from './NotesPage.vue';
import EditNote from './EditNote.vue';
import { BackendApi } from './Api';
import type { Note } from './Note';
import { Debouncer } from './Debouncer';

type Screen = 'home' | 'edit';

const api = new BackendApi();

const screen = ref<Screen>('edit');

const note = ref<Note>({
  id: '',
  title: '',
  content: ''
});

const noteUpdater = new Debouncer<Note>(500, (note: Note) => {
  api.updateNote(note);
});

api.getNote().then((result) => {
  note.value = result
})

function onNoteChange(changedNote: Note) {
  note.value = changedNote;

  noteUpdater.update(changedNote);
}

</script>

<template>
  <!-- <NotesPage v-if="screen === 'home'" :notes /> -->
  <EditNote :note="note" @change="onNoteChange"/>
</template>

<style scoped>

</style>
