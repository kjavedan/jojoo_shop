<template>
  <div class="logo">
    <RouterLink :to="{ name: 'home' }">
      <h1>jojoo <span>shop.</span></h1>
    </RouterLink>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';

.logo {
  width: fit-content;
  cursor: pointer;
  a {
    text-decoration: none;
    color: unset;
  }
  h1 {
    font-size: 1.4rem;
  }
  span {
    display: block;
    margin-left: 60%;
    line-height: 0.8;
    font-size: 1rem;
  }
}
</style>
