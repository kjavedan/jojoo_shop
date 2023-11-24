<template>
  <el-popover placement="left" ref="popover" :width="50" trigger="click">
    <div>
      <el-button size="small" type="danger" text @click="handleDeleteReview">Delete</el-button>
      <el-button size="small" text>Edit</el-button>
    </div>
    <template #reference>
      <div>
        <img src="@/assets/images/MenuVertical.png" alt="menu" />
      </div>
    </template>
  </el-popover>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { deleteReview } from '@/api/review'

//emit
const emit = defineEmits(['refreshReviewData'])

//props
const props = defineProps(['reviewId'])

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
