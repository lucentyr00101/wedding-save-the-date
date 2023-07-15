import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomeView.vue'
import PathNotFound from '@/views/error/PathNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '/:pathMatch(.*)*', component: PathNotFound },
  ]
})

export default router
