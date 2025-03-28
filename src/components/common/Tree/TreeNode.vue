<template>
  <div>
    <div :style="{ paddingLeft: node.level * 10 + 'px' }">
      <van-checkbox v-if="node.canCheck" v-model="node.checked" @change="onChangeChecked" />
      <slot :node="node" :data="node.data"> </slot>
    </div>
    <tree-node v-for="item in node.childNodes" :node="item" :key="item.key">
      <template #default="slotProps">
        <slot :node="slotProps.node" :data="slotProps.data"></slot>
      </template>
    </tree-node>
  </div>
</template>

<script setup>
let props = defineProps({
  node: {
    type: Object,
    required: true,
  },
})

const onChangeChecked = (value) => {
  props.node.setChecked(value, false)
}
</script>
<style lang='scss' scoped>
</style>
