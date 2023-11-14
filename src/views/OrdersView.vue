<template>
  <h1 class="page-title">my orders</h1>
  <el-radio-group class="group-btn" v-model="status" size="large">
    <el-radio-button label="processing"></el-radio-button>
    <el-radio-button label="packed"></el-radio-button>
    <el-radio-button label="shipped"></el-radio-button>
    <el-radio-button label="delivered"></el-radio-button>
  </el-radio-group>

  <div class="orders-wrapper">
    <OrderStatuCard v-for="(item, i) in [1, 1, 1, 1, 1, 1, 1]" :key="i"></OrderStatuCard>
  </div>
</template>

<script setup>
import OrderStatuCard from '@/components/OrderStatusCard.vue'
import { ref } from 'vue'

//refs
const status = ref('processing')
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.group-btn {
  margin-top: 1rem;
  width: 100%;
  &.ep-radio-group {
    display: flex;
    .ep-radio-button {
      width: 25%;
    }
  }
}
.orders-wrapper {
  // border: solid;

  margin-top: 2rem;
}
</style>
