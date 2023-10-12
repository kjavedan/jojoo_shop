<template>
  <div class="products">
    <Card v-for="product in products" :key="product.id"></Card>
  </div>
</template>

<script setup>
import Card from './Card.vue'
import { products } from '@/data/indx.js'
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.products {
  border: solid;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @include pc-m {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
