<template>
  <div class="slides-wrapper" :style="{ height: slidesWrapperHeight }">
    <div class="slides">image will go here</div>
  </div>
  <div class="product-info">
    <div class="header">
      <h2 class="header-title">Pokemon</h2>
      <span class="rate">rate</span>
      <span class="price">290.99AED</span>
    </div>
    <div class="body">
      <h4 class="body-title">description</h4>
      <p class="body-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, amet adipisci dicta,
        laudantium iure provident dignissimos maiores delectus eos tempora libero et similique
        voluptates odit laborum eaque optio vitae incidunt!
      </p>
    </div>
    <div class="footer">
      <h4 class="footer-title">Reviews</h4>
      <div class="review-item">review Item</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const slidesWrapperHeight = ref('25rem')

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const handleScroll = () => {
  const scrollPosition = window.scrollY

  // Adjust the height based on the scroll position
  slidesWrapperHeight.value = scrollPosition > 10 ? '18rem' : '25rem'
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.slides-wrapper {
  border: solid;
  position: sticky;
  top: 0;
  height: 25pc;
  background: #f6f6f6;
  @include flex-center;
  transition: height 0.2s ease;
  .slides {
    border: solid;
    height: 90%;
    width: 90%;
  }
}
.product-info {
  margin-top: 1rem;
  border: solid;

  .header {
    display: flex;
    align-items: center;
    .rate {
      margin-left: 5px;
    }
    .price {
      margin-left: auto;
    }
  }
  .body {
    margin-top: 1rem;
    border: solid;
    .body-title {
      font-weight: bold;
    }
    .description {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      line-height: 0.8rem;
      color: #717171;
    }
  }
  .footer {
    margin-top: 1rem;
    border: solid;
    .footer-title {
      font-weight: bold;
    }
  }
}
</style>
