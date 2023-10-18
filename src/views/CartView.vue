<template>
  <div class="cart" v-bind="cartData.length">
    <CartItem
      v-for="item in cartData"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :price="item.price"
      :description="item.description"
      :count="item.count"
      :imgUrl="item.imgUrls[0]"
    ></CartItem>
    <div class="checkout">
      <h2 class="total-price">Total Price: {{ totalPrice }}AED</h2>
      <a :href="getWhatsAppLink()" class="payment" target="_blank">Make Payment</a>
    </div>
  </div>
</template>
<script setup>
import CartItem from '@/components/CartItem.vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product'

//store
const store = useProductStore()

//refs
const { cartData, totalPrice } = storeToRefs(store)

//funcs
const getWhatsAppLink = () => {
  const message = `Hello. Here is my order:\n\n`
  const items = cartData.value
    .map((item) => {
      return `${item.name} - ${item.count} x ${item.price} AED\n`
    })
    .join('')
  const totalPriceMessage = `\nTotal Price: ${totalPrice.value} AED`

  return `https://wa.me/+971502597949?text=${encodeURIComponent(
    message + items + totalPriceMessage
  )}`
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.cart {
  @include flex-col;
  gap: 15px;
  padding: 1rem 1rem 1rem 0.5rem;
  max-width: 500px;
  margin: 0 auto;

  .checkout {
    border-top: solid 1px lightgray;

    .total-price {
      text-align: right;
      font-family: $secondary-font;
      font-weight: 300;
      font-size: 1.5rem;
    }
    .payment {
      @include ease;
      border: none;
      cursor: pointer;
      outline: none;
      height: 50px;
      @include flex-center;
      @include shadow-l;
      margin-top: 2rem;
      @include round-xl;
      background: black;
      font-family: $primary-font;
      text-decoration: none;

      font-size: 1rem;
      &:active {
        transform: scale(0.9);
        box-shadow: unset;
      }
      color: white;
      width: 100%;
    }
  }
}
</style>
