<template>
  <div class="favorite" ref="pageRef">
    <Products></Products>
  </div>
</template>

<script setup>
import Products from '@/components/Products.vue'
import { ref } from 'vue'

const pageRef = ref(null)
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.favorite {
  position: relative;
  width: 100%;
  height: 100%;
  // border: solid red;
  overflow-y: scroll;
}
</style>
