<template>
  <div class="order">
    <h4 class="order__status">{{ status }}</h4>
    <h5 class="order__id">#{{ orderId }}</h5>
  </div>
</template>

<script setup>
defineProps(['orderId', 'status', 'totalPrice', 'items'])
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

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
</style>
