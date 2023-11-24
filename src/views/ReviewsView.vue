<template>
  <h1 class="page-title">my reviews</h1>
  <div v-if="!loading">
    <div class="reviews-wrapper" v-if="reviewsData.length">
      <ReviewItem
        v-for="review in reviewsData"
        :key="review._id"
        :reviewId="review._id"
        :productName="review.productName"
        :rate="review.rate"
        :comment="review.comment"
        :reviewDate="review.reviewDate"
        @refreshReviewData="fetchUserReviewsData"
      ></ReviewItem>
    </div>
    <div v-else class="no-reviews">
      <img src="@/assets/images/no-reviews.png" alt="no-reviews" />
      <p>You havent commented on any product yet</p>
      <el-button type="primary" @click="router.push({ name: 'home' })">Comment Now</el-button>
    </div>
  </div>
  <LoadingScreen v-else></LoadingScreen>
</template>

<script setup>
import ReviewItem from '@/components/ReviewItem.vue'
import { storeToRefs } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from '../stores/user'
import { getUserReviews } from '@/api/review'
import LoadingScreen from '../components/LoadingScreen.vue'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//store
const store = useUserStore()

//refs
const { userDetails } = storeToRefs(store)
const reviewsData = ref([])
const loading = ref(false)

//funcs
const fetchUserReviewsData = async () => {
  loading.value = true
  try {
    const res = await getUserReviews(userDetails.value._id)
    if (res.status === 200) {
      reviewsData.value = res.data
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

//hooks
onBeforeMount(() => {
  fetchUserReviewsData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.reviews-wrapper {
  // border: solid;
  margin-top: 2rem;
}
.no-reviews {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  p {
    text-align: center;
    width: 90%;
    font-size: 0.9rem;
  }
  img {
    margin-top: 2rem;
    width: 90%;
    max-width: 400px;
  }
}
</style>
