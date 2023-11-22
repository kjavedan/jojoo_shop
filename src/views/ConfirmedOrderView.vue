<template>
  <h2>Order Details</h2>
  <h3 v-if="!loading">{{ formatDate(orderData.orderDate) }}</h3>
  <div class="confirmed-orders-wrapper" v-if="!loading">
    <Stepper :status="orderData.status"></Stepper>
    <div class="cart">
      <CartItem
        v-for="item in orderData.products"
        :key="item._id"
        :id="item._id"
        :name="item.name"
        :price="item.price"
        :description="item.description"
        :discount="item.discount"
        :discountedPrice="item.discountedPrice"
        :imgUrl="item.imgUrls"
        :qty="item.qty"
        :history="true"
      ></CartItem>
      <div class="checkout">
        <h2 class="total-price">Total Price: {{ orderData.discountedTotalPrice }}AED</h2>
      </div>
    </div>
  </div>
  <LoadingScreen v-else></LoadingScreen>
</template>
<script setup>
import CartItem from '@/components/CartItem.vue'
import { useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import Stepper from '../components/Stepper.vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import { getOrderDetailsById } from '@/api/order'
import { formatDate } from '@/utils'

//routes
const router = useRouter()
const routes = useRoute()

//store
const store = useProductStore()

//refs
const { orderHistoryData } = storeToRefs(store)
const loading = ref(false)
const orderData = ref(null)

//funcs
const fetchOrderData = async () => {
  loading.value = true
  try {
    const res = await getOrderDetailsById(routes.params.id)
    if (res.status === 200) {
      orderData.value = res.data
      console.log(orderData.value)
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

//funcs

//hooks
onBeforeMount(() => {
  console.log(routes.params)
  fetchOrderData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.confirmed-orders-wrapper {
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
