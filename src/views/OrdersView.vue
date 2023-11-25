<template>
  <div>
    <h1 class="page-title">{{ $t('myOrders') }}</h1>
    <div v-if="!loading">
      <div v-if="ordersData.length">
        <el-radio-group class="group-btn" v-model="status" size="large">
          <el-radio-button label="process">{{ $t('process') }}</el-radio-button>
          <el-radio-button label="packed">{{ $t('packed') }}</el-radio-button>
          <el-radio-button label="shipped">{{ $t('shipped') }}</el-radio-button>
          <el-radio-button label="delivered">{{ $t('delivered') }}</el-radio-button>
        </el-radio-group>

        <div class="orders-wrapper" v-if="filteredOrdersData.length">
          <OrderStatusCard
            v-for="order in filteredOrdersData"
            :key="order._id"
            :orderData="order"
          ></OrderStatusCard>
        </div>
      </div>
      <div v-else class="no-orders">
        <img src="@/assets/images/no-orders.jpg" alt="no-orders" />
        <p>{{ $t('noOrders') }}</p>
        <el-button type="primary" @click="router.push({ name: 'home' })">{{
          $t('shopNow')
        }}</el-button>
      </div>
    </div>
    <LoadingScreen v-else></LoadingScreen>
  </div>
</template>

<script setup>
import OrderStatuCard from '@/components/OrderStatusCard.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import LoadingScreen from '../components/LoadingScreen.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

//router
const router = useRouter()

//store
const orderStore = useOrderStore()

//refs
const { ordersData, loading } = storeToRefs(orderStore)
const filteredOrdersData = computed(() => {
  return ordersData.value.filter((order) => order.status === status.value)
})

const status = ref('process')
//funcs

//hooks
watch(filteredOrdersData, () => {
  console.log(filteredOrdersData.value)
})
onBeforeMount(() => {
  orderStore.fetchUserOrdersData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.group-btn {
  margin-top: 1rem;
  width: 100%;
  // direction: ltr;
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
.no-orders {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  p {
    text-align: center;
    width: 90%;
    font-size: 0.9rem;
  }
  img {
    margin-top: 2rem;
    width: 90%;
    max-width: 400px;
  }
}
</style>
