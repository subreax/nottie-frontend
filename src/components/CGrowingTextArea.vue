<script setup lang="ts">
import { useTemplateRef } from 'vue';

interface Props {
  value: string,
  placeholder?: string
}

defineProps<Props>();

const growWrapEl = useTemplateRef("grow-wrap");

function onInput(ev: InputEvent) {
  growWrapEl.value!!.dataset.replicatedValue = (ev.target!! as HTMLTextAreaElement).value;
}

</script>

<template>
<div class="grow-wrap" data-replicated-value="replicated" ref="grow-wrap">
  <textarea rows="1" @input="onInput" :placeholder :value></textarea>
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
  outline: none;
}

.grow-wrap::after,
textarea {
  grid-area: 1 / 1 / 2 / 2;

  font: inherit;
  line-height: inherit;
}
</style>