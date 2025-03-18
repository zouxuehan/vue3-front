<template>
  <router-view v-slot="{ Component }">
    <transition :name="store.direction" @before-enter="beforeEnter" @after-leave="afterLeave">
      <keep-alive :include="store.caches">
        <component
          :is="Component"
          :key="$route.fullPath"
          :class="{ animation: isAnimation }"
        ></component>
      </keep-alive>
      <!-- <component v-else :is="Component" :key="$route.fullPath"></component> -->
    </transition>
  </router-view>
</template>
<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import { useTransitionStore } from '@/stores/transition'

const store = useTransitionStore()

const isAnimation = ref(false)
const beforeEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}
</script>
<style scoped lang="scss">
.animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
// slide-left页面时：新页面的进入动画
.slide-left-enter-active {
  animation-name: slide-left-in;
  animation-duration: 0.3s;
}
// slide-left页面时：老页面的退出动画
.slide-left-leave-active {
  animation-name: slide-left-out;
  animation-duration: 0.3s;
}
// slide-left页面时：新页面的进入动画
@keyframes slide-left-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// slide-left页面时：老页面的退出动画
@keyframes slide-left-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.slide-right-enter-active {
  animation-name: slide-right-in;
  animation-duration: 0.3s;
}
// 后退页面时：后退的页面执行的动画
.slide-right-leave-active {
  animation-name: slide-right-out;
  animation-duration: 0.3s;
}
// 后退页面时：即将展示的页面动画
@keyframes slide-right-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes slide-right-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(100%, 0);
  }
}
</style>
