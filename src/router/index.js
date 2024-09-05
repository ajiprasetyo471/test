import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
// import { setupGuards } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// setupGuards(router)
export default function (app) {
  app.use(DataLoaderPlugin, { router })
  app.use(router)
}
