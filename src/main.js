import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import commonComp from './components/common'
import 'virtual:svg-icons-register'

const app = createApp(App)

app.use(createPinia())
app.use(router)

commonComp.install(app)

app.mount('#app')
