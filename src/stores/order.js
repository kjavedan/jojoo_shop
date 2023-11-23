import { defineStore } from "pinia";
import { ref } from "vue";

export const useOrderStore = defineStore('order', ()=> {

    const ordersData = ref([])

    function updateOrdersData(data){
        ordersData.value = data
    }
    return {
        ordersData,
        updateOrdersData
    }
})