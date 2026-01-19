<script setup>
    import Navbar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'
    import bgImage from '../assets/background/about.png'
</script>


<template>
  <div class="projects-page">
    <Navbar />

    <main class="main-content projects-section" :style="{ backgroundImage: `url(${bgImage})` }">
      <div class="projects-content">
      </div>
    </main>

    <Footer />
  </div>
</template>


<style scoped>
.main-content.projects-section {
  padding: 40px 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.projects-content {
  background-color: #272E37;
  border: 4px solid #1e242b;
  border-radius: 2%;
  padding: 0px 20px 0 20px;
  margin: 30px 220px 30px 220px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  font-family: Arial, sans-serif;
}
</style>
