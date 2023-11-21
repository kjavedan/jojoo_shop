<template>
  <h1 class="page-title">my orders</h1>
  <div v-if="!loading">
    <div v-if="ordersData.length">
      <el-radio-group class="group-btn" v-model="status" size="large">
        <el-radio-button label="process"></el-radio-button>
        <el-radio-button label="packed"></el-radio-button>
        <el-radio-button label="shipped"></el-radio-button>
        <el-radio-button label="delivered"></el-radio-button>
      </el-radio-group>

      <div class="orders-wrapper" v-if="filteredOrdersData.length">
        <OrderStatuCard
          v-for="order in filteredOrdersData"
          :key="order._id"
          :orderData="order"
        ></OrderStatuCard>
      </div>
    </div>
    <div v-else class="no-orders">
      <img src="@/assets/images/no-orders.jpg" alt="no-orders" />
      <p>There is no order yet</p>
      <el-button type="primary" @click="router.push({ name: 'home' })">Shop Now</el-button>
    </div>
  </div>
  <LoadingScreen v-else></LoadingScreen>
</template>

<script setup>
import OrderStatuCard from '@/components/OrderStatusCard.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import { getUserOrders } from '@/api/order'
import LoadingScreen from '../components/LoadingScreen.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//store
const store = useUserStore()

//refs
const { userDetails } = storeToRefs(store)
const ordersData = ref([])
const filteredOrdersData = computed(() => {
  return ordersData.value.filter((order) => order.status === status.value)
})
const loading = ref(false)
const status = ref('process')

//funcs
const fetchUserOrdersData = async () => {
  loading.value = true
  try {
    const res = await getUserOrders(userDetails.value._id)
    if (res.status === 200) {
      ordersData.value = res.data
      console.log(res.data)
      console.log(ordersData.value)
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

//hooks
watch(filteredOrdersData, () => {
  console.log(filteredOrdersData.value)
})
onBeforeMount(() => {
  fetchUserOrdersData()
})
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
