<template>
  <el-popover placement="bottom">
    <div>
      <el-button
        v-for="locale in supportedLocales"
        :key="locale"
        text
        size="small"
        :type="locale == selectedLocale ? 'primary' : ''"
        @click="selectLocale(locale)"
        style="margin-left: 0; width: 100%"
        >{{ localeMap[locale] }}</el-button
      >
    </div>
    <template #reference>
      <div class="popover-reference">
        <img src="@/assets/images/Language.png" alt="language" />
      </div>
    </template>
  </el-popover>
</template>

<script>
import { useI18n } from 'vue-i18n'
import Trans from '@/i18n/translation'
import { onMounted, ref, watch } from 'vue'

export default {
  setup() {
    //refs

    const { t, locale } = useI18n()
    const supportedLocales = Trans.supportedLocales
    const selectedLocale = ref(locale.value)

    const localeMap = {
      en: 'English',
      zh: '中文',
      ar: 'العربية',
      fa: 'فارسی'
    }

    //funcs
    const selectLocale = (newLocale) => {
      selectedLocale.value = newLocale
      Trans.switchLanguage(newLocale)
    }

    const handleDirection = () => {
      if (locale.value === 'ar' || locale.value === 'fa') {
        document.body.dir = 'rtl'
      } else {
        document.body.dir = 'ltr'
      }
    }

    watch(locale, () => {
      handleDirection()
    })

    onMounted(() => {
      handleDirection()
    })

    return {
      t,
      selectedLocale,
      supportedLocales,
      selectLocale,
      localeMap
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.popover-reference {
  height: 100%;
  cursor: pointer;
  @include flex-center;
  margin-left: auto;
  margin-right: 20px;
  img {
    height: 34px;
    // margin-bottom: -5px;
  }
}
</style>
