<template>
  <div class="custom-input">
    <label class="input-label" :class="{ 'label-active': isFocused || inputValue }">Search</label>
    <div class="input-container">
      <input
        type="text"
        ref="inputRef"
        :class="['input-field', { active: isFocused }]"
        v-model="inputValue"
        @focus="isFocused = true"
        @blur="onBlur"
      />
      <i class="icon">
        <img height="16" src="@/assets/images/search.png" alt="" />
      </i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
const isFocused = ref(false)
const inputRef = ref(null)

const onBlur = () => {
  if (!inputValue.value) {
    isFocused.value = false
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.custom-input {
  position: relative;
  margin: 40px 30px;
}

.input-label {
  position: absolute;
  top: 5px;
  left: 20px;
  transform-origin: left top;
  transition: all 0.4s ease-out;
  pointer-events: none;
  z-index: 2;
  color: gray;
}

.input-field {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  font-size: 16px;
  background: #f6f6f6;
  color: gray;
  @include round-l;
  transition: border-color 0.3s ease-out;
  font-size: 13px;

  @include ease;
  &.active {
    padding-left: 15px;
  }
}

.input-container {
  position: relative;
}

.icon {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  @include round-xl;
  padding: 10px;
  @include flex-center;
  cursor: pointer;
  @include ease;
  &:hover {
    scale: 1.1;
  }
}

/* When the input field is focused or has a value, move the label up */
.label-active {
  transform: translate(-10px, -30px);
  opacity: 1;
  font-size: 14px;
}

/* Additional styling for the input when focused */
.input-field:focus {
  outline: none;
}
</style>
