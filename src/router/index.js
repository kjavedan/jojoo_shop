import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CartView from '@/views/CartView.vue'
import FavoriteView from '@/views/FavoriteView.vue'
import confirmedOrderView from '@/views/confirmedOrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView
    },
    {
      path: '/confirmed-order/:id',
      name: 'confirmed-order',
      component: confirmedOrderView
    }
  ]
})

export default router
