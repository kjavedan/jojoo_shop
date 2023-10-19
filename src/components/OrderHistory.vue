<template>
  <div class="wrapper">
    <h2>Order history</h2>
    <div class="order-history">
      <OrderHistoryItem
        v-for="order in orderHistoryData"
        :key="order.orderId"
        :orderId="order.orderId"
        :totalPrice="order.totalPrice"
        :status="order.status"
        :items="order.items"
      ></OrderHistoryItem>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '../stores/product'
import OrderHistoryItem from './OrderHistoryItem.vue'

//store
const store = useProductStore()

//refs
const { orderHistoryData } = storeToRefs(store)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.wrapper {
  padding-left: 0.5rem;
  .order-history {
    width: calc(100% + 6px);
    overflow-x: scroll;
    height: 120px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 2rem;

    .order {
      height: 110px;
      min-width: 110px;
      padding: 10px;
      @include round-m;
      @include shadow-s;
      background: $clr-white-soft;
      @include flex-col;
      justify-content: center;
      align-items: center;

      &__status {
        font-family: $primary-font;
      }
    }
  }
}
</style>
