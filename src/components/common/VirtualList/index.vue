<template>
  <div class="virtual-list" :style="{ height: listHeight + 'px' }" @scroll="handleScroll">
    <div class="virtual-list__placeholder" :style="{ height: totalHeight + 'px' }"></div>
    <div class="virtual-list__content" :style="{ transform: `translateY(${scrollTop}px)` }">
      <template v-for="(item, index) in visibleItems" :key="index">
        <div :style="{ height: getItemHeight(index) + 'px' }" class="virtual-list__item">
          <slot :item="item" :index="index"></slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  listHeight: {
    type: Number,
    default: 300,
  },
  estimatedItemHeight: {
    type: Number,
    default: 30,
  },
})

const scrollTop = ref(0)
const visibleStart = ref(0)
const visibleEnd = ref(0)
const itemHeights = ref(new Array(props.items.length).fill(props.estimatedItemHeight))
const totalHeight = computed(() => itemHeights.value.reduce((sum, height) => sum + height, 0))
const offsets = ref([])

const visibleItems = computed(() => {
  return props.items.slice(visibleStart.value, visibleEnd.value)
})

const getItemHeight = (index) => {
  return itemHeights.value[index]
}

const getOffset = (index) => {
  return offsets.value[index] || 0
}

const updateOffsets = () => {
  let offset = 0
  offsets.value = itemHeights.value.map((height) => {
    const currentOffset = offset
    offset += height
    return currentOffset
  })
}

const handleScroll = (event) => {
  scrollTop.value = event.target.scrollTop
  let startIndex = 0
  while (
    startIndex < offsets.value.length - 1 &&
    offsets.value[startIndex + 1] <= scrollTop.value
  ) {
    startIndex++
  }
  visibleStart.value = startIndex
  let endIndex = startIndex
  let visibleHeight = 0
  while (endIndex < offsets.value.length && visibleHeight < props.listHeight) {
    visibleHeight += itemHeights.value[endIndex]
    endIndex++
  }
  visibleEnd.value = endIndex
}

const measureItemHeight = (index, element) => {
  const height = element.offsetHeight
  if (height !== itemHeights.value[index]) {
    itemHeights.value[index] = height
    updateOffsets()
    handleScroll({ target: { scrollTop: scrollTop.value } })
  }
}

onMounted(() => {
  updateOffsets()
  visibleStart.value = 0
  let visibleHeight = 0
  let endIndex = 0
  while (endIndex < offsets.value.length && visibleHeight < props.listHeight) {
    visibleHeight += itemHeights.value[endIndex]
    endIndex++
  }
  visibleEnd.value = endIndex
})

watch(
  () => props.items.length,
  () => {
    itemHeights.value = new Array(props.items.length).fill(props.estimatedItemHeight)
    updateOffsets()
    handleScroll({ target: { scrollTop: scrollTop.value } })
  }
)
</script>

<style scoped>
.virtual-list {
  overflow-y: auto;
  position: relative;
}

.virtual-list__placeholder {
  position: relative;
  z-index: -1;
}

.virtual-list__content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.virtual-list__item {
  border-bottom: 1px solid #ccc;
  padding: 8px;
}
</style>
