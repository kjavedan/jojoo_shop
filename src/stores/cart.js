import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCartStore = defineStore('cart', ()=> {

    const cartData = ref([])
    const totalPrice = ref(null)
    const discountedTotalPrice = ref(null)
    
    function updateStoreCart(data){
        cartData.value = data.cartData
        totalPrice.value = data.totalPrice
        discountedTotalPrice.value = data.discountedTotalPrice
    }

    return {
        cartData,
        updateStoreCart,
        totalPrice,
        discountedTotalPrice
    }
})