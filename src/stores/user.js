import { defineStore } from "pinia";
import { ref } from "vue";
import { getUserInfoByRefreshToken } from '@/api/user';

export const useUserStore = defineStore("user", () => {
    const accessToken = ref(null);
    const userDetails = ref(null);
    const isLoggedIn = ref(false);
    const refreshTokenLoading = ref(false);
    const refreshTokenChecked = ref(false);

    async function handleUserInfo(data) {
        const { user, accessToken: newAccessToken } = data;
        userDetails.value = user;
        accessToken.value = newAccessToken;
        isLoggedIn.value = true;
    }

    async function checkRefreshToken() {
        try {
            if (!refreshTokenChecked.value) {
                refreshTokenLoading.value = true;
                const res = await getUserInfoByRefreshToken();
                if (res.status === 200) {
                    handleUserInfo(res.data);
                }
                refreshTokenLoading.value = false;
                refreshTokenChecked.value = true;
            }
        } catch (error) {
            refreshTokenLoading.value = false;
            console.log(error);
        }
    }


    return {
        accessToken,
        isLoggedIn,
        handleUserInfo,
        refreshTokenLoading,
        checkRefreshToken,
    };
});
