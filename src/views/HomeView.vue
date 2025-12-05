<script setup lang="ts">
import CMenu from '@/components/menu/CMenu.vue';
import CNoteEditor from '../components/CNoteEditor.vue';
import { emptyNote, type Note } from '@/model/Note';
import { ref, watch } from 'vue';
import { noteRepository } from '@/repository/noteRepository';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const notes = noteRepository.getNotes();
const currentNote = ref<Note>(emptyNote());

function onNoteUpdate(note: Note) {
  currentNote.value = note;
  noteRepository.updateNote(note.id, note);
}

async function onNewNote() {
  router.push(`/${await noteRepository.generateId()}`);
}

function onSelectNote(note: Note) {
  router.push(`/${note.id}`);
}

async function onDeleteNote(note: Note) {
  await noteRepository.deleteNote(note);
  if (note === currentNote.value) {
    currentNote.value = emptyNote();
    router.replace('/');
  }
}

function init() {
  const noteId = route.params.id as string;
  if (noteId) {
    noteRepository.getNote(noteId).then((note) => {
      currentNote.value = note;
    });
  }
  else {
    noteRepository.generateId().then((id) => {
      currentNote.value = { ...currentNote.value, id: id }
    });
  }
}

watch(route, (r) => {
  init();
});

init();
</script>

<template>
  <div class="container">
    <CMenu 
      class="menu"
      :notes="notes"
      :selected-note="currentNote"
      @on-new-note="onNewNote"
      @on-note-selected="onSelectNote"
      @on-delete="onDeleteNote" />
  
    <CNoteEditor 
      v-if="currentNote != null"
      class="editor"
      :note="currentNote"
      @on-update="onNoteUpdate" />

    <div class="editor" v-else></div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  overflow: hidden;
  height: 100dvh;
}

.menu {
  width: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;

  transition-duration: var(--transition-s);
}

.editor {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-top: 48px;
  scrollbar-gutter: stable;
}
</style>