<template>
  <div class="order-card">
    <div class="card-header">
      <h4 class="title">Title</h4>
      <span>date</span>
    </div>
    <div class="card-body">
      <div class="row">
        <span class="label">Tracking ID:</span>
        <span class="value">value</span>
      </div>
      <div class="row">
        <span class="label">Total Items:</span>
        <span class="value">value</span>
      </div>
      <div class="row">
        <span class="label">Status:</span>
        <span class="value">value</span>
      </div>
    </div>
    <div class="card-footer">
      <span class="label"
        >Total Price:
        <span class="total-price"> 100AED </span>
      </span>
      <button class="details-btn">details</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//refs
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.order-card {
  background: #f6f6f6;
  @include round-l;
  margin-bottom: 0.5rem;
  padding: 1rem 2rem;
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
      width: 100px;
      display: inline-block;
      color: rgb(131, 131, 131);
    }
    .value {
      color: black;
    }
  }
  .card-footer {
    margin-top: 0.5rem;
    @include row-between;

    .label {
      font-size: 1.1rem;
      .total-price {
        font-size: 1.3rem;
        font-weight: bold;
        margin-left: 5px;
      }
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
