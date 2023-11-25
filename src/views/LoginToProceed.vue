<template>
  <div class="wrapper">
    <h2>{{ $t('loginToProceed') }}</h2>
    <p>{{ $t('loginText') }}</p>
    <img src="@/assets/images/login-to-proceed.png" alt="login" />
    <el-button class="login-btn" @click="router.push({ name: 'login' })" type="primary">{{
      $t('login')
    }}</el-button>
    <el-button @click="router.back(1)"> {{ $t('imGood') }}</el-button>
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
  height: 100vh;
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
    margin: 1rem auto;
    max-width: 400px;
  }
  .login-btn {
    width: 100%;
    max-width: 400px;
    margin-bottom: 3rem;
  }
}
</style>
