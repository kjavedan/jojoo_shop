<template>
  <div class="login">
    <h2>Create your account</h2>
    <div class="with-google" @click="handleGoogleSignup(router)">
      <img src="@/assets/images/google.png" alt="google" />
      <span>Google</span>
    </div>
    <div class="or-with-line">
      <div class="line"></div>
      <span class="or-text">Or</span>
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
      <el-form-item label="Username" prop="username">
        <el-input
          type="text"
          v-model="signUpForm.username"
          placeholder="Enter your username"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input
          type="text"
          v-model="signUpForm.email"
          placeholder="Enter your email"
          class="custom-input"
        ></el-input>
      </el-form-item>

      <el-form-item label="Password" prop="password">
        <el-input
          type="password"
          v-model="signUpForm.password"
          placeholder="Enter your password"
          class="custom-input"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input
          type="password"
          v-model="signUpForm.confirmPassword"
          placeholder="Confirm your password"
          class="custom-input"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button type="primary" @click="submitSignupForm(signUpFormRef)">Sign Up</el-button>
      </el-form-item>
    </el-form>
    <div class="no-account">
      Already have an account?
      <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { registerUser } from '@/api/user'
import { ElMessage } from 'element-plus'
import { handleGoogleSignup } from '@/helpers/googleAuth'
import { useRouter } from 'vue-router'

//router
const router = useRouter()

// refs
const loading = ref(false)
const signUpFormRef = ref(null)
const signUpForm = ref({ username: '', email: '', password: '', confirmPassword: '' })
const rules = ref({
  username: [
    { required: true, message: 'Please enter a username', trigger: 'change' },
    { min: 4, message: 'Length should be at least 4', trigger: 'blur' },
    {
      validator: validateUsername,
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, type: 'email', message: 'Please enter a valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter your password', trigger: 'change' },
    { min: 6, message: 'Length should be at least 6', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: 'Please enter your password to confirm', trigger: 'change' },
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
    if (res.status === 200) {
      if (res.data.accessToken) {
        store.setAccessToken(res.data.accessToken)
        //send user to home directly
        //handleUserAuth
        router.push({ name: 'login' })
      } else {
        ElMessage.error(res.data.msg)
      }
    }
    loading.value = false
  } catch (error) {
    loading.value = false
    if (error.message === 'Network Error') {
      ElMessage.error('There was a server issue')
    } else if (error.response.status === 400) {
      console.log(error.response.data)
      ElMessage.error(error.response?.data?.errors[0]?.msg)
    }
  }
}
</script>
