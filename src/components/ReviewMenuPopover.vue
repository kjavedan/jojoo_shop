<template>
  <el-popover placement="left" ref="popover" :width="50" trigger="click">
    <div>
      <el-button size="small" type="danger" text @click="handleDeleteReview">Delete</el-button>
      <el-button size="small" text @click="isEditReview = true">Edit</el-button>
    </div>
    <template #reference>
      <div>
        <img src="@/assets/images/MenuVertical.png" alt="menu" />
      </div>
    </template>
  </el-popover>
  <el-dialog v-model="isEditReview" title="Edit review" @close="isEditReview = false">
    <LeaveReview
      :reviewId="reviewId"
      :productId="productId"
      :productName="productName"
      :comment="comment"
      :isEditReview="isEditReview"
      :rate="rate"
      @refreshReviewsData="emit('refreshReviewData')"
    ></LeaveReview>
    <br />
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { deleteReview } from '@/api/review'
import { ref } from 'vue'
import LeaveReview from './LeaveReview.vue'

//emit
const emit = defineEmits(['refreshReviewData'])

//refs
const isEditReview = ref(false)

//props
const props = defineProps(['reviewId', 'productId', 'productName', 'rate', 'comment'])

//func
const handleDeleteReview = async () => {
  try {
    const res = await deleteReview(props.reviewId)
    if (res.status === 200) {
      ElMessage.success('Review deleted successfully')
      emit('refreshReviewData')
    }
  } catch (error) {
    console.log(error)
    ElMessage.error('There was an error deleting your review')
  }
}
</script>
