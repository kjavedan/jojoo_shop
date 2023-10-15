<template>
  <div :class="['cart-item']">
    <div class="product-img"></div>
    <div class="product-info">
      <div class="row">
        <h4>Pokemon</h4>
        <h5>100AED</h5>
      </div>
      <p class="txt-small">inof about the product</p>
      <div class="row">
        <h5>Date:</h5>
        <span class="txt-small black">12/12/2023</span>
      </div>
      <div class="row">
        <h6>Seller number:</h6>
        <span class="txt-small">+971502597949</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['imgUrl'])
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.cart-item {
  height: 80px;
  @include row-between;
  gap: 10px;
  .product-img {
    min-width: 80px;
    background: #f6f6f6;
    height: 100%;
    @include round-m;
  }

  .product-info {
    width: 100%;
    .row {
      @include row-between;
      width: 100%;
    }
    p,
    span {
      color: #7c7c7c;
    }

    h4 {
      // font-size: 1.2rem;
      line-height: normal;
      font-family: $primary-font;
    }
    h5 {
      font-weight: bold;
      // font-size: 0.9rem;
    }
    h6 {
      font-weight: bold;
      // font-size: 0.8rem;
    }
  }
  .txt-small {
    font-size: 11px;

    &.black {
      color: black;
      font-weight: bold;
    }
  }
}
</style>
