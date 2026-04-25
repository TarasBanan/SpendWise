<template>
  <button :class="['base-button', variantClass]" type="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  variant?: 'primary' | 'outline' | 'surface'
}>()

defineEmits<{ click: [] }>()

const variantClass = computed(() => `base-button--${props.variant ?? 'surface'}`)
</script>
