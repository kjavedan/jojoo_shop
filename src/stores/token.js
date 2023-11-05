import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenStore = defineStore("token", ()=> {
    const accessToken = ref(null)
    const isLoggedIn = ref(false)
    function setAccessToken(data){
        accessToken.value = data
    }

    return {
        accessToken, 
        isLoggedIn,
        setAccessToken,
    }
})