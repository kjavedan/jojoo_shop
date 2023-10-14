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
        @input="handleChange"
      />
      <i class="icon">
        <img height="16" src="@/assets/images/search.png" alt="" />
      </i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//emit
const emits = defineEmits(['change'])

//prps

//refs

const inputValue = ref()
const isFocused = ref(false)
const inputRef = ref(null)

const onBlur = () => {
  if (!inputValue.value) {
    isFocused.value = false
  }
}

const handleChange = (e) => {
  emits('change', e.target.value)
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.custom-input {
  position: relative;
  margin: 10px 0 20px 0;
}

.input-label {
  position: absolute;
  top: 8px;
  left: 20px;
  transform-origin: left top;
  transition: all 0.4s ease-out;
  pointer-events: none;
  z-index: 2;
  color: lightgray;
}

.input-field {
  width: 100%;
  padding: 13px 10px;
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
  color: gray;
}

/* Additional styling for the input when focused */
.input-field:focus {
  outline: none;
}
</style>
