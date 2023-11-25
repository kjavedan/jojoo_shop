<template>
  <el-config-provider namespace="ep">
    <div class="container">
      <Logo></Logo>
      <Sidebar></Sidebar>
      <DialogSearch></DialogSearch>
      <DialogOrder></DialogOrder>
      <main class="main-wrapper" v-if="!refreshTokenLoading">
        <RouterView v-slot="{ Component }">
          <Transition
            name="custom-classes"
            enter-active-class="animate__animated animate__fadeInLeft"
          >
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
      <LoadingScreen v-else></LoadingScreen>
    </div>
    <Footer></Footer>
  </el-config-provider>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
import Sidebar from '@/components/Sidebar.vue'
import DialogOrder from '@/components/DialogOrder.vue'
import DialogSearch from '@/components/DialogSearch.vue'
import Footer from '@/components/Footer.vue'
import { useUserStore } from './stores/user'
import api from '@/api/baseUrl'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import LoadingScreen from './components/LoadingScreen.vue'

const store = useUserStore()
const { accessToken, refreshTokenLoading } = storeToRefs(store)

watch(accessToken, (newToken) => {
  api.defaults.headers.common['Authorization'] = newToken
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.container {
  // border: solid;
  width: 95%;
  min-height: 100dvh;
  margin: 0 auto;
  // border: solid red;
  position: relative;

  @include pc-s {
    width: 80%;
  }

  @include pc-xl {
    width: 1400px;
  }
}
.main-wrapper {
  // padding: 0 1rem;
  // border: solid;
  padding-bottom: 10rem;

  .page-title {
    padding-left: 1rem;
    // font-family: 'Poppins', sans-serif;
    font-weight: 800;
    text-transform: capitalize;
  }
}
.animate__animated.animate__fadeInLeft {
  --animate-duration: 0.5s;
}
</style>
