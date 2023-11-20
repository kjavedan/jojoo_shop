<template>
  <div class="profile-wrapper">
    <h1 class="page-title">my profile</h1>
    <div class="avatar-wrapper" @click="router.push({ name: 'user-info' })">
      <div class="avatar">
        <img src="@/assets/images/Account-fill.png" alt="avatar" />
      </div>
      <div class="info">
        <h3 class="title">{{ fullName }}</h3>
        <h5 class="subtitle">@Khaled</h5>
      </div>
    </div>
    <div class="profile-body">
      <ProfileItem
        v-for="(item, i) in profileItemsData"
        :key="i"
        :icon="item.icon"
        :title="item.title"
        :path="item.path"
      ></ProfileItem>
    </div>
  </div>
</template>

<script setup>
import { profileItemsData } from '@/data/indx'
import ProfileItem from '@/components/ProfileItem.vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

//store
const store = useUserStore()

//refs
const { userDetails } = storeToRefs(store)

//computed
const fullName = computed(() => {
  return !userDetails.value.fullName ? userDetails.value.fullName : 'What should we call you?'
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.profile-wrapper {
  position: relative;
  .avatar-wrapper {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 16px;

    .avatar {
      height: 80px;
      width: 80px;
      border-radius: 50%;
      background: #f6f6f6;
      @include flex-center;
    }
    .info {
      .title {
        font-size: 1.1rem;
      }

      .subtitle {
        font-size: 0.8rem;
        font-weight: bold;
        color: gray;
        margin-top: 5px;
      }
    }
  }
  .profile-body {
    margin-top: 1rem;
  }
}
</style>
