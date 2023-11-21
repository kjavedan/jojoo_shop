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
import AboutUsView from '@/views/AboutUsView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import CustomerSupportView from '@/views/CustomerSupportView.vue'
import FAQView from '@/views/FAQView.vue'
import LoginToProceed from '@/views/LoginToProceed.vue'

import { useUserStore } from '../stores/user';


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
      meta: { requiresAuth: true } 
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/orders',
      name: 'orders',
      component: OrdersView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/confirmed-order/:id',
      name: 'confirmed-order',
      component: ConfirmedOrderView,   
      meta: { requiresAuth: true } 
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: ReviewsView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/user-info',
      name: 'user-info',
      component: UserInfoView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/about',
      name: 'about',
      component: AboutUsView,
    },
    {
      path: '/support',
      name: 'support',
      component: CustomerSupportView,
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQView,
    },
    {
      path: '/login-to-proceed',
      name: 'proceed',
      component: LoginToProceed,
    },
  ]
});


router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  
  await store.checkRefreshToken();

  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next('/login-to-proceed');
  } else {
    next();
  }
});

export default router;
