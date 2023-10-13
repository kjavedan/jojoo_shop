<template>
  <div :class="['card']" @click="handleClick(id)">
    <img src="imgUrl" alt="product" />
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'

defineProps(['id', 'name', 'price', 'imgUrl', 'description', 'selected'])

//store
const store = useProductStore()

//funcs
const handleClick = (id) => {
  store.holdId(id)
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.card {
  @include shadow-s;
  @include round-m;
  @include flex-center;
  background: #f6f6f6;
  max-height: 500px;
  max-width: 500px;
  aspect-ratio: 1/1;

  img {
    height: 80%;
  }
}
</style>
