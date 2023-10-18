<template>
  <div class="cart" v-bind="cartData.length">
    <CartItem
      v-for="item in cartData"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :price="item.price"
      :description="item.description"
      :cout="item.cout"
      :imgUrl="item.imgUrls[0]"
    ></CartItem>
  </div>
</template>

<script setup>
import CartItem from '@/components/CartItem.vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product'

//store
const store = useProductStore()
const { cartData } = storeToRefs(store)
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.cart {
  @include flex-col;
  gap: 15px;
  padding: 1rem 1rem 1rem 0.5rem;
  max-width: 500px;
  margin: 0 auto;
}
</style>
