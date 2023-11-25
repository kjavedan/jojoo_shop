<template>
  <div
    class="order-dialog"
    :class="{ show: isSearch, 'show-results': searchResults.length }"
    @click="toggleSearch"
  >
    <div class="dialog-content animate__animated animate__pulse" v-if="isSearch" @click.stop>
      <p class="title">{{ $t('searchTitle') }}</p>
      <Input @change="handleChange"></Input>
      <div class="search-results" :class="{ 'show-results': searchResults.length }">
        <SearchResultItem
          v-for="result in searchResults"
          :key="result.id"
          :imgUrl="result.imgUrls[0]"
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
import { onMounted, ref, watch } from 'vue'
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

//hooks

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
  overflow-y: hidden;
  @include flex-col;
  gap: 13px;
  transition: max-height 0.5s ease-in-out; /* Specify the duration and easing function for the transition */
  padding-bottom: 2rem;
  overflow-y: scroll;
}
.order-dialog {
  @include ease;

  align-items: start !important;
  padding-top: 3rem;

  @include ease;

  .search-results {
    max-height: 70svh;
  }
}
.order-dialog .dialog-content {
  padding: 0.5rem;
  padding-bottom: 0;
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
