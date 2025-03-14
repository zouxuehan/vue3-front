import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    device_id: 'postman',
    device_desc: 'postman',
  }),
  getters: {},
  actions: {},
})
