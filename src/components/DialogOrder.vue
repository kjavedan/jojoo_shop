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
      <Button @click="handleClick"></Button>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import Button from './Button.vue'

//store
const store = useProductStore()
const { heldProduct } = storeToRefs(store)

//refs
const heldImg = ref(heldProduct.value?.imgUrls[0])

//funcs
const unHeldProduct = () => {
  store.holdProductInfo(null)
}

const handleImageChange = (index) => {
  heldImg.value = heldProduct.value.imgUrls[index]
}

const handleClick = () => {
  console.log('click')
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
  }
}
</style>
