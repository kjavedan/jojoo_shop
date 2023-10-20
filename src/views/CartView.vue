<template>
  <div class="wrapper">
    <OrderHistory></OrderHistory>
    <div class="cart" v-if="cartData.length">
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
      <div class="checkout" v-if="cartData.length">
        <h2 class="total-price">Total Price: {{ totalPrice }}AED</h2>
        <button @click="handlePayment" class="payment">Make Payment</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <img src="@/assets/images/empty-cart.png" alt="basket" />
      <p>Your cart is empty what you are wating for?</p>
      <button class="payment" @click="router.push({ name: 'home' })">start shopping</button>
    </div>
  </div>
</template>
<script setup>
import CartItem from '@/components/CartItem.vue'
import { storeToRefs } from 'pinia'
import OrderHistory from '@/components/OrderHistory.vue'
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'

//routes
const router = useRouter()

//store
const store = useProductStore()

//refs
const { cartData, totalPrice } = storeToRefs(store)

//funcs
// methods
const handlePayment = () => {
  const message = `Hello. Here is my order:\n\n`
  const items = cartData.value
    .map((item) => {
      return `${item.name} - ${item.count} x ${item.price} AED\n`
    })
    .join('')
  const totalPriceMessage = `\nTotal Price: ${totalPrice.value} AED`

  const whatsappLink = `https://wa.me/+971502597949?text=${encodeURIComponent(
    message + items + totalPriceMessage
  )}`
  window.open(whatsappLink, '_blank')

  store.addToOrderHistory()
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.wrapper {
  max-width: 500px;
  margin: 1rem auto;
  .cart {
    @include flex-col;
    padding: 1rem 1rem 1rem 0.5rem;
    gap: 15px;

    .checkout {
      border-top: solid 1px lightgray;

      .total-price {
        text-align: right;
        font-family: $secondary-font;
        font-weight: 300;
        font-size: 1.5rem;
      }
    }
  }
  .empty-cart {
    height: 300px;
    width: 400px;
    margin: 0 auto;
    text-align: center;
    img {
      width: 200px;
      margin: 0 auto;
    }
    @include flex-col;
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
</style>
