<template>
  <div :class="['slides-wrapper', { shrink: isShrink }]">
    <el-carousel
      class="carousel"
      ref="myCarousel"
      arrow="never"
      :autoplay="false"
      v-touch:swipe.left="handleSwipeLeft"
      v-touch:swipe.right="handelSwipeRight"
    >
      <el-carousel-item v-for="item in 4" :key="item" autoplay="false">
        <div class="carousel-img">
          <img src="@/assets/images/dog.png" alt="preson" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

  <div class="product-info" ref="containerRef">
    <div class="header">
      <h2 class="header-title">Pokemon</h2>
      <span class="rate">
        (4.5)
        <img src="@/assets/images/Star.png" height="16px" alt="star" />
      </span>
      <span class="price">290.99AED</span>
    </div>
    <div class="body">
      <h4 class="body-title">description</h4>
      <span :class="['description', { expand: isExpandDescription }]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, amet adipisci dicta,
        laudantium iure provident dignissimos maiores delectus eos tempora libero et similique
        voluptates odit laborum eaque optio vitae incidunt! Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quo autem quam id quaerat alias nesciunt magni veniam voluptatem eius,
        neque libero necessitatibus? Culpa magni consequatur debitis sit id assumenda quasi
        excepturi adipisci est provident doloremque necessitatibus voluptatum tenetur possimus optio
        reiciendis, nulla nobis ad? Suscipit temporibus, mollitia recusandae repudiandae, fugiat,
        harum aliquam vel ut sequi eos magni iure beatae esse veritatis! Quaerat iste odio tempore
        totam beatae consequuntur impedit, modi perspiciatis nulla ducimus harum inventore quos vero
        optio ab sequi voluptatum dignissimos, dolor mollitia odit itaque, ad eligendi voluptatem.
        Inventore voluptatum doloribus molestiae, dicta nostrum animi mollitia similique non
        blanditiis?
      </span>
      <div class="read-more" @click="isExpandDescription = !isExpandDescription">
        {{ isExpandDescription ? 'Read less' : 'Read More' }}
      </div>
    </div>
    <div class="footer">
      <h4 class="footer-title">Reviews:</h4>
      <div class="review-item">
        <ReviewItem :isProductPage="true"></ReviewItem>
        <ReviewItem :isProductPage="true"></ReviewItem>
      </div>
    </div>
  </div>
  <div class="operation">
    <div class="btns-wrapper">
      <div v-if="isCheckoutBtn" class="action-btns">
        <button class="samll" @click="handleDecrease">
          <img src="@/assets/images/Minus.png" alt="remove" />
        </button>
        <button class="small" @click="handleIncrease">
          <img src="@/assets/images/Add.png" alt="remove" />
        </button>
        <button class="large" @click="handleCheckout">
          <div class="basket">
            <div class="circle">{{ counter }}</div>
            <img src="@/assets/images/Basket.png" alt="remove" />
          </div>
          checkout
        </button>
      </div>
      <ButtonAddToCart v-else @click="handleClick"></ButtonAddToCart>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ButtonAddToCart from '../components/ButtonAddToCart.vue'
import { useProductStore } from '@/stores/product'

//store
const store = useProductStore()

//refs
const isShrink = ref(false)
const containerRef = ref(null)
const myCarousel = ref(null)
const isExpandDescription = ref(false)
const isCheckoutBtn = ref(false)
const counter = ref(0)

//funcs
const handleScroll = () => {
  let containerTopPosition = containerRef.value.getBoundingClientRect().y
  if (!isShrink.value && containerTopPosition <= 416) {
    isShrink.value = true
  } else if (isShrink.value && containerTopPosition == 208) {
    isShrink.value = false
  }
}

const handelSwipeRight = () => {
  console.log('right')
  myCarousel.value.prev()
}
const handleSwipeLeft = () => {
  console.log('left')
  myCarousel.value.next()
}

const handleClick = () => {
  // store.addProductToCart(heldProduct.value)
  isCheckoutBtn.value = true
  counter.value++
}

const handleIncrease = () => {
  // store.addProductToCart(heldProduct.value)
  counter.value++
}

const handleDecrease = () => {
  // store.decreaseProductQty(heldProduct.value)
  counter.value--

  if (counter.value <= 0) {
    isCheckoutBtn.value = false
  }
}

const handleCheckout = () => {
  // heldProduct.value = null
  isCheckoutBtn.value = false
  counter.value = 0
  router.push({ name: 'cart' })
}

//hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.slides-wrapper {
  // border: solid;
  position: sticky;
  z-index: 10;
  top: 0;
  height: 25pc;
  background: #f6f6f6;
  margin-left: -2.5%;
  width: calc(100% + 5%);
  @include flex-center;
  transition: height 0.4s ease;

  @include pc-s {
    width: 100%;
    margin: 4rem 0 2rem 0;
    position: relative;
    height: 30pc;
  }

  &.shrink {
    height: 12pc;
    @include pc-s {
      height: 30pc;
    }
  }

  .carousel {
    // border: solid 2px red;
    height: 95%;
    width: 95%;
    .carousel-img {
      // border: solid 2px blue;
      height: 100%;
      @include flex-center;
      img {
        height: 100%;
        width: auto;
      }
    }
  }
}
.product-info {
  margin-top: 1rem;
  // border: solid;
  h2 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.1rem;
    font-weight: 700;
  }
  @include tablet {
    h2 {
      font-size: 2rem;
    }
    h4 {
      font-size: 1.5rem;
    }
  }
  .header {
    display: flex;
    align-items: center;
    .rate {
      margin-left: 10px;
      img {
        margin-bottom: -2px;
      }
    }
    .price {
      margin-left: auto;
      font-size: 1.5rem;
      font-weight: bold;

      @include pc-s {
        font-size: 2rem;
      }
    }
  }
  .body {
    margin-top: 1rem;
    // border: solid;

    .body-title {
      // font-weight: bold;
    }
    .description {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      // line-height: 0.8rem;
      color: #717171;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      overflow: hidden;
      white-space: normal;
      -webkit-box-orient: vertical;
      @include ease;
      &.expand {
        -webkit-line-clamp: unset;
      }
    }
    .read-more {
      background: #f8f9fa;
      color: rgb(86, 86, 86);
      padding: 0.1rem 2rem;
      @include round-l;
      margin: 0.5rem auto;
      width: fit-content;
      cursor: pointer;
      font-family: $primary-font;
    }
  }
  .footer {
    margin-top: 2rem;
    // border: solid;
    .footer-title {
      // font-weight: bold;
    }
  }
}
.operation {
  // border: solid;
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 80px;
  background: #f8f9fa;

  @include flex-center;
  @include action-btns;
}

.btns-wrapper {
  // border: solid 1px white;
  width: 90%;
  margin: 0 auto;
}
</style>
