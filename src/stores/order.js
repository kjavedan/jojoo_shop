import { defineStore, storeToRefs } from "pinia";
import { onBeforeMount, onMounted, ref } from "vue";
import { getUserOrders } from '@/api/order'
import { useUserStore } from "./user";

export const useOrderStore = defineStore('order', ()=> {

    //forign store
    const userStore = useUserStore()
    const {userDetails} = storeToRefs(userStore)

    //refs
    const ordersData = ref([])
    const loading =ref(false)

    const fetchUserOrdersData = async () => {
        loading.value = true
        try {
          const res = await getUserOrders(userDetails.value._id)
          if (res.status === 200) {
            ordersData.value = res.data
            
          }
          loading.value = false
        } catch (error) {
          loading.value = false
          console.log(error)
        }
      }

      onBeforeMount(()=> {
        fetchUserOrdersData()
      })

    return {
        ordersData,
        fetchUserOrdersData,
        loading
    }
})