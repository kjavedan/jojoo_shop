<template>
  <div :class="['card']">
    <img :src="imgUrl" alt="product" />
  </div>
</template>

<script setup>
defineProps(['imgUrl'])
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.card {
  @include shadow-s;
  @include round-m;
  @include flex-center;
  background: #f6f6f6;
  max-height: 275px;
  max-width: 275px;
  aspect-ratio: 1/1;

  img {
    height: 80%;
  }
}
</style>
