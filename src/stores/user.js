import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", ()=> {
    const accessToken = ref(null)
    const userDetails = ref(null)
    const isLoggedIn = ref(false)
    function handleUserLogin(data){
        console.log(data)
        const {user, accessToken: newAccessToken} = data
        userDetails.value = user
        accessToken.value = newAccessToken
        isLoggedIn.value = true
    }
    

    return {
        accessToken, 
        isLoggedIn,
        handleUserLogin,
    }
})