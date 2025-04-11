<template>
  <van-popup v-model:show="model" teleport="#app">
    <slot name="header">
      <div v-if="title"></div>
    </slot>
    <slot></slot>
  </van-popup>
</template>

<script>
export const POPUP_CLOSE_TYPE_BACK = 'back'
export const POPUP_CLOSE_TYPE_CLICK = 'close'
</script>

<script setup>
import { watch, ref } from 'vue'
import { usePopupStore } from '@/stores/popup'
const props = defineProps({
  title: {
    type: String,
  },
})
const model = defineModel({ required: true })

const closeType = ref(POPUP_CLOSE_TYPE_CLICK)
const popupStore = usePopupStore()
const popupIndex = ref(0)

watch(model, (nv, ov) => {
  if (nv) {
    closeType.value = POPUP_CLOSE_TYPE_CLICK
    popupIndex.value = popupStore.getPopupLength
    popupStore.addPopup(popupIndex.value)
    history.pushState(null, null, location.href)
    window.addEventListener('popstate', closePopup)
  } else {
    window.removeEventListener('popstate', closePopup)
    popupStore.removePopup()
    if (closeType.value !== POPUP_CLOSE_TYPE_BACK) {
      popupStore.changeHistoryBack2Close(false)
      history.back()
    }
  }
})

const closePopup = () => {
  if (!popupStore.historyBack2Close) {
    popupStore.changeHistoryBack2Close(true)
    return
  }
  const lastPopup = popupStore.getLastPopup
  if (lastPopup == popupIndex.value) {
    closeType.value = POPUP_CLOSE_TYPE_BACK
    model.value = false
  }
}
</script>
<style lang='scss' scoped>
</style>
