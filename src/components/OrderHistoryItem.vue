<template>
  <div class="order" @click="handleClick">
    <h4 class="order__status">{{ getStatus }}</h4>
    <h5 class="order__id">#{{ orderId }}</h5>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//props
const props = defineProps(['orderId', 'status', 'totalPrice', 'items'])

//computed
const getStatus = computed(() => {
  switch (props.status) {
    case '1':
      return 'in process'
    case '2':
      return 'ready to ship'
    case '3':
      return 'shiped'
    case '4':
      return 'delivered'
    default:
      return undefined
  }
})

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
