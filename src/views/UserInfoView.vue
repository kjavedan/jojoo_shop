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
  <el-dialog v-model="heldInfo" :title="heldInfo?.title" @close="heldInfo = null"></el-dialog>
</template>

<script setup>
import { userInfoData } from '@/data/indx'
import { ref, watch } from 'vue'

//refs
const heldInfo = ref(null)

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
