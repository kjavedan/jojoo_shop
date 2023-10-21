<template>
  <div class="stepper">
    <div class="steps">
      <div
        v-for="(step, index) in steps"
        :key="step"
        @click="selectStep(index)"
        :class="['step', { active: index === status }]"
      >
        <div class="top">
          <div class="step-circle">
            <i class="icon"></i>
          </div>
        </div>

        <div class="step-label">{{ step }}</div>
      </div>
    </div>
    <div class="step-info" v-if="currentStep !== null">
      {{ stepInfo[currentStep] }}
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

// props
const props = defineProps(['status'])

// static
const steps = ['In Process', 'Packed', 'On the Way', 'Delivered']
const stepInfo = [
  'This step represents the initial processing of your order.',
  'Your items are packed and ready for shipment.',
  'Your order is on the way to your delivery address.',
  'Congratulations! Your order has been successfully delivered.'
]

// ref
const currentStep = ref(null)

// funcs
const selectStep = (index) => {
  currentStep.value = index
}

// hooks
onBeforeMount(() => {
  selectStep(props.status)
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.stepper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.steps {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  .step {
    border: solid green;
    @include flex-col;
    align-items: center;
  }

  .top {
    border: solid;
  }
  .line {
    border: solid;
  }
}

.steps {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.step-circle {
  width: 30px;
  height: 30px;
  border: 2px solid #4caf50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;

  .icon {
    color: #4caf50;
  }
}

.step-label {
  font-size: 14px;
  text-align: center;
}

.steps div.active .step-circle {
  background-color: #4caf50;
  border: none;

  .icon {
    color: white;
  }
}

.step-info {
  font-size: 18px;
  text-align: center;
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
}
</style>
