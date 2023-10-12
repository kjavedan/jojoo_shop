<template>
  <div class="container">
    <Logo></Logo>
    <Sidebar></Sidebar>
    <Transition name="custom-classes" enter-active-class="animate__animated animate__fadeInLeft">
      <RouterView />
    </Transition>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
import Sidebar from '@/components/Sidebar.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.container {
  width: 90%;
  min-height: 100%;
  padding-top: 2rem;
  margin: 0 auto;
  border: solid;
  position: relative;

  @include pc-xl {
    width: 1400px;
  }
}

.animate__animated.animate__fadeInLeft {
  --animate-duration: 0.3s;
}
</style>
