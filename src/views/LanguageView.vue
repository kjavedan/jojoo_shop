<template>
  <div class="wrapper">
    <h1 class="page-title">{{ $t('language') }}</h1>
    <div class="languages">
      <LanguageItem
        title="English"
        subtitle="english"
        locale="en"
        :isActive="selectedLocale === 'en'"
        @click="handleLangaugeChange('en')"
      ></LanguageItem>
      <LanguageItem
        title="Chinese"
        subtitle="中文（简体）"
        locale="zh"
        :isActive="selectedLocale === 'zh'"
        @click="handleLangaugeChange('zh')"
      ></LanguageItem>
      <LanguageItem
        title="Arabic"
        subtitle="العربية"
        locale="ar"
        :isActive="selectedLocale === 'ar'"
        @click="handleLangaugeChange('ar')"
      ></LanguageItem>
      <LanguageItem
        title="Farsi"
        subtitle="فارسی"
        locale="fa"
        :isActive="selectedLocale === 'fa'"
        @click="handleLangaugeChange('fa')"
      ></LanguageItem>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageItem from '../components/LanguageItem.vue'
import Trans from '@/i18n/translation'

//refs
const { t, locale } = useI18n()
const selectedLocale = ref(locale)

//funcs
const handleLangaugeChange = (newLocale) => {
  selectedLocale.value = newLocale
  Trans.switchLanguage(newLocale)
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.wrapper {
  // border: solid;

  .languages {
    margin-top: 1.5rem;
  }
}
</style>
