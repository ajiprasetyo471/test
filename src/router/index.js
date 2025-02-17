import { routes } from 'vue-router/auto-routes'
import { createRouter, createWebHistory } from 'vue-router'
import { DataLoaderPlugin } from 'unplugin-vue-router/data-loaders'
// import { setupGuards } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Jika ada posisi yang disimpan (back/forward navigation), scroll ke posisi tersebut
    if (savedPosition) {
      return savedPosition
    }
    // Jika navigasi memiliki anchor (hash), scroll ke elemen dengan id tersebut
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth' // Bisa menggunakan 'smooth' untuk efek scroll halus
      }
    }
    // Jika navigasi masih di route yang sama (hanya param atau query yang berubah), jangan ubah posisi scroll
    if (to.path === from.path) {
      return false
    }
    // Jika berpindah route, scroll ke atas
    return { top: 0 }
  }
})

// setupGuards(router)
export default router

export function setupRouter(app) {
  app.use(DataLoaderPlugin, { router })
  app.use(router)
}
