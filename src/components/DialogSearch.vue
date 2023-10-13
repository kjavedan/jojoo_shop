<template>
  <div class="order-dialog" :class="{ show: isSearch }" @click="toggleSearch">
    <div class="dialog-content animate__animated animate__pulse" v-if="isSearch" @click.stop>
      <p class="title">What are you looking for?</p>
      <Input></Input>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import Input from './Input.vue'

const store = useProductStore()
const { isSearch } = storeToRefs(store)

const toggleSearch = () => {
  store.toggleSearch(false)
}

watch(isSearch, (newValue) => {
  console.log(newValue)
})
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.title {
  text-align: center;
}
</style>
