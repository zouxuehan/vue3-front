import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import commonComp from './components/common'
import 'virtual:svg-icons-register'

import { i18n } from './locales'

import { setupRouterGuard } from './permission'
const app = createApp(App)
app.use(i18n)

app.use(createPinia())
app.use(router)

commonComp.install(app)

setupRouterGuard()
app.mount('#app')
