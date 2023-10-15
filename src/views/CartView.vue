<template>
  <div class="cart">
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
    <CartItem></CartItem>
  </div>
</template>

<script setup>
import CartItem from '@/components/CartItem.vue'
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
