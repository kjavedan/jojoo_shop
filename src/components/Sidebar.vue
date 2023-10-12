<template>
  <div :class="['side-bar', { expand }]">
    <div class="item">
      <img src="@/assets/images/home.png" alt="home" />
    </div>
    <div class="item">
      <img src="@/assets/images/search.png" alt="home" />
    </div>
    <div class="item">
      <img src="@/assets/images/bookmark-outline.png" alt="home" />
    </div>
    <div class="item">
      <img src="@/assets/images/instagram.png" alt="home" />
    </div>
    <div class="item">
      <img src="@/assets/images/whatsapp.png" alt="home" />
    </div>
    <div class="item">
      <img src="@/assets/images/menu.png" alt="home" />
    </div>
  </div>
</template>

<script setup>
defineProps(['expand'])
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.side-bar {
  @include col-space-around;
  @include round-xl;
  @include shadow-m;

  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);

  width: 50px;
  height: 400px;
  background: #fff;
  font-size: large;

  .item {
    padding: 0.6rem;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    @include flex-center;

    &:hover {
      background: $clr-white-soft;
      @include round-s;
    }
  }

  img {
    height: 26px;
  }

  &.expan {
  }
}
</style>
