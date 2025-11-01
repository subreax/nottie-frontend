<script setup lang="ts">
import { useTemplateRef } from 'vue';

interface Props {
  value: string,
  placeholder?: string
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'input', value: string): void
}>();

const textAreaEl = useTemplateRef("textarea");

defineExpose({
  focus: () => {
    textAreaEl.value?.focus();
  }
});

function onInput(ev: InputEvent) {
  const text = (ev.target!! as HTMLTextAreaElement).value;
  emit('input', text);
}
</script>

<template>
<div class="grow-wrap" ref="grow-wrap" :data-replicated-value="props.value">
  <textarea ref="textarea" @input="onInput" :placeholder :value></textarea>
</div>
</template>

<style scoped>
.grow-wrap {
  display: grid;
}

.grow-wrap::after {
  content: attr(data-replicated-value) " ";
  white-space: pre-wrap;
  visibility: hidden;
}

textarea {
  resize: none;
  overflow: hidden;
  padding: 0;
  border: none;
  background: none;
  outline: none;
  color: currentColor;

  font: var(--font-p);
}

.grow-wrap::after,
textarea {
  grid-area: 1 / 1 / 2 / 2;

  font: inherit;
  line-height: inherit;
}

textarea::placeholder {
  color: var(--color-base30); /* todo: extract somewhere? */
}
</style>