<template>
  <div class="order-history-wrapper" v-if="ordersData.length">
    <h3>Order history</h3>
    <div class="order-history">
      <OrderHistoryItem
        v-for="order in ordersData"
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
import { useOrderStore } from '../stores/order'
import OrderHistoryItem from './OrderHistoryItem.vue'

//store
const store = useOrderStore()

//refs
const { ordersData } = storeToRefs(store)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.order-history-wrapper {
  // padding-left: 0.5rem;

  .order-history {
    width: calc(100% + 6px);
    overflow-x: scroll;
    height: 80px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 2rem;

    .order {
      height: 65px;
      cursor: pointer;
      min-width: 100px;
      padding: 10px;
      @include round-l;
      @include shadow-m;
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
