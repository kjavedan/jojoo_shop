<template>
  <div class="order-dialog" :class="{ show: heldProductId !== null }" @click="unHeldProductId">
    <div class="dialog-content animate__animated animate__pulse" v-if="heldProductId !== null">
      <!-- Your dialog content goes here -->
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

const store = useProductStore()
const { heldProductId } = storeToRefs(store)

const unHeldProductId = () => {
  store.holdProductInfo(null)
}

watch(heldProductId, (newValue) => {
  console.log(newValue)
})
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
