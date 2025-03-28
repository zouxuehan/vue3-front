export default class Node {
  constructor(options) {
    this.level = 0
    this.canCheck = true
    this.parent = null
    for (const key in options) {
      this[key] = options[key]
    }

    this.childNodes = []
    this.checked = false

    this.key = this.data[this.store.nodeKey]
    this.init()
  }
  init() {
    if (Array.isArray(this.data)) {
      this.childNodes = this.data.map((item) => {
        return new Node({
          data: item,
          store: this.store,
        })
      })
    } else {
      if (this.data.children) {
        this.childNodes = this.data.children.map((item) => {
          return new Node({
            data: item,
            store: this.store,
            level: this.level + 1,
            parent: this,
          })
        })
      }
    }
    if (this.store.defaultCheckedKeys.includes(this.key)) {
      this.setChecked(true, true)
    }
  }
  setChecked(value, deep) {
    this.checked = value
    if (deep) {
      this.updateParentChecked(value, deep)
      this.updateChildChecked(value, deep)
    }
  }
  updateParentChecked() {
    const parent = this.getParent()
    if (parent) {
      parent.checked = parent.childNodes.every((child) => child.checked)
      parent.updateParentChecked()
    }
  }
  getParent() {
    return this.parent
  }
  updateChildChecked(value, deep) {
    if (deep) {
      this.childNodes.forEach((child) => {
        child.setChecked(value, deep)
      })
    }
  }
}
