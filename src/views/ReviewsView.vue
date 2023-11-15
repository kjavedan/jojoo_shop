<template>
  <h1 class="page-title">my reviews</h1>
  <div class="reviews-wrapper">
    <ReviewItem v-for="(item, i) in [1, 1, 1, 1, 1]" :key="i"></ReviewItem>
  </div>
</template>

<script setup>
import ReviewItem from '@/components/ReviewItem.vue'
//refs
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.reviews-wrapper {
  // border: solid;
  margin-top: 2rem;
}
</style>
