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
      @edit="handleEdit"
    ></UserInfoItem>
  </div>
  <el-dialog v-model="heldInfo" :title="dialogTitle" @close="heldInfo = null">
    <el-form
      :model="form"
      label-position="top"
      :rules="rules"
      ref="formRef"
      @keydown.enter.prevent="confirmEdit"
    >
      <el-form-item :prop="form[heldInfo.title]">
        <el-input :placeholder="heldInfo?.title" v-model="form[heldInfo.title]"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" :loading="loading" @click="confirmEdit"> Confirm </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import defaultAvatar from '@/assets/images/Account-fill.png'
import { updateUserById } from '@/api/user'

//store
const store = useUserStore()
const { userDetails } = storeToRefs(store)

//refs
const loading = ref(false)
const heldInfo = ref(null)
const form = ref({})
const userInfoItemsData = ref([
  {
    title: 'Full Name',
    value: userDetails.value.fullName
  },
  {
    title: 'Username',
    value: userDetails.value.username
  },
  {
    title: 'Email',
    value: userDetails.value.email
  },
  {
    title: 'Phone',
    value: userDetails.value.phone
  },
  {
    title: 'Password',
    value: '•••••••••'
  },
  {
    title: 'Address',
    value: userDetails.value.address
  }
])
import { ref } from 'vue'

const rules = ref({
  username: [{ required: true, message: 'Username cannot be empty string!', trigger: 'blur' }],
  fullName: [{ required: true, message: 'Full name cannot be empty string!', trigger: 'blur' }],
  picture: [
    { required: true, message: 'Image URL cannot be empty', trigger: 'blur' },
    { type: 'url', message: 'Invalid image URL format', trigger: 'blur' }
  ],
  locale: [{ type: 'string', message: 'Locale must be a string', trigger: 'blur' }],
  email: [{ type: 'email', message: 'Invalid email format', trigger: 'blur' }],
  phoneNumber: [
    { type: 'string', message: 'Invalid phone number format', trigger: 'blur' },
    {
      validator: (rule, value) => /^\d+$/.test(value),
      message: 'Invalid phone number format',
      trigger: 'blur'
    }
  ],
  password: [{ min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }]
})

//computed
const dialogTitle = computed(() =>
  heldInfo.value ? `Confirm your new ${heldInfo.value.title}` : ''
)

const userAvatar = computed(() => {
  return userDetails.value.picture ? userDetails.value.picture : defaultAvatar
})

//func
const handleEdit = (title, value) => {
  heldInfo.value = { title, value }
}

const confirmEdit = async () => {
  try {
    isEditLoading.value = true
    const res = await updateUserById(userDetails.value._id, form.value)
    console.log(res)
    //get new user info
    //update new user info in store
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

//hooks
watch(() => {
  console.log(heldInfo.value)
  console.log(userDetails.value)
})
</script>

<style lang="scss" scoped>
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
</style>
