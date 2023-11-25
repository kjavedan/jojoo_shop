<template>
  <el-popover placement="left" ref="popover" :width="50" trigger="click">
    <div>
      <el-button size="small" type="danger" text @click="handleDeleteReview">
        {{ $t('delete') }}
      </el-button>
      <el-button size="small" text @click="isEditReview = true">
        {{ $t('edit') }}
      </el-button>
    </div>
    <template #reference>
      <div>
        <img src="@/assets/images/MenuVertical.png" alt="menu" />
      </div>
    </template>
  </el-popover>
  <el-dialog
    v-model="isEditReview"
    class="leave-review-dialog"
    :title="$t('editReview')"
    @close="isEditReview = false"
  >
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
import { useI18n } from 'vue-i18n'

//emit
const emit = defineEmits(['refreshReviewData'])

//refs
const isEditReview = ref(false)
const { t } = useI18n()
//props
const props = defineProps(['reviewId', 'productId', 'productName', 'rate', 'comment'])

//func
const handleDeleteReview = async () => {
  try {
    const res = await deleteReview(props.reviewId)
    if (res.status === 200) {
      ElMessage.success(t('reviewDeletedSuccess'))
      emit('refreshReviewData')
    }
  } catch (error) {
    console.log(error)
    ElMessage.error(t('deleteReviewError'))
  }
}
</script>

<style lang="scss">
.leave-review-dialog {
  .ep-dialog__body {
    padding-top: 0.5rem;
  }
}
</style>
