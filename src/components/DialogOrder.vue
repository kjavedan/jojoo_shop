<template>
  <div class="order-dialog" :class="{ show: heldProduct !== null }" @click="unHeldProduct">
    <div
      class="dialog-content animate__animated animate__pulse"
      v-if="heldProduct !== null"
      @click.stop
    >
      <span class="save-icon" @click="store.toggleFavorite(heldProduct.id)">
        <img
          v-if="!heldProduct.selected"
          height="30"
          src="@/assets/images/bookmark-outline.png"
          alt=""
        />
        <img v-else height="30" src="@/assets/images/bookmark.png" alt="" />
      </span>
      <div class="images-wrapper">
        <div class="main-img">
          <img :src="heldImg" alt="" />
        </div>
        <div class="childs-img">
          <div class="child-img" @click="handleImageChange(0)">
            <img :src="heldProduct.imgUrls[0]" alt="" />
          </div>
          <div class="child-img" @click="handleImageChange(1)">
            <img :src="heldProduct.imgUrls[1]" alt="" />
          </div>
          <div class="child-img" @click="handleImageChange(2)">
            <img :src="heldProduct.imgUrls[2]" alt="" />
          </div>
        </div>
      </div>
      <div class="info">
        <div class="row">
          <h2>{{ heldProduct.name }}</h2>
          <span>{{ heldProduct.price }}AED</span>
        </div>
        <p class="description">
          {{ heldProduct.description }}
        </p>
      </div>
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
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import ButtonAddToCart from './ButtonAddToCart.vue'

//routes
const router = useRouter()

//store
const store = useProductStore()
const { heldProduct } = storeToRefs(store)

//refs
const heldImg = ref(heldProduct.value?.imgUrls[0])
const isCheckoutBtn = ref(false)
const counter = ref(0)

//funcs
const unHeldProduct = () => {
  store.holdProductInfo(null)
  isCheckoutBtn.value = false
  counter.value = 0
}

const handleImageChange = (index) => {
  heldImg.value = heldProduct.value.imgUrls[index]
}

const handleClick = () => {
  store.addProductToCart(heldProduct.value)
  isCheckoutBtn.value = true
  counter.value++
}

const handleIncrease = () => {
  store.addProductToCart(heldProduct.value)
  counter.value++
}

const handleDecrease = () => {
  store.decreaseProductQty(heldProduct.value)
  counter.value--

  if (counter.value <= 0) {
    isCheckoutBtn.value = false
  }
}

const handleCheckout = () => {
  heldProduct.value = null
  isCheckoutBtn.value = false
  counter.value = 0
  router.push({ name: 'cart' })
}
//hooks
watch(heldProduct, (newValue) => {
  if (heldProduct.value) {
    handleImageChange(0)
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.order-dialog {
  .dialog-content {
    height: 80svh;
    padding: 0.5rem 2rem;
    position: relative;
    @include flex-col;
    margin-top: -3rem;

    @include pc-m {
      margin-top: unset;
    }
    .save-icon {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    .images-wrapper {
      height: 60%;
      width: 100%;
      position: relative;
      gap: 10px;
      .main-img {
        height: 70%;
        @include flex-center;
        img {
          height: 95%;
        }
      }

      .childs-img {
        margin-top: 2rem;
        @include row-around;
        height: 20%;
        .child-img {
          @include mobile {
            height: 80px;
            width: 80px;
          }
          height: 90px;
          width: 90px;
          border-radius: 20px 20px 0px 20px;
          background: rgba(191, 191, 191, 0.25);
          box-shadow: 3px 3px 7px 1px rgba(191, 191, 191, 0.2);
          cursor: pointer;
          @include flex-center;
          img {
            height: 80%;
          }
        }
      }
    }
    .info {
      margin-top: 2rem;
      height: 20%;
      .row {
        @include row-between;

        span {
          font-weight: bold;
          font-size: 1.2rem;
        }
      }

      .description {
        font-size: 12px;
        line-height: 15px;
        margin-top: 0.5rem;
        color: #7c7c7c;
      }
    }
    .action-btns {
      @include flex-row;
      gap: 12px;
      button {
        @include ease;
        width: 100%;
        border: none;
        outline: none;
        &:active {
          transform: scale(0.9);
        }
        img {
          height: 80%;
        }

        @include flex-center;
        color: white;
        height: 45px;
        @include round-l;
      }
      .small {
        min-height: 12%;
        box-shadow: 2px 2px 7px 0px rgba(206, 206, 206, 0.43) inset;
      }
      .large {
        min-width: 50%;
        background: black;
        font-family: $primary-font;
        @include shadow-l;
        gap: 10px;
        .basket {
          height: 50%;
          position: relative;
          .circle {
            position: absolute;
            top: -3px;
            left: -5px;
            font-size: 10px;
            height: 15px;
            width: 15px;
            background: white;
            color: #000;

            @include round-xl;
          }
          img {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
