<template>
  <svg aria-hidden="true" class="svg-icon" :style="{ width: `${size}px`, height: `${size}px` }">
    <use :xlink:href="iconName" :fill="color" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 16,
  },
  color: {
    type: String,
    default: '#000',
  },
  name: {
    type: String,
    required: true,
  },
})

const iconName = computed(() => {
  return `#icon-${props.name}`
})
</script>
<style lang='scss' scoped>
</style>
