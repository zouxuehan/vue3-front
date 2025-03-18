import router from './router'
import { useTransitionStore } from '@/stores/transition'

export function setupRouterGuard() {
  const transitionStore = useTransitionStore()
  const pathStack = transitionStore.getPathStack
  router.beforeEach((to, from) => {
    transitionStore.addPathStack(to)
    if (pathStack[pathStack.length - 3] == to.fullPath) {
      transitionStore.removePathStack()
      transitionStore.removePathStack()
    }
  })
}
