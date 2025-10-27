<script setup lang="ts">
import CNoteEditor from '../components/CNoteEditor.vue';

</script>

<template>
  <div class="content">
    <CNoteEditor :note="{ id: 'xxx', title: '', content: '' }" />
  </div>
</template>

<style scoped>

</style>