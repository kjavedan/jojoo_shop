<template>
  <div class="stepper">
    <div class="steps" v-for="(step, index) in steps" :key="index">
      <div :class="['line', { active: index < statusIndex[status] + 1 }]" v-if="index != 0"></div>
      <div class="step-wrapper">
        <div
          @click="selectStep(index)"
          :class="['step', { active: index < statusIndex[status] + 1 }]"
        >
          <div class="step-circle">
            <img :src="step.icon" class="icon" />
          </div>
          <div class="step-label">{{ $t(step.title) }}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="step-info" v-if="currentStep !== null">
    {{ steps[currentStep]?.info }}
  </div>
</template>

<script setup>
import { onBeforeMount, ref, defineProps, onMounted, watch, onBeforeUnmount } from 'vue'
import inProcessIcon from '@/assets/images/Process.png'
import packedIcon from '@/assets/images/Packed.png'
import onTheWayIcon from '@/assets/images/On-the-way.png'
import deliveredIcon from '@/assets/images/Shipped.png'
import { useI18n } from 'vue-i18n'

// props
const props = defineProps(['status'])

// refs
const steps = ref([
  {
    title: 'process',
    info: 'This step represents the initial processing of your order.',
    icon: inProcessIcon
  },
  {
    title: 'packed',
    info: 'Your items are packed and ready for shipment',
    icon: packedIcon
  },
  {
    title: 'shipped',
    info: 'Your order is on the way to your delivery address.',
    icon: onTheWayIcon
  },
  {
    title: 'delivered',
    info: 'Congratulations! Your order has been successfully delivered..',
    icon: deliveredIcon
  }
])

// ref
const currentStep = ref(null)

const statusIndex = {
  process: 0,
  packed: 1,
  sent: 2,
  delivered: 3
}

// funcs
const selectStep = (index) => {
  currentStep.value = index
}

// hooks
onBeforeMount(() => {
  console.log(props.status)
  selectStep(statusIndex[props.status])
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.stepper {
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr 1fr;
  align-items: start;
  margin: 20px auto;
  width: 90%;
}

.steps {
  align-items: center;
  // justify-content: space-between;
  // border: solid yellow;
  // height: 100px;
  .line {
    width: 100%;
    border: solid 1px rgb(208, 208, 208);
    margin-top: -15px;

    &.active {
      border: solid 1px #000000;
    }
  }
  .step-wrapper {
    // min-width: 40px;
    // width: fit-content;
    // width: 100px;
    // border: solid blue;
    overflow: visible;
    display: flex;
    align-items: center;

    .step {
      // border: solid red;
      @include flex-col;
      align-items: center;
      position: relative;
      margin: 0 auto;

      .top {
        // position: relative;
      }

      &:nth-child(1) {
        .top::before {
          display: none;
        }
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
  width: 40px;
  height: 40px;
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
  text-wrap: nowrap;
}

.steps div.active .step-circle {
  background-color: #000000;
  box-shadow: none;
  border: none;

  .icon {
    color: white;
  }
}

.step-info {
  font-size: 18px;
  text-align: center;
  width: 90%;
  padding: 20px;
  @include shadow-s;
  @include round-m;
  @include flex-center;
  background-color: $clr-white-soft;
  margin: 2rem auto;
  height: 100px;
}
</style>
