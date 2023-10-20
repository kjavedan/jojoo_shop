<template>
  <div :class="['cart-item']">
    <div class="left">
      <div class="delete" @click="store.removeProductFromCart(id)">
        <img height="24" src="@/assets/images/Trash.png" :alt="trash" />
      </div>
      <div class="product-img">
        <img :src="imgUrl" :alt="name" />
      </div>
    </div>
    <div class="product-info">
      <div class="row">
        <h4>{{ name }}</h4>
        <h5>{{ price }}AED</h5>
      </div>
      <p class="txt-small">{{ description }}</p>
      <div class="row">
        <h5>count:</h5>
        <span class="txt-small black">{{ count }}</span>
      </div>
      <div class="row">
        <h6>Total price:</h6>
        <span class="txt-small">{{ count * price }}AED</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'

defineProps(['id', 'imgUrl', 'name', 'price', 'description', 'count'])

//store
const store = useProductStore()
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.cart-item {
  height: 80px;
  @include row-between;
  gap: 10px;
  .left {
    width: 130px;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    .delete {
      cursor: pointer;
      width: 30px;
      @include flex-center;
    }
    .product-img {
      min-width: 80px;
      background: #f6f6f6;
      height: 100%;
      @include round-m;
      @include flex-center;

      img {
        height: 70%;
      }
    }
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
