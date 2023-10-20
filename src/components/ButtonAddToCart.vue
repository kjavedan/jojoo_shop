<template>
  <button :class="['button', { loading }]" @click="handleClick">
    <span>Add to cart</span>
    <div class="cart">
      <svg viewBox="0 0 36 26">
        <polyline points="1 0 6 0 10 16 25.5 16 28.5 5 7 5"></polyline>
        <polyline points="15 11 17 13 22 8"></polyline>
      </svg>
    </div>
  </button>
</template>
<script setup>
import { ref } from 'vue'

//emits
const emits = defineEmits(['click'])

//props
defineProps(['expand'])

//refs
const loading = ref(false) // Initialize loading state to false

//funcs
const handleClick = () => {
  if (!loading.value) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      emits('click')
    }, 2500)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.button {
  --background: #000000;
  --text: #fff;
  --cart: #fff;
  --tick: #1cd200;

  height: 45px;
  position: relative;
  border: none;
  background: none;
  padding: 8px 28px;
  border-radius: 8px;
  @include round-l;
  // -webkit-appearance: none;
  // -webkit-tap-highlight-color: transparent;
  // -webkit-mask-image: -webkit-radial-gradient(white, rgb(0, 0, 0));
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  min-width: 144px;
  color: var(--text);
  background: var(--background);
  transform: scale(var(--scale, 1));
  transition: transform 0.4s cubic-bezier(0.36, 1.01, 0.32, 1.27);
  @include shadow-l;

  &:active {
    --scale: 0.95;
  }
  span {
    font-size: 14px;
    font-weight: 500;
    display: block;
    position: relative;

    transform: translateY(var(--span-y, 0));
    transition: transform 0.7s ease;
    &:before,
    &:after {
      content: '';
      width: var(--w, 2px);
      height: var(--h, 14px);
      border-radius: 1px;
      position: absolute;
      left: var(--l, 8px);
      top: var(--t, 6px);
      background: currentColor;
      transform: scale(0.75) rotate(var(--icon-r, 0deg)) translateY(var(--icon-y, 0));
      transition: transform 0.65s ease 0.05s;
      margin-top: -12px;
      margin-left: 15px;
      display: none;
    }
    &:after {
      --w: 14px;
      --h: 2px;
      --l: 2px;
      --t: 12px;
    }
  }
  .cart {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -14px 0 0 -18px;
    transform-origin: 12px 23px;
    transform: translateX(-100px) rotate(-18deg);
    &:before,
    &:after {
      content: '';
      position: absolute;
    }
    &:before {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      box-shadow: inset 0 0 0 2px var(--cart);
      bottom: 0px;
      left: 10px;
      filter: drop-shadow(11px 0 0 var(--cart));
    }
    &:after {
      width: 16px;
      height: 9px;
      background: var(--cart);
      left: 10px;
      bottom: 10px;
      transform-origin: 50% 100%;
      transform: perspective(4px) rotateX(-6deg) scaleY(var(--fill, 0));
      transition: transform 1.2s ease var(--fill-d);
    }
    svg {
      z-index: 1;
      width: 36px;
      height: 26px;
      display: block;
      position: relative;
      fill: none;
      stroke: var(--cart);
      stroke-width: 2px;
      stroke-linecap: round;
      stroke-linejoin: round;
      polyline {
        &:last-child {
          stroke: var(--tick);
          stroke-dasharray: 10px;
          stroke-dashoffset: var(--offset, 10px);
          transition: stroke-dashoffset 0.4s ease var(--offset-d);
        }
      }
    }
  }
  &.loading {
    --scale: 0.95;
    --span-y: -40px;
    --icon-r: 180deg;
    --fill: 1;
    --fill-d: 0.8s;
    --offset: 0;
    --offset-d: 1.73s;
    .cart {
      animation: cart 2.2s linear forwards 0.2s;
    }
  }
}

@keyframes cart {
  12.5% {
    transform: translateX(-40px) rotate(-18deg);
  }
  25%,
  45%,
  55%,
  75% {
    transform: none;
  }
  50% {
    transform: scale(0.9);
  }
  44%,
  56% {
    transform-origin: 12px 23px;
  }
  45%,
  55% {
    transform-origin: 50% 50%;
  }
  87.5% {
    transform: translateX(70px) rotate(-18deg);
  }
  100% {
    transform: translateX(140px) rotate(-18deg);
  }
}
</style>
