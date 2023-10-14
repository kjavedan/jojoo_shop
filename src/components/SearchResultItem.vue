<template>
  <div :class="['search-item']">
    <div class="product-img">
      <img :src="imgUrl" :alt="name" />
    </div>
    <div class="product-info">
      <div class="row">
        <h4>{{ name }}</h4>
        <h5>{{ price }}AED</h5>
      </div>
      <p class="txt-small">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(['id', 'imgUrl', 'name', 'price', 'description'])
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.search-item {
  min-height: 80px;
  width: 100%;
  margin-bottom: 1rem;
  @include row-between;
  gap: 10px;
  .product-img {
    height: 80px;
    width: 110px;
    background: #f6f6f6;
    @include round-m;
    @include flex-center;

    img {
      height: 90%;
    }
  }

  .product-info {
    width: 100%;
    .row {
      @include row-between;
      width: 100%;
      padding-right: 1rem;
    }
    p,
    span {
      color: #7c7c7c;
    }

    h4 {
      font-size: 1rem;
      line-height: normal;
      font-family: $primary-font;
    }
    h5 {
      font-weight: bold;
      font-size: 0.9rem;
    }
    h6 {
      font-weight: bold;
      font-size: 0.8rem;
    }
  }
  .txt-small {
    font-size: 13px;
    margin-top: 10px;

    &.black {
      color: black;
      font-weight: bold;
    }
  }
}
</style>
