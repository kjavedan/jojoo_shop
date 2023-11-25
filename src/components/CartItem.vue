<template>
  <div v-if="!loading">
    <div :class="['cart-item']">
      <div class="left" @click="router.push({ name: 'product', params: { id: productId } })">
        <div class="product-img">
          <img :src="imgUrl" :alt="name" />
        </div>
      </div>
      <div class="product-info">
        <div class="row">
          <h4>{{ name }}</h4>
          <h5>{{ price }}AED</h5>
        </div>
        <p class="txt-small">{{ description }}</p>
        <div class="row">
          <h5>{{ $t('quantity') }}:</h5>
          <span class="txt-small black">{{ qty }}</span>
        </div>
        <div class="row">
          <h6>{{ $t('totalPrice') }}:</h6>
          <span class="txt-small">{{ qty * price }}AED</span>
        </div>
        <div class="row">
          <h6>{{ $t('discountedPrice') }}:</h6>
          <span class="txt-small">{{ (qty * discountedPrice).toFixed(2) }}AED</span>
        </div>
      </div>
      <div class="operate-wrapper" v-if="!history">
        <div class="operate" @click="handleDeleteFromCart(productId, cartId)">
          <img height="24" src="@/assets/images/Trash.png" alt="trash" />
        </div>
        <div v-if="qty > 1" class="operate" @click="handleDecreaseCartItem">
          <img height="24" src="@/assets/images/Minus.png" alt="trash" />
        </div>
        <div class="operate" @click="handleIncreaseCartItem">
          <img height="24" src="@/assets/images/Add.png" alt="trash" />
        </div>
      </div>
    </div>
  </div>
  <LoadingScreen v-else></LoadingScreen>
</template>

<script setup>
import { ref } from 'vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import { useCartLogic } from '../composables/cartLogic'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

const props = defineProps([
  'productId',
  'cartId',
  'imgUrl',
  'name',
  'price',
  'discountedPrice',
  'discount',
  'description',
  'qty',
  'history'
])

//composibles
const { handleIncrease, handleDecrease, handleDeleteFromCart } = useCartLogic()

//refs
const loading = ref(false)

//funcs
const handleIncreaseCartItem = async () => {
  handleIncrease(props.productId, props.cartId, props.qty + 1)
}
const handleDecreaseCartItem = () => {
  handleDecrease(props.productId, props.cartId, props.qty - 1)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.cart-item {
  height: 95px;
  @include row-between;
  gap: 10px;
  .left {
    // width: 130px;
    height: 100%;
    display: flex;
    align-items: center;

    .product-img {
      min-width: 90px;
      background: #f6f6f6;
      height: 100%;
      @include round-m;
      @include flex-center;

      img {
        height: 80%;
      }
    }
  }

  .product-info {
    width: 100%;
    .row {
      @include row-between;
      width: 100%;
    }
    p,
    span {
      color: #7c7c7c;
    }

    h4 {
      // font-size: 1.2rem;
      line-height: normal;
      font-family: $primary-font;
    }
    h5 {
      font-weight: bold;
      // font-size: 0.9rem;
    }
    h6 {
      font-weight: bold;
      // font-size: 0.8rem;
    }
  }
  .txt-small {
    font-size: 11px;

    &.black {
      color: black;
      font-weight: bold;
    }
  }
  .operate-wrapper {
    @include flex-center;
    margin-left: 10px;
    width: 25px;
    // border: solid;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-around;
    align-items: center;
    .operate {
      cursor: pointer;
      // border: solid;
      img {
        // height: 22px;
      }
    }
  }
}
</style>
