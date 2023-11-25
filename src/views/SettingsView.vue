<template>
  <div class="settings-wrapper">
    <h1 class="page-title">Settings</h1>
    <div class="settings-body">
      <ProfileItem
        v-for="(item, i) in [{ title: 'Language', path: 'language', icon: Language }]"
        :key="i"
        :icon="item.icon"
        :title="item.title"
        :path="item.path"
      ></ProfileItem>
    </div>
  </div>
</template>

<script setup>
import ProfileItem from '@/components/ProfileItem.vue'
import Language from '@/assets/images/Language.png'
</script>
<style scoped lang="scss">
.settings-wrapper {
  .settings-body {
    margin-top: 1rem;
  }
}
</style>
