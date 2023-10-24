<template>
  <div class="wrapper">
    <Stepper :status="orderData.status"></Stepper>
    <div class="cart">
      <CartItem
        v-for="item in orderData.items"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :price="item.price"
        :description="item.description"
        :count="item.count"
        :imgUrl="item.imgUrls"
        :history="true"
      ></CartItem>
      <div class="checkout">
        <h2 class="total-price">Total Price: {{ orderData.totalPrice }}AED</h2>
      </div>
    </div>
  </div>
</template>
<script setup>
import CartItem from '@/components/CartItem.vue'
import { useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Stepper from '../components/Stepper.vue'

//routes
const router = useRouter()
const routes = useRoute()

//store
const store = useProductStore()

//refs
const { orderHistoryData } = storeToRefs(store)

//computed
const orderData = computed(() => {
  return orderHistoryData.value.find((item) => item.orderId == routes.params.id)
})
//funcs

//hooks
onBeforeMount(() => {
  console.log(routes.params)
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.wrapper {
  max-width: 500px;
  margin: 1rem auto;
  margin-top: 1.5rem;
  .cart {
    @include flex-col;
    padding: 1rem 0.5rem;
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
