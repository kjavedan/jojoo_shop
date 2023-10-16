import { onBeforeMount, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/indx'

export const useProductStore = defineStore('product', () => {
  //refs
  const productsData = ref()
  const favoriteData = ref()

  const heldProduct = ref(null)

  const isSearch = ref(false)

  //funcs
  function holdProductInfo(info) {
    heldProduct.value = info
  }

  function toggleSearch(isShow) {
    isSearch.value = isShow
  }

  function toggleFavorite(id) {
    heldProduct.value = { ...heldProduct.value, selected: !heldProduct.value.selected }
    productsData.value = productsData.value.map((product) =>
      product.id === id ? { ...product, selected: !product.selected } : product
    )
  }

  //hooks
  onBeforeMount(() => {
    const savedData = localStorage.getItem('favoriteProducts')
    favoriteData.value = JSON.parse(savedData)

    let storedData = localStorage.getItem('productsData')
    if (!storedData) {
      localStorage.setItem('productsData', JSON.stringify(products))
      productsData.value = products
    } else {
      productsData.value = JSON.parse(storedData)
    }
  })

  watch(
    productsData,
    (newVal) => {
      localStorage.setItem('productsData', JSON.stringify(newVal))
      const savedData = productsData.value.filter((product) => product.selected)
      favoriteData.value = savedData
      localStorage.setItem('favoriteProducts', JSON.stringify(savedData))
    },
    { deep: true }
  )

  return {
    heldProduct,
    holdProductInfo,
    isSearch,
    toggleSearch,
    productsData,
    favoriteData,
    toggleFavorite
  }
})
