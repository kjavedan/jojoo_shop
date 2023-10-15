import { onBeforeMount, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/indx'

export const useProductStore = defineStore('product', () => {
  //refs
  const productsData = ref()

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
    console.log(id)
    productsData.value = productsData.value.map((product) =>
      product.id === id ? { ...product, selected: !product.selected } : product
    )
  }

  //hooks
  onBeforeMount(() => {
    let storedData = localStorage.getItem('productsData')
    console.log(storedData)
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
    },
    { deep: true }
  )

  return { heldProduct, holdProductInfo, isSearch, toggleSearch, productsData, toggleFavorite }
})
