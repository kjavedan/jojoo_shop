<template>
  <div class="leave-review">
    <el-form v-model="review" class="review-form">
      <div class="left">
        <textarea v-model="review.comment" placeholder="leave your comment here"></textarea>
      </div>
      <div class="right">
        <div class="rates">
          <el-rate v-model="review.rate"></el-rate>
        </div>
        <el-button @click="handleClick" :loading="loading" class="form-btn" type="primary">{{
          isEditReview ? 'Save' : 'Send'
        }}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { addReview, updateReview } from '@/api/review'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

//store
const store = useUserStore()
const { userDetails } = storeToRefs(store)

//props
const props = defineProps([
  'productId',
  'productName',
  'rate',
  'comment',
  'reviewId',
  'isEditReview'
])

//ref
const { isEditReview } = toRefs(props)

//emit
const emit = defineEmits(['refreshProductReview', 'refreshReviewsData'])

//refs
const loading = ref(false)
const review = ref({
  userId: userDetails.value._id,
  reviewerName: userDetails.value.fullName,
  productId: props.productId,
  productName: props.productName,
  comment: props.comment,
  rate: props.rate ? props.rate : 5
})

//funcs
const handleClick = () => {
  isEditReview.value ? handleUpdateReview() : handleAddReview()
}
const handleAddReview = async () => {
  try {
    loading.value = true
    const res = await addReview(review.value)
    if (res.status === 201) {
      ElMessage.success('Your review added successfully')
      emit('refreshProductReview')
      review.value.comment = ''
      loading.value = false
    }
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

const handleUpdateReview = async () => {
  try {
    loading.value = true
    const res = await updateReview(props.reviewId, {
      comment: review.value.comment,
      rate: review.value.rate
    })
    if (res.status === 200) {
      ElMessage.success('Your review updated successfully')
      emit('refreshReviewsData')
      emit('refreshProductReview')
      loading.value = false
    }
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.leave-review {
  //   border: solid;
  margin-top: 0.5rem;
  width: 100%;

  .review-form {
    display: flex;
    align-items: center;
    background: #f6f6f6;
    border-radius: 16px;
    position: relative;
    height: 150px;
    max-width: 500px;
    margin-top: 0.5rem;
    textarea {
      border: none;
      outline: none;
      background: transparent;
      padding: 1rem;
      padding-right: 0;
      color: gray;
      font-size: 11px;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      resize: none;
    }
    .left {
      height: 100%;
      width: 100%;
    }
    .right {
      height: 100%;
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      padding: 1rem;
      .form-btn {
        // position: absolute;
        // bottom: 15px;
        // right: 15px;
      }
    }
  }
}
</style>