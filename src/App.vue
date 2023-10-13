<template>
  <div class="container">
    <Logo></Logo>
    <Sidebar></Sidebar>
    <DialogSearch></DialogSearch>
    <DialogOrder></DialogOrder>
    <div class="wrapper">
      <RouterView v-slot="{ Component }">
        <Transition
          name="custom-classes"
          enter-active-class="animate__animated animate__fadeInLeft"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
import Sidebar from '@/components/Sidebar.vue'
import DialogOrder from './components/DialogOrder.vue'
import DialogSearch from './components/DialogSearch.vue'
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';

.container {
  width: 95%;
  min-height: 100%;
  padding-top: 1rem;
  margin: 0 auto;
  border: solid;
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
