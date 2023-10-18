<template>
  <div class="wrapper">
    <h2>Order history</h2>
    <div class="order-history">
      <div class="order"></div>
      <div class="order"></div>
      <div class="order"></div>
      <div class="order"></div>
      <div class="order"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.wrapper {
  padding-left: 0.5rem;
  .order-history {
    width: calc(100% + 0.5rem);
    overflow-x: scroll;
    height: 120px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-right: 2rem;

    .order {
      height: 110px;
      min-width: 110px;
      padding: 5px;
      @include round-m;
      @include shadow-s;
      background: $clr-white-soft;
    }
  }
}
</style>
