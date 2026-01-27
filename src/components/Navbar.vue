<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

const homeContent = ref(null)

// request to backend
const fetchHomeContent = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/home`
    )
    homeContent.value = response.data
    console.log('Navbar home content:', homeContent.value)
  } catch (error) {
    console.error('Error loading Home data:', error)
  }
}

onMounted(() => {
  fetchHomeContent()
})
</script>


<template>
  <nav class="navbar">
    <div class="nav-left">
      <span v-if="homeContent" class="name">
        {{ homeContent.fullName }}
      </span>
      <span v-else>Loading...</span>
    </div>
    <ul class="nav-right">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About me</router-link></li>
        <li><router-link to="/skills">Skills</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<style>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: #272E37;
  width: 96%;
}
.nav-left .name {
  text-decoration: none;
  color: white;
  font-size: 23px;
  font-weight: bold;
  margin: 0 0 0 35px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 0 25px 0 0;
  padding: 0;
}
.nav-right a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 0 15px;
  margin: 0;
  line-height: 1;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.nav-right a:hover {
  background-color: rgba(31, 231, 255, 0.15);
  color: #1FE7FF;
}
.nav-right li:not(:last-child)::after {
  content: "";
  height: 25px;
  width: 1px;
  background-color: #00f6ff;
  display: inline-block;
  margin-left: 30px;
}
.navbar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 2cm;
  right: 2cm;
  height: 2px;
  background-color: #00f6ff;
  border-radius: 2px;
}
</style>