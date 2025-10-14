<script setup lang="ts">
import 'modern-normalize/modern-normalize.css';
import './style.css'
import { ref } from 'vue';
import NotesPage from './NotesPage.vue';
import { notes as initialNotes } from './Notes';
import EditNote from './EditNote.vue';

type Screen = 'home' | 'edit';

const screen = ref<Screen>('edit');
const notes = ref(initialNotes);
</script>

<template>
  <NotesPage v-if="screen === 'home'" :notes />
  <EditNote v-else-if="screen === 'edit'" :note="notes[0]!!" />
</template>

<style scoped>

</style>
