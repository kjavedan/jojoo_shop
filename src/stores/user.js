import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfoByRefreshToken } from '@/api/user';

export const useUserStore = defineStore("user", () => {
    const accessToken = ref(null);
    const userDetails = ref(null);
    const isLoggedIn = ref(false);
    const refreshTokenLoading = ref(false);
    const refreshTokenChecked = ref(false);

    async function handleUserAuth(data) {
        const { user, accessToken: newAccessToken } = data;
        userDetails.value = user;
        accessToken.value = newAccessToken;
        isLoggedIn.value = true;
    }

    function setUserInfo(data){
        console.log(data)
        userDetails.value = data
    }

    async function checkRefreshToken() {
        try {
            if (!refreshTokenChecked.value) {
                refreshTokenLoading.value = true;
                const res = await getUserInfoByRefreshToken();
                if (res.status === 200) {
                    handleUserAuth(res.data);
                }
                refreshTokenLoading.value = false;
                refreshTokenChecked.value = true;
            }
        } catch (error) {
            refreshTokenLoading.value = false;
            refreshTokenChecked.value = true;
            console.log(error);
        }
    }


    return {
        accessToken,
        isLoggedIn,
        handleUserAuth,
        refreshTokenLoading,
        checkRefreshToken,
        userDetails,
        setUserInfo
    };
});
