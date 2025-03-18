import { createRouter, createWebHistory } from 'vue-router'

const BusinessRoutes = []
const publicRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue'),
  },
  {
    path: '/commonForm',
    name: 'CommonForm',
    component: () => import('@/views/CommonForm/CommonForm.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes],
})

export default router
