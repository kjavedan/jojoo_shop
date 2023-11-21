<template>
  <div class="order-card">
    <div class="card-header">
      <h4 class="title">Title</h4>
      <span>{{ formatDate(orderData.orderDate) }}</span>
    </div>
    <div class="card-body">
      <div class="row">
        <span class="label">Tracking ID:</span>
        <span class="value">{{ orderData._id }}</span>
      </div>
      <div class="row">
        <span class="label">Total Items: </span>
        <span class="value">{{ orderData.qty }}</span>
      </div>
      <div class="row">
        <span class="label">Status:</span>
        <span class="value">{{ orderData.status }}</span>
      </div>
      <div class="row">
        <span class="label">Real Price:</span>
        <span class="value">{{ orderData.totalPrice }}AED</span>
      </div>
      <div class="row">
        <span class="label">discounted Price:</span>
        <span class="value">{{ orderData.discountedTotalPrice }}AED</span>
      </div>
    </div>
    <div class="card-footer">
      <span class="label"
        >Total Price:
        <span class="total-price"> {{ orderData.discountedTotalPrice }}AED </span>
      </span>
      <button
        class="details-btn"
        @click="router.push({ name: 'confirmed-order', params: { id: orderData._id } })"
      >
        details
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { formatDate } from '@/utils'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//props
const props = defineProps(['orderData'])

//refs
const { orderData } = toRefs(props)

console.log(orderData.value)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.order-card {
  background: #f6f6f6;
  @include round-l;
  margin-bottom: 0.5rem;
  padding: 1rem;
  .card-header {
    @include row-between;

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      @include text-shadow;
    }
  }
  .card-body {
    margin-top: 0.5rem;

    .label {
      width: 120px;
      display: inline-block;
      font-size: 0.8rem;
      color: rgb(131, 131, 131);
    }
    .value {
      font-size: 0.8rem;
      color: black;
    }
  }
  .card-footer {
    margin-top: 0.5rem;
    @include row-between;

    .label {
      .total-price {
        font-size: 1.2rem;
        font-weight: bold;
        margin-left: 5px;
      }
    }
    .value {
      font-size: 0.9rem;
    }

    .details-btn {
      padding: 0.5rem 0.9rem;
      @include round-l;
      border: solid #000;
      @include shadow-m;
      cursor: pointer;
    }
  }
}
</style>
