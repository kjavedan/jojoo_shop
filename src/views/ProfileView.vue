<template>
  <div class="profile-wrapper">
    <h1 class="page-title">{{ $t('myProfile') }}</h1>
    <div class="avatar-wrapper" @click="router.push({ name: 'user-info' })">
      <div class="avatar">
        <img :src="userAvatar" alt="avatar" />
      </div>
      <div class="info">
        <h3 class="title">{{ fullName }}</h3>
        <h5 class="subtitle">@{{ userDetails.username }}</h5>
      </div>
    </div>
    <div class="profile-body">
      <ProfileItem
        v-for="(item, i) in profileItemsData"
        :key="i"
        :icon="item.icon"
        :title="$t(item.title)"
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
  return userDetails.value.fullName ? userDetails.value.fullName : 'What should we call you?'
})
const userAvatar = computed(() => {
  return userDetails.value.picture ? userDetails.value.picture : defaultAvatar
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
      overflow: hidden;
      border-radius: 50%;
      background: #f6f6f6;
      @include flex-center;
      img {
        height: 100%;
      }
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
