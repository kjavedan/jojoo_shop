<template>
  <div class="home">
    <Products></Products>
  </div>
</template>

<script setup>
import Products from '@/components/Products.vue'
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.home {
  position: relative;
  width: 100%;
  height: 100%;
  // border: solid red;
  overflow-y: scroll;
}
</style>
