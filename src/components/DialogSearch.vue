<template>
  <div class="order-dialog" :class="{ show: isSearch }" @click="toggleSearch">
    <div class="dialog-content animate__animated animate__pulse" v-if="isSearch" @click.stop>
      <p class="title">What are you looking for?</p>
      <Input @change="handleChange"></Input>
      <div class="search-results" :class="{ 'show-results': searchResults.length }">
        <SearchResultItem
          v-for="result in searchResults"
          :key="result.id"
          :imgUrl="result.imgUrl"
          :name="result.name"
          :description="result.description"
          :price="result.price"
        ></SearchResultItem>
      </div>
      <div v-if="inputValue && !searchResults.length" class="no-result">
        <img src="@/assets/images/noRes.png" alt="no result" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import Input from './Input.vue'
import SearchResultItem from './SearchResultItem.vue'
import { products } from '../data/indx'

//store
const store = useProductStore()
const { isSearch } = storeToRefs(store)

//refs
const inputValue = ref('')
const searchResults = ref([])

//funcs
const toggleSearch = () => {
  store.toggleSearch(false)
  inputValue.value = ''
}

const handleChange = (value) => {
  inputValue.value = value
}

watch(inputValue, (newVal) => {
  searchResults.value = products.filter(
    (product) =>
      product.name.toLowerCase().includes(newVal.toLowerCase()) ||
      product.description.toLowerCase().includes(newVal.toLowerCase())
  )
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.title {
  text-align: center;
}

.search-results {
  max-height: 0;
  overflow-y: hidden;
  @include flex-col;
  gap: 13px;
  transition: max-height 0.5s ease-in-out; /* Specify the duration and easing function for the transition */
  padding-bottom: 2rem;
  overflow-y: scroll;
}

.order-dialog .dialog-content {
  padding-bottom: 0;
}

.show-results {
  max-height: 60svh; /* Set the desired maximum height when the results are shown */
}

.no-result {
  @include flex-center;
  margin-top: -2rem;
  margin-bottom: 2rem;

  img {
    height: 64px;
  }
}
</style>
