<template>
  <div class="login">
    <h2>login to your account</h2>
  </div>

  <div class="with-goole">
    <img src="@/assets/images/goole.png" alt="google" />
    <span>Google</span>
  </div>
  <div class="or-with">Or with email and password</div>
  <form></form>
  <div class="no-account">
    Don't have an account?
    <RouterLink :to="{ name: 'sign-up' }"> Sign Up </RouterLink>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
