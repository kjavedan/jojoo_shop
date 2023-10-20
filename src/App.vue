<template>
  <div class="container">
    <Logo></Logo>
    <Sidebar></Sidebar>
    <DialogSearch></DialogSearch>
    <DialogOrder></DialogOrder>
    <main class="wrapper">
      <RouterView v-slot="{ Component }">
        <Transition
          name="custom-classes"
          enter-active-class="animate__animated animate__fadeInLeft"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
import Sidebar from '@/components/Sidebar.vue'
import DialogOrder from '@/components/DialogOrder.vue'
import DialogSearch from '@/components/DialogSearch.vue'
import Footer from '@/components/Footer.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.container {
  width: 97%;
  min-height: 100svh;
  padding-top: 0.5rem;
  margin: 0 auto;
  // border: solid;
  position: relative;

  @include pc-s {
    width: 80%;
  }

  @include pc-xl {
    width: 1400px;
  }
}
.wrapper {
  margin-top: 1rem;
  padding-bottom: 10rem;
}
.animate__animated.animate__fadeInLeft {
  --animate-duration: 0.5s;
}
</style>
