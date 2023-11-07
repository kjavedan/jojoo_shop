<template>
  <div class="profile-item" @click="router.push({ name: path, params: { id: '123' } })">
    <div class="icon">
      <img :src="icon" alt="info" />
      <span>{{ title }}</span>
    </div>
    <div><img src="@/assets/images/chevron-Right.png" alt="chevron-right" /></div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

//routes
const router = useRouter()
//props
defineProps(['icon', 'title', 'path'])
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.profile-item {
  padding: 0 1.5rem;
  @include row-between;
  margin-top: 0.5rem;
  height: 70px;
  border-radius: 16px;
  background: #f6f6f6;
  cursor: pointer;
  .icon {
    @include flex-center;
    height: 30px;
    gap: 1rem;
    span {
      text-shadow: 0px 2px 1px rgba($color: #000000, $alpha: 0.25);
      font-size: 0.9rem;
      font-weight: bold;
      color: rgb(52, 52, 52);
    }
  }
  img {
    margin-bottom: -10px;
    height: 90%;
  }
}
</style>
