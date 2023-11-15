<template>
  <nav :class="['side-bar', { expand: isSidebar }]">
    <div v-if="isSidebar">
      <div class="item" @click="toggleSearch">
        <img src="@/assets/images/search.png" alt="search" />
      </div>
      <div class="item">
        <a target="_blank" href="https://www.instagram.com/jojooshop_com/">
          <img src="@/assets/images/instagram.png" alt="home" />
        </a>
      </div>
      <div class="item">
        <a target="_blank" href="https://wa.me/+971502597949">
          <img src="@/assets/images/whatsapp.png" alt="home" />
        </a>
      </div>
      <RouterLink :to="{ name: 'favorite' }">
        <div class="item">
          <img v-if="route.name === 'favorite'" src="@/assets/images/bookmark.png" alt="saved" />
          <img v-else src="@/assets/images/bookmark-outline.png" alt="saved" />
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'cart' }">
        <div class="item">
          <img v-if="route.name === 'cart'" src="@/assets/images/cart.png" alt="saved" />
          <img v-else src="@/assets/images/cart-outline.png" alt="saved" />
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'profile' }">
        <div class="item">
          <img
            v-if="route.name === 'profile'"
            style="height: 34px"
            src="@/assets/images/Account-fill.png"
            alt="account"
          />
          <img
            v-else
            style="height: 34px"
            src="@/assets/images/Account-outline.png"
            alt="account"
          />
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'home' }">
        <div class="item">
          <img v-if="route.name === 'home'" src="@/assets/images/home.png" alt="home" />
          <img v-else src="@/assets/images/home-outline.png" alt="home" />
        </div>
      </RouterLink>
    </div>

    <div class="item menu" @click="isSidebar = !isSidebar">
      <img v-if="!isSidebar" src="@/assets/images/menu.png" alt="menu" />
      <img v-else src="@/assets/images/menu-black.png" alt="menu" />
    </div>
  </nav>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

//routing
const route = useRoute()

//stores
const store = useProductStore()

//props
defineProps(['expand'])

//refs
const isSidebar = ref(false)
const isHome = ref(false)

//fucs
const toggleSearch = () => {
  store.toggleSearch(true)
}

//hooks
watch(route, () => {
  route.name === 'home' ? (isHome.value = true) : (isHome.value = false)
  if (window.innerWidth < 800) {
    isSidebar.value = false
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.side-bar {
  @include col-space-around;
  @include round-xl;

  background: transparent;
  position: fixed;
  transition: all 0.3s ease-in-out;
  bottom: 100px;
  right: 20px;

  z-index: 999;
  width: 50px;

  font-size: large;

  @include pc-m {
    right: 50px;
    transform: translateY(50%);
    // top: 50%;
    bottom: 50%;
    background: transparent;
    box-shadow: none;
  }

  .item {
    padding: 0.6rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    @include flex-center;

    &.menu {
      background: black;
      @include round-s;
      @include shadow-l;
    }
  }

  a {
    line-height: 1rem;
  }

  img {
    height: 26px;
  }

  &.expand {
    bottom: 50%;
    transform: translateY(50%);
    height: 420px;
    // top: 50%;
    background: white;
    @include shadow-s;

    .item {
      margin: 5px 0;

      &.menu {
        box-shadow: unset;
        background: unset;
      }

      &:hover {
        background: $clr-white-soft;
        @include round-s;
      }
    }

    @include pc-m {
      @include shadow-m;
    }
  }
}
</style>
