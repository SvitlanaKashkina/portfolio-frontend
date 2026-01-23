<script setup>
    import Navbar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'
    import bgImage from '../assets/background/about.png'
</script>


<template>
    <main class="main-content projects-section" :style="{ backgroundImage: `url(${bgImage})` }">



      <footer>
        <div class="footer-content">
          &copy; 2026 Svitlana Kashkina. All rights reserved.
        </div>
      </footer>
    </main>
</template>


<style scoped>
.main-content.projects-section {
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: flex-end;
}


footer {
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 5px 0 0 0;
  margin: 40px 0 0 0;
  box-sizing: border-box;
}
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(40px, 8vw, 100px);
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
}
</style>
