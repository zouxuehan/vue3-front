import { defineStore } from 'pinia'
import { loginApi, refreshTokenApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {},
  }),
  getters: {
    getUserInfo: (state) => {
      return state.userInfo
    },
    getToken: (state) => {
      return state.token
    },
  },
  actions: {
    async login(params) {
      const data = await loginApi(params)
      this.token = data.auth.token
    },
    async refreshToken() {
      const data = await refreshTokenApi()
      this.token = data.token
    },
  },
})
