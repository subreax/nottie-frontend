<script setup lang="ts">
import { ref } from 'vue';
import CPopup from '@/components/popup/CPopup.vue';
import CPopupItem from '@/components/popup/CPopupItem.vue';

const visible = ref(false);

const emit = defineEmits<{
  onDelete: []
}>();


function onToggle(visible1: boolean) {
  visible.value = visible1;
}

function onDelete() {
  emit('onDelete');
  onToggle(false);
}

</script>

<template>
  <CPopup 
    :icon="'options'" 
    :visible="visible" 
    @on-toggle="onToggle">

    <CPopupItem :text="'Удалить'" @click="onDelete" />

  </CPopup>
</template>