<template>
  <div class="review-item">
    <div class="product-img" @click="handleReviewItemClick">
      <img src="https://i.postimg.cc/C5rKCL9g/ppk-1.png" alt="s" />
    </div>
    <div class="product-info">
      <div class="header">
        <h4 class="title">{{ isProductPage ? reviewerName : productName }}</h4>
        <span v-if="!isProductPage || userDetails._id === reviewerId" class="more">
          <ReviewMenuPopover
            :reviewId="reviewId"
            :productId="productId"
            :productName="productName"
            :comment="comment"
            :rate="rate"
            @refreshReviewData="refreshReviewData"
          ></ReviewMenuPopover>
        </span>
      </div>
      <div class="rates">
        <el-rate v-model="rate" disabled></el-rate>
      </div>
      <div class="description-container">
        <span :class="['description', { expand: isExpandDescription }]" ref="descriptionRef">
          {{ comment }}
        </span>
        <!-- if description length is more than 1 line then show read more btn -->
        <div
          v-if="isDescriptionOverflowed"
          class="read-more"
          @click="isExpandDescription = !isExpandDescription"
        >
          {{ isExpandDescription ? 'Read less' : 'Read More' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import ReviewMenuPopover from './ReviewMenuPopover.vue'

//router
const router = useRouter()

//emit
const emit = defineEmits(['refreshReviewData'])

//store
const store = useUserStore()
const { userDetails } = storeToRefs(store)

//props
const props = defineProps([
  'reviewId',
  'reviewerName',
  'productName',
  'rate',
  'comment',
  'reviewDate',
  'isProductPage',
  'reviewerId',
  'productId'
])

//refs
const { rate } = toRefs(props)
const isExpandDescription = ref(false)
const descriptionRef = ref(null)
const isDescriptionOverflowed = ref(false)

//func
const refreshReviewData = () => {
  emit('refreshReviewData')
}

const handleReviewItemClick = () => {
  if (!props.isProductPage) {
    router.push({ name: 'product', params: { id: props.productId } })
  }
}

onMounted(async () => {
  await nextTick() // Wait for the next render cycle

  // Check if the description is more than one line
  isDescriptionOverflowed.value =
    descriptionRef.value.scrollHeight > descriptionRef.value.clientHeight
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.review-item {
  // border: solid;
  height: fit-content;
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  .product-img {
    height: 70px;
    aspect-ratio: 1/1;
    @include flex-center;
    @include round-circle;
    background: #f6f6f6;

    img {
      height: 70%;
    }
  }
  .product-info {
    // border: solid;
    width: 100%;

    .header {
      @include row-between;

      .title {
        @include text-shadow;
        font-size: 1rem;
        font-weight: bold;
      }

      .more {
        // border: solid;
        cursor: pointer;
        img {
          margin-bottom: -12px;
        }
      }
    }

    .rates {
      // border: solid;
      height: 20px;
      .ep-rate {
        height: 20px;
      }
    }

    .description {
      //   border: solid;
      // padding-bottom: 1.5px;
      // margin-top: 0.5rem;
      font-size: 0.7rem;
      // line-height: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      -webkit-box-orient: vertical;
      color: rgb(118, 118, 118);

      &.expand {
        -webkit-line-clamp: unset;
      }
    }
    .read-more {
      background: #f8f9fa;
      color: rgb(86, 86, 86);
      padding: 0.1rem 0.5rem;
      font-size: 14px;
      @include round-l;
      // margin: 0.5rem auto;
      margin-left: auto;
      width: fit-content;
      cursor: pointer;
      font-family: $primary-font;
    }
  }
}
</style>
