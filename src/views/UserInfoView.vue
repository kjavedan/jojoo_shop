<template>
  <h1>My Info</h1>
  <div class="user-info-wrapper">
    <div class="info-item">
      <h4 class="item-title">Username</h4>
      <div class="item-body">
        <p>khaled.j</p>
        <img src="@/assets/images/pen.png" alt="pen" />
      </div>
    </div>
    <div class="info-item">
      <h4 class="item-title">Username</h4>
      <div class="item-body">
        <p>khaled.j</p>
        <img src="@/assets/images/pen.png" alt="pen" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.user-info-wrapper {
  border: solid;

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
        margin-bottom: -10px;
        height: 24px;
        cursor: pointer;
      }
    }
  }
}
</style>
