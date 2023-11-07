<template>
  <header class="header">
    <div class="logo" v-if="isHome">
      <RouterLink :to="{ name: 'home' }">
        <h1>jojoo <span>shop.</span></h1>
      </RouterLink>
      <div class="profile" @click="router.push({ name: 'profile', params: { id: '123' } })">
        <img src="@/assets/images/Account-outline.png" alt="Account" />
      </div>
    </div>
    <div v-else class="nav">
      <div class="back-btn" @click="router.back(1)">
        <img src="@/assets/images/Back.png" alt="back" />
      </div>
      <div class="profile" @click="router.push({ name: 'profile', params: { id: '123' } })">
        <img src="@/assets/images/Account-outline.png" alt="Account" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//routes
const route = useRoute()
const router = useRouter()

//refs
const isHome = ref(false)

//hooks
watch(route, () => {
  route.name === 'home' ? (isHome.value = true) : (isHome.value = false)
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.header {
  position: sticky;
  background: linear-gradient(
    90deg,
    #fff 0.98%,
    rgba(255, 255, 255, 0) 23.89%,
    rgba(255, 255, 255, 0) 77.19%,
    #fff 100%
  );
  top: -2px;
  left: 0;
  width: 100%;
  // border: solid;
  z-index: 100;
  height: 50px;
  padding: 0.2rem 0;
  .logo {
    // border: solid saddlebrown;
    width: 100%;
    height: 100%;
    @include row-between;
    a {
      text-decoration: none;
      color: unset;
    }
    h1 {
      cursor: pointer;
      // border: solid;
      font-size: 1.2rem;
    }
    span {
      display: block;
      margin-left: 60%;
      line-height: 0.8;
      font-size: 1rem;
    }
    .profile {
      cursor: pointer;
      height: 100%;
      @include flex-center;
      img {
        height: 80%;
      }
    }
  }
  .nav {
    width: 100%;
    height: 100%;
    padding: 0.2rem 0;
    @include row-between;
    .back-btn,
    .profile {
      cursor: pointer;
      height: 100%;
      @include flex-center;
    }
    img {
      height: 100%;
    }
    .back-btn {
      // border: solid;
      margin-left: -10px;
    }
  }
}
</style>
