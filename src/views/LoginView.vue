<template>
  <div class="login">
    <h2>login to your account</h2>
    <div class="with-google" @click="handleGoogleLogin(router)">
      <img src="@/assets/images/google.png" alt="google" />
      <span>Google</span>
    </div>
    <div class="or-with-line">
      <div class="line"></div>
      <span class="or-text">Or </span>
      <div class="line"></div>
    </div>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      class="login-form"
      label-position="top"
      status-icon
      @keydown.enter.prevent="submitLoginForm"
    >
      <el-form-item label="Username" prop="username">
        <el-input
          type="text"
          v-model="loginForm.username"
          placeholder="enter your username"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          placeholder="enter your password"
          class="custom-input"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button :loading="loading" type="primary" @click="submitLoginForm(loginFormRef)">
          login
        </el-button>
      </el-form-item>
    </el-form>
    <div class="no-account">
      Don't have an account?
      <RouterLink :to="{ name: 'sign-up' }"> Sign Up </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { loginUser } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { handleGoogleLogin } from '@/helpers/googleAuth'

//routes
const router = useRouter()

//stores
const store = useUserStore()

//refs
const loading = ref(false)
const loginFormRef = ref(null)
const loginForm = ref({ username: '', password: '' })
const rules = ref({
  username: [
    { required: true, message: 'Please enter username', trigger: 'change' },
    { min: 4, message: 'Length should be at least 4', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' } // Custom validation for special characters
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'change' },
    { min: 6, message: 'Length should be at least 6', trigger: 'blur' }
  ]
})
//funcs
function validateUsername(rule, value, callback) {
  // Regular expression to check for special characters
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<> ]/

  if (specialCharRegex.test(value)) {
    callback(new Error('Username cannot contain special characters'))
  } else {
    callback()
  }
}

const submitLoginForm = async () => {
  loading.value = true
  await loginFormRef.value.validate((valid, fields) => {
    if (valid) {
      console.log('valid')
      handleLogin()
    } else {
      console.log('not valid', fields)
      loading.value = false
    }
  })
}

const handleLogin = async () => {
  try {
    const res = await loginUser(loginForm.value)
    if (res.status === 200) {
      if (res.data.accessToken) {
        store.handleUserInfo(res.data)
        const prevUrl = router.options.history.state.back
        if (prevUrl === '/login-to-proceed') {
          router.go(-2)
          const name = res?.data?.user?.fullName?.split(' ')
          ElMessage.success(`Welcome to jojooshop ${name[0]}`)
        } else {
          router.push({ name: 'home' })
        }
      } else {
        ElMessage.error(res.data.msg)
      }
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
    if (error.message === 'Network Error') {
      ElMessage.error('There was a server issue')
    } else if (error.response.status === 401) {
      ElMessage.error('You entered worng password, try again')
    }
  }
}

//hooks
</script>

<style lang="scss">
@import '../assets/scss/main.scss';

.login {
  // border: solid;
  @include tablet {
    width: 400px;
    margin: 0 auto;
  }

  padding: 0rem 1rem;

  .with-google {
    background: #f6f6f6;
    cursor: pointer;
    width: 100%;
    height: 45px;
    @include round-m;
    @include shadow-m;
    @include flex-center;
    gap: 10px;
    margin-top: 2rem;
    span {
      font-weight: 800;
    }
    @include ease;
    &:active {
      scale: 0.9;
    }
    img {
      height: 70%;
    }
  }

  .or-with-line {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 2rem 0; /* Adjust margin as needed */
  }

  .line {
    flex: 1;
    height: 1px;
    background-color: #b9b9b9;
  }

  .or-text {
    color: #868686;
    margin: 0 10px; /* Adjust margin as needed */
  }

  .no-account {
    text-align: center;
  }
  .custom-input {
    width: 100%;
    // height: 48px;
    // margin-bottom: 1.5rem;
  }
  .form-footer {
    margin: 3rem auto;

    button {
      width: 100%;
    }
  }
}
</style>
