import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import App from './App.vue'
import './styles/main.css'

import { Echo } from '~/composables'

async function echo() {
  const { value } = await Echo.echo({ value: 'Hello World!' })
  console.log('Response from native:', value)
}

echo()

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')
