import Node from './Node'

export default class TreeStore {
  constructor(options) {
    for (const key in options) {
      this[key] = options[key]
    }
    this.init()
  }
  init() {
    this.root = new Node({
      data: this.data,
      store: this,
    })
  }
}
