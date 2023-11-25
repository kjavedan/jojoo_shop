<template>
  <div class="login">
    <h2>{{ $t('createAccountTitle') }}</h2>
    <div class="with-google" @click="handleGoogleSignup(router)">
      <img src="@/assets/images/google.png" alt="google" />
      <span>{{ $t('loginWithGoogle') }}</span>
    </div>
    <div class="or-with-line">
      <div class="line"></div>
      <span class="or-text">{{ $t('or') }}</span>
      <div class="line"></div>
    </div>
    <el-form
      ref="signUpFormRef"
      @keydown.enter.prevent="submitSignupForm(signUpFormRef)"
      :model="signUpForm"
      :rules="rules"
      class="login-form"
      label-position="top"
      status-icon
    >
      <el-form-item :label="$t('username')" prop="username">
        <el-input
          type="text"
          v-model="signUpForm.username"
          :placeholder="$t('enterUsername')"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('email')" prop="email">
        <el-input
          type="text"
          v-model="signUpForm.email"
          :placeholder="$t('enterEmail')"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('password')" prop="password">
        <el-input
          type="password"
          v-model="signUpForm.password"
          :placeholder="$t('enterPassword')"
          class="custom-input"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item :label="$t('confirmPassword')" prop="confirmPassword">
        <el-input
          type="password"
          v-model="signUpForm.confirmPassword"
          :placeholder="$t('confirmPassword')"
          class="custom-input"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button type="primary" @click="submitSignupForm(signUpFormRef)">{{
          $t('signUp')
        }}</el-button>
      </el-form-item>
    </el-form>
    <div class="no-account">
      {{ $t('alreadyHaveAccount') }}
      <RouterLink :to="{ name: 'login' }">{{ $t('login') }}</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '@/api/user'
import { ElMessage } from 'element-plus'
import { handleGoogleSignup } from '@/helpers/googleAuth'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'

//router
const router = useRouter()

//stores
const store = useUserStore()

// refs
const { t } = useI18n()
const loading = ref(false)
const signUpFormRef = ref(null)
const signUpForm = ref({ username: '', email: '', password: '', confirmPassword: '' })
const rules = ref({
  username: [
    { required: true, message: t('usernameRequired'), trigger: 'change' },
    { min: 4, message: t('usernameMinLength', { length: 4 }), trigger: 'blur' },
    {
      validator: validateUsername,
      trigger: 'blur'
    }
  ],
  email: [{ required: true, type: 'email', message: t('validEmailRequired'), trigger: 'blur' }],
  password: [
    { required: true, message: t('passwordRequired'), trigger: 'change' },
    { min: 6, message: t('passwordMinLength', { length: 6 }), trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: t('confirmPasswordRequired'), trigger: 'change' },
    { validator: validatePasswordMatch, trigger: 'change' } // Custom validation for password match
  ]
})

// functions
function validateUsername(rule, value, callback) {
  // Regular expression to check for special characters
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<> ]/

  if (specialCharRegex.test(value)) {
    callback(new Error('Username cannot contain special characters'))
  } else {
    callback()
  }
}

function validatePasswordMatch(rule, value, callback) {
  if (value !== signUpForm.value.password) {
    callback(new Error("Passwords don't match"))
  } else {
    callback()
  }
}

const submitSignupForm = async () => {
  try {
    await signUpFormRef.value.validate((valid, fields) => {
      if (valid) {
        handleSingUp()
      } else {
        console.log(fields)
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const handleSingUp = async () => {
  try {
    const res = await registerUser(signUpForm.value)
    if (res.status === 201) {
      const name = res?.data?.user?.fullName?.split(' ')
      if (res.data.accessToken) {
        store.handleUserAuth(res.data)
        router.push({ name: 'home' })
        ElMessage.success(t('welcomeTo', { name: name ? name[0] : '' }))
        console.log('rannn')
      } else {
        ElMessage.success(t('welcomeTo', { name: name ? name[0] : '' }))
        router.push({ name: 'login' })
      }
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    if (error.message === 'Network Error') {
      ElMessage.error(t('serverIssue'))
    } else if (error?.response?.status === 400) {
      console.log(error.response.data)
      ElMessage.error(error.response?.data?.errors[0]?.msg)
    }
  }
}
</script>
