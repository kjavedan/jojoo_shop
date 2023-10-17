import { onBeforeMount, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { products } from '../data/indx'

export const useProductStore = defineStore('product', () => {
  //refs
  const productsData = ref()

  const favoriteData = ref()

  const cartData = ref([])

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

  function addProductToCart(itemToAdd){
    const isItemAlreadyExist = cartData.value.includes(product => product.id === itemToAdd.id)
    if(isItemAlreadyExist){
      //increase item qty
    }else{
      cartData.value.push(itemToAdd)
    }
    productsData.value.map(product => product.id === id)

  }

  function removeProductFromCart(id){

  }

  function increaseProductQty(id){

  }

  function decreaseProductQty(id){

  }

  //hooks
  onBeforeMount(() => {

    const savedData = localStorage.getItem('favoriteProducts')
    const storedCartData = localStorage.getItem('cartData')

    favoriteData.value = JSON.parse(savedData)
    cartData.value = JSON.parse(storedCartData)
    
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
    cartData, ()=> {
      localStorage.setItem('cartData', JSON.stringify(cartData.value))
    },{deep: true}
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
  }
})
