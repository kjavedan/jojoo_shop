import { defineStore } from "pinia";
import {ref} from 'vue'

export const useCartStore = defineStore('cart', ()=> {

    const cartData = ref([])
    const totalPrice = ref(null)
    const discountedTotalPrice = ref(null)
    
    function updateCartData(data){
        cartData.value = data
    }

    return {
        cartData,
        updateCartData,
        totalPrice,
        discountedTotalPrice
    }
})