<template>
  <div class="home">
    <Products></Products>
  </div>
</template>

<script setup>
import Products from '@/components/Products.vue'
import { onMounted } from 'vue'
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.home {
  position: relative;
  width: 100%;
  height: 100%;
  // border: solid red;
  overflow-y: scroll;
}
</style>
