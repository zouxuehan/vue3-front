<template>
  <div>
    <div>Commonform</div>
    <div>{{ count }}</div>
    <van-button @click="add">新增</van-button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(1)
const add = () => {
  count.value++
}
</script>
<style lang='scss' scoped>
</style>
