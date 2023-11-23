import {  ref } from 'vue'
import { defineStore } from 'pinia'


export const useProductStore = defineStore('product', () => {

  const heldProduct = ref(null)
  const isSearch = ref(false)

  
  function holdProductInfo(info) {
    heldProduct.value = info
  }

  function toggleSearch(isShow) {
    isSearch.value = isShow
  }

  

  return {
    heldProduct,
    holdProductInfo,
    isSearch,
    toggleSearch,
  }
})
