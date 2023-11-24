<template>
  <div class="leave-review">
    <h4>Leave a review</h4>
    <el-form v-model="review" class="review-form">
      <div class="left">
        <textarea v-model="review.comment" placeholder="leave your comment here"></textarea>
      </div>
      <div class="right">
        <div class="rates">
          <el-rate v-model="review.rate"></el-rate>
        </div>
        <el-button @click="handleAddReview" :loading="loading" class="form-btn" type="primary"
          >Send</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { addReview } from '@/api/review'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { ElMessage } from 'element-plus'

//store
const store = useUserStore()
const { userDetails } = storeToRefs(store)
//props
const props = defineProps(['productId', 'productName'])

//emit
const emit = defineEmits(['refreshProductReview'])

//refs
const loading = ref(false)
const review = ref({
  userId: userDetails.value._id,
  reviewerName: userDetails.value.fullName,
  productId: props.productId,
  productName: props.productName,
  comment: '',
  rate: 5
})

//funcs
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
</script>

<style scoped lang="scss">
.leave-review {
  //   border: solid;
  margin-top: 1.5rem;
  width: 100%;

  h4 {
    font-size: 1.1rem;
    font-weight: bold;
  }
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
