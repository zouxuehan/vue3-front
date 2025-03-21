import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    popups: [],
    historyBack2Close: true,
  }),
  getters: {
    getPopupLength: (state) => {
      return state.popups.length
    },
    getLastPopup: (state) => {
      return state.popups[state.popups.length - 1]
    },
  },
  actions: {
    addPopup(popupIndex) {
      this.popups.push(popupIndex)
    },
    removePopup() {
      this.popups.pop()
    },
    clearPopup() {
      this.popups = []
    },
    setBackType(type) {
      this.backType = type
    },
    changeHistoryBack2Close(flag) {
      this.historyBack2Close = flag
    },
  },
})
