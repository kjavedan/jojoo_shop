<template>
  <div class="info-item">
    <h4 class="item-title">{{ title }}</h4>
    <div class="item-body">
      <p>{{ value ? value : `------------` }}</p>
      <img @click="handleClick" src="@/assets/images/pen.png" alt="pen" />
    </div>
  </div>
</template>

<script setup>
//emits
const emit = defineEmits(['edit'])

//props
const props = defineProps(['title', 'value'])

//func
const handleClick = () => {
  emit('edit', props.title, props.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.info-item {
  // height: 100px;
  border-radius: 20px;
  background: #f6f6f6;
  padding: 1rem 1.5rem 1.5rem 1rem;
  margin-top: 0.5rem;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  .item-title {
    font-family: $secondary-font;
    font-weight: bold;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    color: #4f4f4f;
  }

  .item-body {
    @include row-between;
    p {
      font-size: 15px;
      font-weight: 500;
      color: #777777;
    }
    img {
      height: 24px;
      cursor: pointer;
    }
  }
}
</style>
