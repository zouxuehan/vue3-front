import { defineStore } from 'pinia'
import { TRANSITION_PUSH, TRANSITION_BACK } from '@/enums/sys'
export const useTransitionStore = defineStore('transition', {
  state: () => ({
    pathStack: [],
    direction: TRANSITION_PUSH,
    caches: [],
  }),
  getters: {
    getPathStack: (state) => {
      return state.pathStack
    },
  },
  actions: {
    addPathStack(to, from) {
      this.pathStack.push(to.fullPath)
      this.caches.push(to.name)
      this.direction = TRANSITION_PUSH
    },
    removePathStack() {
      this.pathStack.pop()
      this.caches.pop()
      this.direction = TRANSITION_BACK
    },
  },
})
