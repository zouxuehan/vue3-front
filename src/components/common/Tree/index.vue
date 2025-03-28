<template>
  <div>
    <tree-node v-for="item in root.childNodes" :node="item" :key="item.key">
      <template #default="{ node, data }">
        <slot :node="node" :data="data"></slot>
      </template>
    </tree-node>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreeNode from './TreeNode.vue'
import TreeStore from './TreeStore'
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  nodeKey: {
    type: String,
    default: 'id',
  },
  defaultCheckedKeys: {
    type: Array,
    default: () => [],
  },
})

const store = ref(
  new TreeStore({
    data: props.data,
    nodeKey: props.nodeKey,
    defaultCheckedKeys: props.defaultCheckedKeys,
  })
)

const root = store.value.root
console.log(root)
</script>
<style lang='scss' scoped>
</style>
