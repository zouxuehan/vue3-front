import { defineAsyncComponent } from "vue"

export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    for (const [key, value] of Object.entries(components)) {
      const name = 'My' + key.split('/')[1]
      app.component(name, defineAsyncComponent(value))
    }
  }
}
