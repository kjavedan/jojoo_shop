<template>
  <div class="order">
    <h4 class="order__status">{{ getStatus }}</h4>
    <h5 class="order__id">#{{ orderId }}</h5>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.order {
  height: 70px;
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
</style>
