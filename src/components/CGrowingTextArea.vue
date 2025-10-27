<script setup lang="ts">
import { useTemplateRef } from 'vue';

interface Props {
  value: string,
  placeholder?: string
}

defineProps<Props>();

const emit = defineEmits<{
  (e: 'input', value: string): void
}>();

const growWrapEl = useTemplateRef("grow-wrap");
const textAreaEl = useTemplateRef("textarea");

defineExpose({
  focus: () => {
    textAreaEl.value?.focus();
  }
})

function onInput(ev: InputEvent) {
  const value = (ev.target!! as HTMLTextAreaElement).value;
  growWrapEl.value!!.dataset.replicatedValue = value;

  emit('input', value);
}
</script>

<template>
<div class="grow-wrap" ref="grow-wrap" data-replicated-value="replicated">
  <textarea rows="1" ref="textarea" @input="onInput" :placeholder :value></textarea>
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