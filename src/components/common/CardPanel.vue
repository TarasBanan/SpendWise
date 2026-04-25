<template>
  <section class="card-panel">
    <header v-if="title" class="card-panel__header">{{ title }}</header>
    <div class="card-panel__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
