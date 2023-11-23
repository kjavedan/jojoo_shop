<template>
  <div v-if="!loading">
    <OrderHistory></OrderHistory>
    <div class="wrapper">
      <h3>My Cart</h3>
      <div class="cart" v-if="cartData?.length">
        <CartItem
          v-for="item in cartData"
          :key="item.product._id"
          :id="item._id"
          :name="item.product.name"
          :price="item.product.price"
          :discountedPrice="item.product.discountedPrice"
          :discount="item.product.discount"
          :description="item.product.description"
          :qty="item.qty"
          :imgUrl="item.product.imgUrls[0]"
          @refreshCartData="fetchUserCartData"
        ></CartItem>
        <div class="checkout" v-if="cartData?.length">
          <h2 class="total-price">Total Price: {{ totalPrice.toFixed(2) }}AED</h2>
          <h2 class="total-price">
            Discounted Total Price: {{ discountedTotalPrice.toFixed(2) }}AED
          </h2>
          <button @click="handlePayment" class="payment">Make Payment</button>
        </div>
      </div>
      <div v-else class="empty-cart">
        <img src="@/assets/images/empty-cart.png" alt="basket" />
        <p>Your cart is empty what you are wating for?</p>
        <button class="payment" @click="router.push({ name: 'home' })">start shopping</button>
      </div>
    </div>
  </div>
  <LoadingScreen v-else></LoadingScreen>
</template>
<script setup>
import CartItem from '@/components/CartItem.vue'
import OrderHistory from '@/components/OrderHistory.vue'
import { useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { useCartLogic } from '@/composables/cartLogic'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'

//routes
const router = useRouter()

//store
const cartStore = useCartStore()
const { cartData, totalPrice, discountedTotalPrice } = storeToRefs(cartStore)

//refs
const loading = ref(false)

console.log(cartData.value)

//funcs
// methods
// const handlePayment = () => {
//   const message = `Hello. Here is my order:\n\n`
//   const items = cartData.value
//     .map((item) => {
//       return `${item.name} - ${item.count} x ${item.price} AED\n`
//     })
//     .join('')
//   const totalPriceMessage = `\nTotal Price: ${totalPrice.value} AED`

//   const whatsappLink = `https://wa.me/+971502597949?text=${encodeURIComponent(
//     message + items + totalPriceMessage
//   )}`
//   window.open(whatsappLink, '_blank')

//   productStore.addToOrderHistory()
// }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.wrapper {
  max-width: 500px;
  margin: 1rem auto;
  margin-top: 1rem;
  .cart {
    @include flex-col;
    padding: 1rem 0.5rem;
    gap: 20px;

    .checkout {
      border-top: solid 1px lightgray;

      .total-price {
        text-align: right;
        font-family: $secondary-font;
        font-weight: 300;
        font-size: 1.2rem;
      }
    }
  }
  .empty-cart {
    text-align: center;
    padding: 2rem;
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
