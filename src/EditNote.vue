<script setup lang="ts">
import CGrowingTextArea from './components/CGrowingTextArea.vue';
import ChevronBackwardIcon from './components/icons/ChevronBackwardIcon.vue';
import type { Note } from './Note';

interface Props {
  note: Note
}

defineProps<Props>();

</script>

<template>
<div class="editor">
  <div class="header">
    <div class="nav-button"> <!-- TODO: could be anchor -->
      <ChevronBackwardIcon :size="24" />
      <p>Вернуться</p>
    </div>
  </div>

  <input class="input-title" placeholder="Заголовок..." :value="note.title">
  <CGrowingTextArea class="textarea" placeholder="Введите текст..." :value="note.content" />
</div>
</template>

<style scoped>
.editor {
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.header {
  display: flex;
  padding-bottom: 0.5em;
}

.nav-button {
  display: flex;
  align-items: center;

  color: var(--color-text-secondary);

  cursor: pointer;

  transition-duration: var(--transition-s);
}

.nav-button p {
  margin: 0;
  padding: 0;
  line-height: 1;
  font-weight: 500;
  padding-bottom: 0.1em;
}

.nav-button:hover {
  color: var(--color-text-secondary-hover);
}


.input-title {
  border: none;
  padding: 0;
  margin: 0;
  outline: 0;
  font-size: 1.7em;
  line-height: 1.5;
}

.textarea {
  flex: 1;
  line-height: 1.5;
}
</style>