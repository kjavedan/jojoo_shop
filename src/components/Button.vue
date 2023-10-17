<template>
  <button :class="['btn', { expand }]" @click="emitClick">
    <slot>Add To Cart</slot>
  </button>
</template>

<script setup>
defineProps(['expand'])
const emits = defineEmits(['click'])

const emitClick = () => {
  emits('click')
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.btn {
  @include flex-center;
  @include round-l;
  @include shadow-l;
  @include padding-spacing(1, 2, 1, 2);
  min-width: 150px;
  height: 45px;
  cursor: pointer;
  background: $clr-black;
  color: $clr-text-dark-1;
  font-family: $primary-font;
  border: none;
  outline: none;
  transition: all 0.1s ease-in-out;
  font-size: large;

  &:active {
    box-shadow: none;
    scale: 0.99;
  }

  &.expan {
    width: 100%;
  }
}
</style>
