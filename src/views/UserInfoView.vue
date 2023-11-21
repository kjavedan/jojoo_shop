<template>
  <h1>My Info</h1>
  <div class="user-info-wrapper">
    <div class="avatar">
      <img :src="userAvatar" alt="avatar" />
    </div>
    <UserInfoItem
      v-for="(item, i) in userInfoItemsData"
      :key="i"
      :title="item.title"
      :value="item.value"
      :prop="item.prop"
      @edit="handleEdit"
    ></UserInfoItem>
  </div>
  <el-dialog v-model="dialogVisible" :title="dialogTitle" @close="handleCloseDialog">
    <el-form
      :model="form"
      label-position="top"
      :rules="rules"
      ref="formRef"
      @keydown.enter.prevent="confirmEdit(formRef)"
    >
      <el-form-item v-if="propValue == 'phoneNumber'" prop="phoneNumber" :error="phoneNumberError">
        <MazPhoneNumberInput
          v-model="form.phoneNumber"
          show-code-on-list
          :preferred-countries="['IR', 'AE', 'US', 'CN', 'IN']"
          :ignored-countries="['AC']"
          @update="phoneNumberResult = $event"
          :success="phoneNumberResult?.isValid"
          class="phone-input"
          :default-country="selectedCountry"
        />
      </el-form-item>
      <!-- <el-form-item v-else-if="propValue == 'address'">
        <GoogleMap></GoogleMap>
      </el-form-item> -->
      <el-form-item :prop="propValue" v-else>
        <el-input :placeholder="heldInfo?.title" v-model="form[propValue]"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" :loading="loading" @click="confirmEdit(formRef)">
        Confirm
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import defaultAvatar from '@/assets/images/Account-fill.png'
import { updateUserById } from '@/api/user'
import { ElMessage } from 'element-plus'
import { validateUsername } from '@/utils'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import GoogleMap from '../components/GoogleMap.vue'

//store
const store = useUserStore()
const { userDetails } = storeToRefs(store)

//refs
const loading = ref(false)
const heldInfo = ref(null)
const form = ref({})
const formRef = ref(null)
const dialogVisible = ref(false)
const phoneNumberError = ref(null)
const phoneNumberResult = ref(null)
const selectedCountry = ref('IR')
const userInfoItemsData = computed(() => [
  {
    title: 'Full Name',
    value: userDetails.value.fullName,
    prop: 'fullName'
  },
  {
    title: 'Username',
    value: userDetails.value.username,
    prop: 'username'
  },
  {
    title: 'Email',
    value: userDetails.value.email,
    prop: 'email'
  },
  {
    title: 'Phone',
    value: userDetails.value.phoneNumber,
    prop: 'phoneNumber'
  },
  {
    title: 'Password',
    value: '•••••••••',
    prop: 'password'
  },
  {
    title: 'Address',
    value: userDetails.value.address,
    prop: 'address'
  }
])

const rules = ref({
  username: [
    { required: true, message: 'Username cannot be empty string!', trigger: 'blur' },
    { min: 4, message: 'Length should be at least 4', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' }
  ],
  fullName: [{ required: true, message: 'Full name cannot be empty string!', trigger: 'blur' }],
  picture: [
    { required: true, message: 'Image URL cannot be empty', trigger: 'blur' },
    { type: 'url', message: 'Invalid image URL format', trigger: 'blur' }
  ],
  locale: [{ type: 'string', message: 'Locale must be a string', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: 'Invalid email format', trigger: 'blur' }],
  phoneNumber: [{ type: 'string', message: 'Invalid phone number format', trigger: 'blur' }],
  password: [{ min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }]
})

//computed
const dialogTitle = computed(() =>
  heldInfo.value ? `Confirm your new ${heldInfo.value.title}` : ''
)

const userAvatar = computed(() => {
  return userDetails.value.picture ? userDetails.value.picture : defaultAvatar
})

const propValue = computed(() => (heldInfo.value ? heldInfo.value.prop : ''))

//func
const handleEdit = (title, value, prop) => {
  dialogVisible.value = true
  heldInfo.value = { title, value, prop }
  form.value = { [prop]: value }
}

const handleCloseDialog = () => {
  heldInfo.value = null
  dialogVisible.value = false
  formRef.value.resetFields()
}

const confirmEdit = async (formRef) => {
  if (!formRef) return

  try {
    await formRef.validate(async (valid, fields) => {
      if (valid) {
        try {
          loading.value = true
          const res = await updateUserById(userDetails.value._id, form.value)
          handleSuccess(res)
        } catch (error) {
          console.log(error)
          ElMessage.error(error?.response?.data?.errors[0]?.msg)
        } finally {
          loading.value = false
        }
      } else {
        console.log('Validation error:', fields)
      }
    })
  } catch (error) {
    console.log(error)
    loading.value = false
  }
}

const handleSuccess = (res) => {
  if (res.status === 200) {
    store.setUserInfo(res.data.user)
    ElMessage.success(`Your new ${heldInfo.value.title} updated successfully!`)
    dialogVisible.value = false
  }
}

//hooks
watch(userDetails, () => {
  console.log(propValue.value)
  console.log(form.value)
})
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

.user-info-wrapper {
  // border: solid;
  // margin-top: 1rem;
  .avatar {
    margin: 1rem auto;
    margin-top: 0;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    background: #f6f6f6;
    @include flex-center;
    overflow: hidden;

    img {
      height: 100%;
      // width: 100%;
    }
  }
}
.phone-input {
  width: 100%;
}
.m-phone-number-input__select[data-v-38502e76] {
  width: 35% !important;
}
</style>
