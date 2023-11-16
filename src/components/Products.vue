<template>
  <div v-if="currentData.length" class="products">
    <Card
      v-for="product in currentData"
      :key="product.id"
      :id="product.id"
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
    <p>sorry no data found !</p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import Card from './Card.vue'
import { getAllProducts } from '@/api/product'
import { getAllFavoriteData } from '@/api/favorite'

//routes
const route = useRoute()

//store
const store = useProductStore()
const { productsData, favoriteData } = storeToRefs(store)
const currentData = ref([])

//refs
const routeName = ref(route.name)

//funcs
const handlePageData = () => {
  if (route.name === 'favorite') {
    currentData.value = favoriteData.value
  } else {
    currentData.value = productsData.value
  }
}

const fetchProductData = async () => {
  try {
    const res = await getAllProducts()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

const fetchFavoriteData = async () => {
  try {
    const res = await getAllFavoriteData()
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

//hooks
onMounted(() => {
  handlePageData()
})

onBeforeMount(() => {
  fetchProductData()
  fetchFavoriteData()
})

watch(route, () => {
  routeName.value = route.name
  handlePageData()
})
watch(favoriteData, () => {
  if (routeName.value === 'favorite') {
    currentData.value = favoriteData.value
  }
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
