<script setup lang="ts">
import CMenu from '@/components/menu/CMenu.vue';
import CNoteEditor from '../components/CNoteEditor.vue';
import type { Note } from '@/model/Note';
import { BackendApi } from '@/Api';
import { ref } from 'vue';

const notes = ref<Note[]>([]);

const api = new BackendApi();

api.getNotes().then((result) => {
  notes.value = result;
})

</script>

<template>
  <div class="container">
    <CMenu 
      class="menu"
      :notes="notes!" />
  
    <CNoteEditor 
      class="editor"
      :note="{ id: 'xxx', title: '', content: '', tags: [], lastEdit: new Date() }" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.menu {
  min-width: 250px;
  max-width: 350px;
  flex: 1;
}

.editor {
  flex: 3;
}
</style>