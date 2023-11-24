<template>
  <div class="order" @click="handleClick">
    <h4 class="order__status">{{ status }}</h4>
    <h5 class="order__id">#{{ formatDate(orderDate) }}</h5>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils/index'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//props
const props = defineProps(['orderId', 'orderDate', 'status', 'totalPrice', 'items'])

//funcs
const handleClick = () => {
  router.push({ name: 'confirmed-order', params: { id: props.orderId } })
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.order {
  height: 70px;
  min-width: 110px;
  padding: 10px;
  @include round-m;
  background: $clr-white-soft;
  @include flex-col;

  justify-content: center;
  align-items: center;

  &__status {
    font-family: $primary-font;
  }
}
</style>
