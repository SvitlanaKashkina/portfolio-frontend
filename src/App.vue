<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue'

const message = ref("Hello Portfolio");
</script>

<template>
  <Navbar />
  <div class="page-content">
    <router-view/>
  </div>
</template>

<style>
</style>
