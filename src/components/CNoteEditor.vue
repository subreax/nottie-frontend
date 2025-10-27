<script setup lang="ts">
import { useTemplateRef } from 'vue';
import CGrowingTextArea from '@/components/CGrowingTextArea.vue';
import type { Note } from '../Note';
import CTag from './CTag.vue';
import ShareIcon from './icons/ShareIcon.vue';


interface Props {
  note: Note
}

const props = defineProps<Props>();

const emit = defineEmits<{
  onUpdate: [note: Note],
  onShareClicked: []
}>();


function onNoteChange(changedNote: Note) {
  emit('onUpdate', changedNote);
}



const contentTextRef = useTemplateRef("content");

function onContentChange(content: string) {
  onNoteChange({ 
    id: props.note.id, 
    title: props.note.title, 
    content: content
  });
}

function onTitleChange(ev: Event) {
  onNoteChange({
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
    <div class="editor-content">
      <input 
        class="input-title" 
        placeholder="Заголовок..." 
        :value="note.title" 
        @input="onTitleChange"
        @keypress="onTitleKeypress">

      <!-- <p class="last-edit">Последнее редактирование: 30 минут назад</p> -->

      <div class="tag-list">
        <CTag text="Favorite" />
        <CTag text="Databases" />
        <CTag text="Add tag" icon="plus" />
      </div>
    
      <CGrowingTextArea 
        class="textarea"
        placeholder="Введите текст..."
        ref="content"
        :value="note.content"
        @input="onContentChange" />
    </div>

    <div class="share-icon" @click="$emit('onShareClicked')">
      <ShareIcon :size=24 />
    </div>
  </div>
</template>

<style scoped>
.editor {
  position: relative;
  min-height: 100dvh;
  
  padding: 96px;

  display: flex;
  flex-direction: column;

  background-color: var(--color-base03);
}

.editor-content {
  width: min(100%, 800px);
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-title {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  margin-bottom: 8px;
  outline: 0;

  color: var(--color-base100);
  font: var(--font-h3);
}

.input-title::placeholder {
  color: var(--color-base30);
}

.last-edit {
  margin: 0;
  margin-bottom: 12px;

  color: var(--color-base70);
}

.tag-list {
  margin-bottom: 24px;

  display: flex;
  gap: 8px;
}

.textarea {
  flex: 1;
}

.share-icon {
  position: absolute;
  top: 0;
  right: 0;
  margin: 24px;
  padding: 8px;
  border-radius: 8px;
  line-height: 0;

  transition-duration: var(--transition-s);
  cursor: pointer;
}

.share-icon:hover {
  background-color: var(--color-base10);
}
</style>