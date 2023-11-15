<template>
  <div class="review-item">
    <div class="product-img">
      <img src="https://i.postimg.cc/C5rKCL9g/ppk-1.png" alt="s" />
    </div>
    <div class="product-info">
      <div class="header">
        <h4 class="title">Pokemon</h4>
        <span class="more">
          <img src="@/assets/images/MenuVertical.png" alt="menu" />
        </span>
      </div>
      <div class="rates">
        <el-rate v-model="rate" disabled></el-rate>
      </div>
      <div class="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa neque velit voluptatibus
        quisquam quo laboriosam nobis autem debitis, in ipsam tempora similique fuga porro ullam
        deserunt, distinctio ex error magni!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

//refs
const rate = ref(4)
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';
.review-item {
  // border: solid;
  height: 110px;
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  .product-img {
    height: 100%;
    aspect-ratio: 1/1;
    @include flex-center;
    @include round-l;
    background: #f6f6f6;

    img {
      height: 90%;
    }
  }
  .product-info {
    // border: solid;
    width: 100%;

    .header {
      @include row-between;

      .title {
        @include text-shadow;
        font-size: 1.3rem;
        font-weight: bold;
      }

      .more {
        // border: solid;
        cursor: pointer;
        img {
          margin-bottom: -12px;
        }
      }
    }

    .rates {
      // border: solid;
      height: 24px;
      .ep-rate {
        height: 20px;
      }
    }

    .description {
      //   border: solid;
      padding-bottom: 1.5px;
      font-size: 0.8rem;
      line-height: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      -webkit-box-orient: vertical;
      color: rgb(118, 118, 118);
    }
  }
}
</style>
