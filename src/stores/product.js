import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
  //refs
  const heldProductId = ref(null)

  const isSearch = ref(false)

  //funcs
  function holdId(id) {
    heldProductId.value = id
  }

  function toggleSearch(isShow) {
    isSearch.value = isShow
  }

  return { heldProductId, holdId, isSearch, toggleSearch }
})
