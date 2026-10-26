import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './assets/main.css'
import App from './App.vue'
import router from './router'
import { magnetic, cursorDirective } from './lib/motion'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('magnetic', magnetic)
app.directive('cursor', cursorDirective)

app.mount('#app')
