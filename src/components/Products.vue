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
  <div>
    <img src="@/assets/images/no-data-folder.png" alt="monkey" class="folder" />
    <img src="@/assets/images/no-data-monkey.png" alt="monkey" class="monkey" />
    <p>sorry no data found !</p>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import Card from './Card.vue'

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
    currentData.value = favoriteData
    console.log(favoriteData.value)
  } else {
    currentData.value = productsData
  }
}

//hooks
onMounted(() => {
  handlePageData()
})

watch(route, () => {
  routeName.value = route.name
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
</style>
