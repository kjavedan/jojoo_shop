import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  //refs
  const heldProduct = ref(null)

  const isSearch = ref(false)

  //funcs
  function holdProductInfo(info) {
    heldProduct.value = info
  }

  function toggleSearch(isShow) {
    isSearch.value = isShow
  }

  return { heldProduct, holdProductInfo, isSearch, toggleSearch }
})
