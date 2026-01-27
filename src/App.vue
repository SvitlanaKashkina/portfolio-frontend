<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue'
import ErrorBanner from './components/ErrorBanner.vue'
</script>

<template>
  <ErrorBanner />
  <Navbar />
  <div class="page-content">
    <router-view/>
  </div>
</template>

<style>
</style>
