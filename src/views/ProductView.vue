<template>
  <div :class="['slides-wrapper', { shrink: isShrink }]" v-show="!loading">
    <el-carousel
      class="carousel"
      ref="myCarousel"
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

  <div class="product-info" ref="containerRef" v-show="!loading">
    <div class="header">
      <h2 class="header-title">{{ productDetails?.name }}</h2>
      <span class="rate">
        ({{ productDetails?.rate }})
        <img src="@/assets/images/Star.png" alt="star" />
      </span>
      <span class="price-label">
        price:
        <span class="price">{{ productDetails?.price }}AED</span>
      </span>
    </div>
    <div class="body">
      <h4 class="body-title">description</h4>
      <span :class="['description', { expand: isExpandDescription }]">
        {{ productDetails?.description }}
      </span>
      <div class="read-more" @click="isExpandDescription = !isExpandDescription">
        {{ isExpandDescription ? 'Read less' : 'Read More' }}
      </div>
    </div>
    <div class="footer" v-if="!loading">
      <h4 class="footer-title">Reviews: ({{ productReviews?.length }})</h4>
      <div class="review-items" v-if="productReviews?.length">
        <ReviewItem
          v-for="review in productReviews"
          :key="review._id"
          :reviewerName="review.reviewerName"
          :rate="review.rate"
          :comment="review.comment"
          :reviewDate="review.reviewDate"
          :isProductPage="true"
        ></ReviewItem>
      </div>
    </div>
  </div>
  <div class="operation" v-if="!loading">
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
  <LoadingScreen v-if="loading"></LoadingScreen>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ButtonAddToCart from '../components/ButtonAddToCart.vue'
import { useProductStore } from '@/stores/product'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getProductById } from '@/api/product'
import { getProductReviews } from '@/api/review'
import LoadingScreen from '@/components/LoadingScreen.vue'
//route
const route = useRoute()
const router = useRouter()

//store
const store = useProductStore()

//refs
const isShrink = ref(false)
const containerRef = ref(null)
const myCarousel = ref(null)
const isExpandDescription = ref(false)
const isCheckoutBtn = ref(false)
const counter = ref(0)
const loading = ref(false)
const productDetails = ref(null)
const productReviews = ref(null)

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

const fetchProductDetails = async () => {
  const productId = route.params.id
  loading.value = true
  try {
    const productDetailsRes = await getProductById(productId)
    const productReviewsRes = await getProductReviews(productId)
    productDetails.value = productDetailsRes.data
    productReviews.value = productReviewsRes.data
    loading.value = false
    console.log('ran')
  } catch (error) {
    console.log(error)
    ElMessage.error(error)
    loading.value = false
  }
}
//hooks
onBeforeMount(() => {
  fetchProductDetails()
})

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
        height: 16px;
      }
    }
    .price-label {
      margin-left: auto;
      // font-size: 16px;
      // font-weight: bold;
      // color: gray;
      .price {
        font-size: 1.3rem;
        font-weight: bold;
      }
      @include pc-s {
        font-size: 1.2rem;
        .price {
          font-size: 2rem;
        }
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
  z-index: 50;
  @include flex-center;
  @include action-btns;

  @include pc-s {
    height: 120px;
  }
}

.btns-wrapper {
  // border: solid 1px white;
  width: 90%;
  margin: 0 auto;

  @include pc-s {
    width: 360px;
  }
}
</style>
