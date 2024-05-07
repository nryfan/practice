import { createApp } from 'vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import '@/assets/style/common.less'
import '@/styles/index.scss'
import store from '@/store'

import App from './App.vue'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
