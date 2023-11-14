<template>
  <h1>My Info</h1>
  <div class="user-info-wrapper">
    <UserInfoItem
      v-for="(item, i) in userInfoData"
      :key="i"
      :title="item.title"
      :value="item.value"
      @edit="handleEdit"
    ></UserInfoItem>
  </div>
  <el-dialog v-model="heldInfo" :title="dialogTitle" @close="heldInfo = null">
    <el-form :model="form" label-position="top">
      <el-form-item>
        <el-input :placeholder="heldInfo?.title" v-model="form[heldInfo.title]"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { userInfoData } from '@/data/indx'
import { computed, ref, watch } from 'vue'

//refs
const heldInfo = ref(null)
const form = ref({})

//computed
const dialogTitle = computed(() =>
  heldInfo.value ? `Confirm your new ${heldInfo.value.title}` : ''
)
//func
const handleEdit = (title, value) => {
  heldInfo.value = { title, value }
}

//hooks
watch(() => {
  console.log(heldInfo.value)
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.user-info-wrapper {
  // border: solid;
  margin-top: 1rem;
}
</style>
