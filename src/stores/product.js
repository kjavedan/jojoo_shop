import { computed, onBeforeMount, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/indx'

export const useProductStore = defineStore('product', () => {
  const productsData = ref([])
  const favoriteData = ref([])
  const cartData = ref([])
  const orderHistoryData = ref([])
  const heldProduct = ref(null)
  const isSearch = ref(false)

  const totalPrice = computed(() => {
    return cartData.value.reduce((sum, item) => sum + item.count * item.price, 0).toFixed(2)
  })

  function holdProductInfo(info) {
    heldProduct.value = info
  }

  function toggleSearch(isShow) {
    isSearch.value = isShow
  }

  function toggleFavorite(id) {
    const productIndex = productsData.value.findIndex((product) => product.id === id)
    if (productIndex !== -1) {
      const product = {
        ...productsData.value[productIndex],
        selected: !productsData.value[productIndex].selected
      }
      productsData.value.splice(productIndex, 1, product)
    }
  }

  function addProductToCart(itemToAdd) {
    const cartItemIndex = cartData.value.findIndex((item) => item.id === itemToAdd.id)
    if (cartItemIndex !== -1) {
      cartData.value[cartItemIndex].count++
    } else {
      cartData.value.push({ ...itemToAdd, count: 1 })
    }
  }

  function decreaseProductQty(item) {
    const cartItemIndex = cartData.value.findIndex((p) => p.id === item.id)
    if (cartItemIndex !== -1 && cartData.value[cartItemIndex].count > 1) {
      cartData.value[cartItemIndex].count--
    } else if (cartItemIndex !== -1) {
      cartData.value.splice(cartItemIndex, 1)
    }
  }

  function removeProductFromCart(id) {
    const cartItemIndex = cartData.value.findIndex((item) => item.id === id)
    if (cartItemIndex !== -1) {
      cartData.value.splice(cartItemIndex, 1)
    }
  }

  onBeforeMount(() => {
    const storedFavoriteData = localStorage.getItem('favoriteProducts')
    favoriteData.value = storedFavoriteData ? JSON.parse(storedFavoriteData) : []

    const storedOrderHistoryData = localStorage.getItem('orderHistoryData')
    orderHistoryData.value = storedOrderHistoryData ? JSON.parse(storedOrderHistoryData) : []

    const storedCartData = localStorage.getItem('cartData')
    cartData.value = storedCartData ? JSON.parse(storedCartData) : []

    const storedProductData = localStorage.getItem('productsData')
    productsData.value = storedProductData ? JSON.parse(storedProductData) : products
  })

  watch(
    productsData,
    (newVal) => {
      localStorage.setItem('productsData', JSON.stringify(newVal))
      const savedData = newVal.filter((product) => product.selected)
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

  watch(
    orderHistoryData,
    () => {
      localStorage.setItem('orderHistoryData', JSON.stringify(orderHistoryData.value))
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
    totalPrice,
    orderHistoryData
  }
})
