import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CartView from '@/views/CartView.vue';
import FavoriteView from '@/views/FavoriteView.vue';
import ConfirmedOrderView from '@/views/ConfirmedOrderView.vue';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import ProductView from '@/views/ProductView.vue';
import ProfileView from '@/views/ProfileView.vue'
import OrdersView from '@/views/OrdersView.vue'
import ReviewsView from '@/views/ReviewsView.vue'
import { useTokenStore } from '../stores/token';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/profile/:id',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/orders/:id',
      name: 'orders',
      component: OrdersView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/reviews/:id',
      name: 'reviews',
      component: ReviewsView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/confirmed-order/:id',
      name: 'confirmed-order',
      component: ConfirmedOrderView,
      meta: { requiresAuth: true } 
    }
  ]
});


// router.beforeEach((to) => {
//   const store = useTokenStore()

//   if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
// })

export default router;
