<!-- File: FaqItem.vue -->
<template>
  <div class="faq-item">
    <h3>{{ question }}</h3>
    <p>{{ answer }}</p>
  </div>
</template>

<script setup>
//props
const props = defineProps(['question', 'answer'])
</script>

<style scoped>
.faq-item {
  margin-bottom: 20px;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

p {
  line-height: 1.6;
}
</style>
