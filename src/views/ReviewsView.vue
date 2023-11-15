<template>
  <h1 class="page-title">my reviews</h1>
  <div class="reviews-wrapper">
    <MyReviewItem v-for="(item, i) in [1, 1, 1, 1, 1]" :key="i"></MyReviewItem>
  </div>
</template>

<script setup>
import MyReviewItem from '@/components/MyReviewItem.vue'
//refs
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.reviews-wrapper {
  // border: solid;
  margin-top: 2rem;
}
</style>
