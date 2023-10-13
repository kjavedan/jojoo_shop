<template>
  <div :class="['side-bar', { expand: isSidebar }]">
    <div v-if="isSidebar">
      <RouterLink :to="{ name: 'home' }">
        <div class="item">
          <img src="@/assets/images/home.png" alt="home" />
        </div>
      </RouterLink>
      <div class="item" @click="toggleSearch">
        <img src="@/assets/images/search.png" alt="search" />
      </div>
      <RouterLink :to="{ name: 'favorite' }">
        <div class="item">
          <img src="@/assets/images/bookmark-outline.png" alt="saved" />
        </div>
      </RouterLink>
      <div class="item">
        <img src="@/assets/images/instagram.png" alt="home" />
      </div>
      <div class="item">
        <img src="@/assets/images/whatsapp.png" alt="home" />
      </div>
    </div>

    <div class="item" @click="isSidebar = !isSidebar">
      <img src="@/assets/images/menu.png" alt="menu" />
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { ref } from 'vue'

//stores
const store = useProductStore()

//props
defineProps(['expand'])

//refs
const isSidebar = ref(true)

//fucs
const toggleSearch = () => {
  store.toggleSearch(true)
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.side-bar {
  @include col-space-around;
  @include round-xl;

  background: transparent;
  position: fixed;
  transition: all 0.3s ease-in-out;
  top: 15px;
  right: 10px;

  z-index: 999;
  width: 50px;

  font-size: large;

  @include pc-m {
    right: 50px;
    transform: translateY(-50%);
    top: 50%;
    background: transparent;
    box-shadow: none;
  }

  .item {
    padding: 0.6rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    @include flex-center;

    &:hover {
      background: $clr-white-soft;
      @include round-s;
    }
  }

  img {
    height: 26px;
  }

  &.expand {
    transform: translateY(-50%);
    top: 50%;
    background: #fff;
    @include shadow-m;

    .item {
      margin: 10px 0;
    }

    @include pc-m {
      @include shadow-m;
    }
  }
}
</style>
