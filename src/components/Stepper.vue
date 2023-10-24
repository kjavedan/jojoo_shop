<template>
  <div class="stepper">
    <div class="steps">
      <div
        v-for="(step, index) in steps"
        :key="index"
        @click="selectStep(index)"
        :class="['step', { active: index === status }]"
      >
        <div class="top">
          <div class="step-circle">
            <img :src="step.icon" class="icon" />
          </div>
        </div>

        <div class="step-label">{{ step.title }}</div>
      </div>
    </div>

    <div class="step-info" v-if="currentStep !== null">
      {{ steps[currentStep].info }}
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import inProcessIcon from '@/assets/images/Process.png'
import packedIcon from '@/assets/images/Packed.png'
import onTheWayIcon from '@/assets/images/On-the-way.png'
import deliveredIcon from '@/assets/images/Shipped.png'

// props
const props = defineProps(['status'])

// static
const steps = [
  {
    title: 'In Process',
    info: 'This step represents the initial processing of your order.',
    icon: inProcessIcon
  },
  {
    title: 'Packed',
    info: 'Your items are packed and ready for shipment',
    icon: packedIcon
  },
  {
    title: 'On the Way',
    info: 'Your order is on the way to your delivery address.',
    icon: onTheWayIcon
  },
  {
    title: 'Delivered',
    info: 'Congratulations! Your order has been successfully delivered..',
    icon: deliveredIcon
  }
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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  .step {
    @include flex-col;
    align-items: center;
    width: 25%;
    .top {
      border: solid;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0%;
        width: calc(20svw - 34px);
        height: 2px;
        background-color: #ccc;
        transform: translate(-100%, -50%);
      }
    }
    &:nth-child(1) {
      ::before {
        display: none;
      }
    }
  }
}

.steps {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.step-circle {
  width: 34px;
  height: 34px;
  background: #ededed;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  box-shadow: 2px 2px 7px 0px rgba(206, 206, 206, 0.43) inset;
  @include flex-center;

  .icon {
    height: 24px;
  }
}

.step-label {
  font-size: 11px;
  text-align: center;
}

.steps div.active .step-circle {
  background-color: #000000;
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
