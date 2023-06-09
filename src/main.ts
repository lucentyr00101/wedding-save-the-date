import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import 'bootstrap/dist/css/bootstrap-grid.min.css'
import 'bootstrap/dist/css/bootstrap-reboot.min.css'
import 'bootstrap/dist/css/bootstrap-utilities.min.css'
import '@/assets/styles/main.styl'
import 'animate.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
