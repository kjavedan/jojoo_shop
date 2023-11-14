<template>
  <div class="login">
    <h2>create your account</h2>
    <div class="with-google">
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

      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input
          type="password"
          v-model="loginForm.confirmPassword"
          placeholder="enter your password"
          class="custom-input"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-footer">
        <el-button type="primary" @click="submitLoginForm(loginFormRef)"> Create </el-button>
      </el-form-item>
    </el-form>
    <div class="no-account">
      Already have an account?
      <RouterLink :to="{ name: 'login' }"> log in </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//refs
const loginFormRef = ref(null)
const loginForm = ref({ username: '', password: '' })
const rules = ref({
  username: [{ required: true, message: 'Please enter username', trigger: 'change' }],
  password: [{ required: true, message: 'plase enter your password', trigger: 'change' }],
  confirmPassword: [
    { required: true, message: 'plase enter your password to confirm', trigger: 'change' }
  ]
})
</script>
