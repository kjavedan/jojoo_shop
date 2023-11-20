<template>
  <div class="wrapper">
    <h2>Login to proceed</h2>
    <p>In order to give you the best experience and keep your data safe you need to login 😊</p>
    <img src="@/assets/images/login-to-proceed.png" alt="login" />
    <el-button class="login-btn" @click="router.push({ name: 'login' })" type="primary"
      >login</el-button
    >
    <el-button @click="router.back(1)"> Nah I'm good</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped>
@import '../assets/scss/main.scss';
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  padding: 4rem 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  p {
    text-align: center;
    margin-top: 0.5rem;
    line-height: 1rem;
    font-size: 0.8rem;
  }
  img {
    // height: 400px;
    width: 100%;
    margin: 2rem auto;
    max-width: 500px;
  }
  .login-btn {
    width: 100%;
    max-width: 400px;
    margin-bottom: 3rem;
  }
}
</style>
