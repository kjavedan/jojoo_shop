import { googleSdkLoaded } from 'vue3-google-login'
import { retriveTokenWithGoogleCode } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus';

const handleGoogleAuth = async (callback, router) => {

    try {
      googleSdkLoaded((google) => {
        google.accounts.oauth2
          .initCodeClient({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID_DEV,
            scope: 'email profile openid',
            redirect_uri: 'http://localhost:5173',
            callback: (response) => {
              if (response.code) {
                callback(response.code, router);
              }
            }
          })
          .requestCode();
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  const sendGoogleResponseToBackend = async (code, router) => {
    const store = useUserStore()
    try {
      const res = await retriveTokenWithGoogleCode({ Authorization: code });
      console.log(res);
      store.handleUserAuth(res.data);
      if (router.options.history.state.back === '/login-to-proceed') {
        router.go(-2)
        const name = res?.data?.user?.fullName?.split(' ')
        ElMessage.success(`Welcome to jojooshop ${name[0]}`)
      } else {
        router.push({ name: 'home' })
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  export const handleGoogleLogin =  (router) => {
     handleGoogleAuth(sendGoogleResponseToBackend, router);
  };
  
  export const handleGoogleSignup =  (router) => {
      handleGoogleAuth(sendGoogleResponseToBackend, router); 
  };
  
