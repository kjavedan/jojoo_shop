<template>
  <div :class="['card']" @click="handleClick(id)">
    <img :src="imgUrls[0]" alt="product" />
    <span class="price-tag">{{ price }}AED </span>
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

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.card {
  @include shadow-s;
  @include round-m;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #f6f6f6;
  cursor: pointer;
  aspect-ratio: 1/1;
  position: relative;
  img {
    height: 70%;
  }
  .price-tag {
    // position: absolute;
    font-weight: 600;
    color: rgb(115, 115, 115);
    font-family: 'Poppins';
  }
}
</style>
