<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ $t('quickLinks') }}</h3>
          <ul>
            <li>
              <RouterLink :to="{ name: 'home' }">{{ $t('home') }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'favorite' }">{{ $t('saved') }}</RouterLink>
            </li>
            <!-- <li><RouterLink :to="{ name: 'about' }">{{ $t('aboutUs') }}</RouterLink></li>
            <li><RouterLink :to="{ name: 'contact' }">{{ $t('contactUs') }}</RouterLink></li> -->
          </ul>
        </div>
        <div class="footer-section">
          <h3>{{ $t('contactUs') }}</h3>
          <p>{{ $t('email') }}: admin@jojooshop.com</p>
          <p>{{ $t('phone') }}: 050-259-7949</p>
        </div>
      </div>
      <div class="copyright">
        <p>&copy; 2023 Jojooshop. {{ $t('allRightsReserved') }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
@import '@/assets/scss/main.scss';

.footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  color: #333;
  text-align: center;
  width: 100%;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @include tablet {
    justify-content: space-around;
  }
}

.footer-section {
  flex: 1;
  margin-bottom: 1.5rem;
  h3 {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.8rem;
  }

  ul {
    list-style: none;
    padding: 0;
    li {
      margin-bottom: 0.5rem;
    }
  }
}

.copyright {
  margin-top: 2rem;
  font-size: 0.7rem;
}
</style>
