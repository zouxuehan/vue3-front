<template>
  <div>
    <div>Home</div>
    <div>{{ count }}</div>
    <van-button @click="$router.push('/commonForm')">跳转</van-button>
    <van-button @click="add">新增</van-button>
    <van-button @click="open1">弹窗</van-button>

    <my-popup v-model="show1" position="bottom">
      弹窗1
      <van-button @click="open2">弹窗2</van-button>
    </my-popup>
    <my-popup v-model="show2" position="bottom"> 弹窗2 </my-popup>
    <my-tree :data="tree" :default-checked-keys="[1, 11]">
      <template #default="{ node, data }">
        <span>{{ data.label }}</span>
      </template>
    </my-tree>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(1)
const add = () => {
  count.value++
}

const show1 = ref(false)
const open1 = () => {
  show1.value = !show1.value
}

const show2 = ref(false)
const open2 = () => {
  show2.value = !show2.value
}

const tree = ref([
  {
    id: 0,
    label: 'root',
    children: [
      {
        id: 1,
        label: '1',
        children: [
          {
            id: 11,
            label: '11',
          },
          {
            id: 12,
            label: '12',
          },
        ],
      },
      {
        id: 2,
        label: '2',
        children: [
          {
            id: 21,
            label: '21',
          },
          {
            id: 22,
            label: '22',
          },
        ],
      },
    ],
  },
])
</script>
<style lang='scss' scoped>
</style>
