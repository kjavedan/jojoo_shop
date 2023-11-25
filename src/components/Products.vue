<template>
  <LoadingScreen v-if="loading"></LoadingScreen>
  <div v-else-if="currentData.length" class="products">
    <Card
      v-for="product in currentData"
      :key="product._id"
      :id="product._id"
      :name="product.name"
      :imgUrls="product.imgUrls"
      :price="product.price"
      :description="product.description"
      :selected="product.selected"
    >
    </Card>
  </div>
  <div v-else class="no-data">
    <img src="@/assets/images/no-data-folder.png" alt="monkey" class="folder" />
    <img src="@/assets/images/no-data-monkey.png" alt="monkey" class="monkey" />
    <p>{{ $t(routeName === 'home' ? 'noDataFoundMessage' : 'noSavedProductMessage') }}</p>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Card from './Card.vue'
import { getAllProducts } from '@/api/product'
import { getAllFavoriteData } from '@/api/favorite'
import LoadingScreen from './LoadingScreen.vue'

//routes
const route = useRoute()

//store
const currentData = ref([])

//refs
const routeName = ref(route.name)
const loading = ref(false)

//funcs
const handlePageData = () => {
  if (route.name === 'favorite') {
    fetchFavoriteData()
  } else {
    fetchProductData()
  }
}

const fetchProductData = async () => {
  try {
    loading.value = true
    const res = await getAllProducts()
    currentData.value = res.data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

const fetchFavoriteData = async () => {
  try {
    loading.value = true
    const res = await getAllFavoriteData()
    currentData.value = res.data
    loading.value = false
  } catch (error) {
    loading.value = false
    console.log(error)
  }
}

onBeforeMount(() => {
  handlePageData()
})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.products {
  position: relative;
  // border: solid yellow;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  max-width: 100%;

  @include pc-m {
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
.no-data {
  @include flex-col;
  align-items: center;
  margin-top: 10rem;
}
</style>
