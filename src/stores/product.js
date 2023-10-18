import { computed, onBeforeMount, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/indx'

export const useProductStore = defineStore('product', () => {
  //refs
  const productsData = ref()

  const favoriteData = ref()

  const cartData = ref([])

  const heldProduct = ref(null)

  const isSearch = ref(false)

  //computed
  const totalPrice = computed(() => {
    let sum = 0
    cartData.value.forEach((item) => {
      sum += item.count * item.price
    })
    return parseFloat(sum).toFixed(2)
  })

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

  function addProductToCart(itemToAdd) {
    const isItemAlreadyExist = cartData.value.some((product) => product.id === itemToAdd.id)
    if (isItemAlreadyExist) {
      cartData.value.map((item) =>
        item.id === itemToAdd.id ? { ...item, count: item.count++ } : item
      )
    } else {
      cartData.value.push({ ...itemToAdd, count: 1 })
    }
  }

  function decreaseProductQty(id) {
    cartData.value.map((item, index) => {
      if (item.id !== id) return item
      else if (item.id === id && item.count > 1) {
        return { ...item, count: item.count-- }
      } else {
        cartData.value.pop(index)
      }
    })
  }

  function removeProductFromCart(id) {
    cartData.value.map((item, index) => (item.id === id ? cartData.value.pop(index) : item))
  }

  //hooks
  onBeforeMount(() => {
    const savedData = localStorage.getItem('favoriteProducts')
    favoriteData.value = JSON.parse(savedData)

    const storedCartData = localStorage.getItem('cartData')
    if (storedCartData) {
      cartData.value = JSON.parse(storedCartData)
    } else {
      localStorage.setItem('cartData', JSON.stringify([]))
    }

    const storedData = localStorage.getItem('productsData')

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

  watch(
    cartData,
    () => {
      localStorage.setItem('cartData', JSON.stringify(cartData.value))
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
    toggleFavorite,
    cartData,
    addProductToCart,
    removeProductFromCart,
    decreaseProductQty,
    totalPrice
  }
})
