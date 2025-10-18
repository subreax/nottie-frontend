<script setup lang="ts">
import { useTemplateRef } from 'vue';
import CGrowingTextArea from './components/CGrowingTextArea.vue';
import ChevronBackwardIcon from './components/icons/ChevronBackwardIcon.vue';
import type { Note } from './Note';

interface Props {
  note: Note
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'change', note: Note): void
}>();

const contentTextRef = useTemplateRef("content");

function onContentChange(content: string) {
  emit('change', { 
    id: props.note.id, 
    title: props.note.title, 
    content: content
  });
}

function onTitleChange(ev: Event) {
  emit('change', {
    id: props.note.id,
    title: (ev.target!! as HTMLInputElement).value,
    content: props.note.content
  });
}

function onTitleKeypress(ev: KeyboardEvent) {
  if (ev.key === 'Enter') {
    contentTextRef.value?.focus();
  }
}

</script>

<template>
<div class="editor">
  <div class="header">
    <div class="nav-button"> <!-- TODO: could be anchor -->
      <ChevronBackwardIcon :size="24" />
      <p>Вернуться</p>
    </div>
  </div>

  <input 
    class="input-title" 
    placeholder="Заголовок..." 
    :value="note.title" 
    @input="onTitleChange"
    @keypress="onTitleKeypress">

  <CGrowingTextArea 
    class="textarea"
    placeholder="Введите текст..."
    ref="content"
    :value="note.content"
    @input="onContentChange" />
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
  font-size: 1.5em;
  line-height: 1.5;
  font-weight: 500;
}

.textarea {
  flex: 1;
  line-height: 1.5;
}
</style>