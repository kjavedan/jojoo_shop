<template>
  <div class="custom-select">
    <div class="select-selected" @click="toggleSelect">
      <div class="content">
        <span>
          {{ selectedLocale }}
        </span>
        <font-awesome-icon icon="chevron-down" />
      </div>

      <div :class="['select-items', { show: true }]">
        <div @click="selectLocale(locale)" v-for="locale in supportedLocales" :key="locale">
          {{ locale }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import Trans from '@/i18n/translation'
import { ref, watch } from 'vue'

export default {
  setup() {
    //refs

    const { t, locale } = useI18n()
    const supportedLocales = Trans.supportedLocales
    const selectedLocale = ref(locale)

    //funcs
    const selectLocale = (newLocale) => {
      selectedLocale.value = newLocale
      Trans.switchLanguage(newLocale)
    }

    return {
      t,
      selectedLocale,
      supportedLocales,
      selectLocale
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
.custom-select {
  position: relative;
  font-family: Arial;
}

.custom-select .select-selected {
  padding: 15px 25px;
  cursor: pointer;
  position: relative;

  .content {
    @include flex-row;
    gap: 10px;

    img {
      height: 1rem;
      border-radius: 2px;
    }
  }
}

.custom-select .select-items {
  background: black;
  opacity: 0;
  position: absolute;
  border-radius: 8px;
  padding: 0 0.5rem;
  visibility: hidden;
  top: 105%;
  left: 0;
  right: 0;
  z-index: 99;
  @include ease;
  &.show {
    opacity: 1;
    visibility: visible;
    padding: 0.5rem;
  }
}

.custom-select .select-items div {
  color: #ffffff;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

.custom-select .select-items div:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
</style>
