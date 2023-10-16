<template>
  <div :class="['card']" @click="handleClick(id)">
    <img :src="imgUrls[0]" alt="product" />
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { ref, toRef } from 'vue'

//store
const store = useProductStore()

// props
const props = defineProps(['id', 'name', 'price', 'imgUrls', 'description', 'selected', 'isShow'])

//refs
const prodctInfo = toRef(props)

//funcs
const handleClick = () => {
  store.holdProductInfo(prodctInfo.value)
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.card {
  @include shadow-s;
  @include round-m;
  @include flex-center;
  background: #f6f6f6;
  cursor: pointer;
  aspect-ratio: 1/1;

  img {
    height: 80%;
  }
}
</style>
