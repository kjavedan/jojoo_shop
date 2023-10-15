<template>
  <div class="products">
    <Card
      v-for="product in productsData"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :imgUrls="product.imgUrls"
      :price="product.price"
      :description="product.description"
      :selected="product.selected"
    >
    </Card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product'
import Card from './Card.vue'

const store = useProductStore()
const { productsData } = storeToRefs(store)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.products {
  position: relative;
  // border: solid yellow;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  max-width: 100%;

  @include pc-m {
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
