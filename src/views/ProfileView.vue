<template>
  <div class="profile-wrapper">
    <h1 class="page-title">my profile</h1>
    <div class="avatar-wrapper">
      <div class="avatar">
        <img src="@/assets/images/Account-fill.png" alt="avatar" />
      </div>
      <div class="info">
        <h3 class="title">Khaled Javedan</h3>
        <div class="subtitle-wrapper">
          <h5 class="subtitle">@Khaled</h5>
          <div class="edit">
            <img src="@/assets/images/Pen.png" alt="pen" />
          </div>
        </div>
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

const store = useUserStore()
const { isLoggedIn } = storeToRefs(store)
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
      // border: solid;

      .subtitle-wrapper {
        // border: solid;
        @include row-between;
        .subtitle {
          font-size: 0.9rem;
          font-weight: bold;
          color: gray;
        }

        .edit {
          height: 30px;
          cursor: pointer;
          img {
            height: 100%;
          }
        }
      }
    }
  }
  .profile-body {
    margin-top: 1rem;
  }
}
</style>
