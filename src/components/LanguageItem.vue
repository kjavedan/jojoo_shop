<template>
  <div class="language-item">
    <div class="left">
      <h4 class="title">{{ title }}</h4>
      <span class="subtitle">{{ subtitle }}</span>
    </div>
    <div :class="['radio', { active: isActive }]">
      <div class="inner-circle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['title', 'subtitle', 'isActive', 'locale'])
</script>
<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.language-item {
  @include row-between;
  padding: 0.7rem 1.5rem;
  background: #f6f6f6;
  @include round-l;
  margin-top: 0.5rem;
  cursor: pointer;
  .left {
    .title {
      font-weight: bold;
    }
    .subtitle {
      color: gray;
      font-size: 12px;
    }
  }

  .radio {
    @include round-circle;
    height: 30px;
    width: 30px;
    @include flex-center;
    border: solid 1.5px black;
    &.active {
      background: black;

      .inner-circle {
        height: 10px;
        width: 10px;
        background: white;
        @include round-circle;
      }
    }
  }
}
</style>
