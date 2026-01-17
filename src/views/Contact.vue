<script setup>
    import Navbar from '../components/Navbar.vue'
    import Footer from '../components/Footer.vue'
</script>


<template>
  <div class="contact-page">
    <Navbar />

    <main class="main-content">
      <router-view />
      <!-- или твои секции -->
    </main>

    <Footer />
  </div>
</template>


<style scoped>
</style>