<template>
  <div class="login">
    <h2>login to your account</h2>
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
      <el-form-item class="form-footer">
        <el-button type="primary" @click="submitLoginForm(loginFormRef)"> Create </el-button>
      </el-form-item>
    </el-form>
    <div class="no-account">
      Don't have an account?
      <RouterLink :to="{ name: 'sign-up' }"> Sign Up </RouterLink>
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
  password: [{ required: true, message: 'plase enter your password', trigger: 'change' }]
})
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.login {
  // border: solid;
  padding: 0rem 1rem;
  .with-google {
    background: #f6f6f6;
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
