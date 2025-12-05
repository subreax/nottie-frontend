<script setup lang="ts">

defineEmits<{
  dismiss: [event: Event]
}>();

</script>

<template>
  <div class="popup" @click="(e: Event) => $emit('dismiss', e)">
    <slot></slot>
  </div>
</template>

<style scoped>
.popup {
  position: absolute;
  inset: 0;
}
</style>