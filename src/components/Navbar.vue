<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'

const homeContent = ref(null)
const isOpen = ref(false)
const apiUrl = import.meta.env.VITE_API_URL

// toggle burger menu
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const route = useRoute()
// Automatically close menu on transition
watch(route, () => {
  isOpen.value = false
})

// request to backend
const fetchHomeContent = async () => {
  try {
    const response = await axios.get(`${apiUrl}/home`)
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

     <!-- Burger button -->
    <div class="burger" @click="toggleMenu">
      ☰
    </div>

    <ul :class="['nav-right', { open: isOpen }]">
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
  padding: clamp(5px, 0.5vw, 5px) clamp(15px, 10vw, 100px);
  background-color: #272E37;
  width: 100%;
  height: 6%;
  box-sizing: border-box;
}

.nav-left .name {
  color: white;
  font-size: clamp(10px, 3vw, 30px);
  font-weight: bold;
  margin: 0;
  padding: 0;
}

/* Desktop menu */
.nav-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(15px, 3vw, 30px);
  list-style: none;
  top: 40px;
}

.nav-right a {
  text-decoration: none;
  color: white;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: bold;
  padding: clamp(4px, 1vw, 10px) clamp(8px, 3vw, 30px);
  margin: 0;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-right a:hover {
  background-color: rgba(31, 231, 255, 0.15);
  color: #1FE7FF;
}
.nav-right li {
  display: flex;
  align-items: center;
}

.nav-right li:not(:last-child)::after {
  content: "";
  height: clamp(16px, 2.7vw, 27px);
  width: 1px;
  background-color: #00f6ff;
  margin-left: clamp(10px, 2vw, 30px);
}

/* Separator line */
.navbar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 5%;
  right: 5%;
  height: 2px;
  background-color: #00f6ff;
}

/* Burger button (hidden on desktop) */
.burger {
  display: none;
  font-size: 26px;
  color: white;
  cursor: pointer;
}

/* =========================
   Mobile
========================= */
@media (max-width: 1280px) {
  .navbar {
    padding: clamp(10px, 1vw, 10px) clamp(15px, 7vw, 70px);
  }
  .nav-left .name {
    font-size: clamp(10px, 2vw, 20px);
  }
  /* Desktop menu */
  .nav-right {
    gap: clamp(10px, 1vw, 10px);
    margin: 0;
    padding: 0;
  }
  .nav-right li {
    text-align: center;
  }
}

@media (max-width: 1024px) {
  .navbar {
    padding: clamp(10px, 1vw, 10px) clamp(15px, 6vw, 60px);
  }
  .nav-left .name {
    font-size: clamp(20px, 2vw, 20px);
  }
  /* Desktop menu */
  .nav-right {
    gap: clamp(10px, 1vw, 10px);
    margin: 0;
    padding: 0;
  }
  .nav-right li {
    text-align: center;
    font-size: clamp(20px, 2vw, 20px);
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: clamp(10px, 1vw, 10px) clamp(10px, 5vw, 50px);
  }
  .nav-left .name {
    font-size: clamp(10px, 2vw, 20px);
  }
  /* Desktop menu */
  .nav-right {
    gap: clamp(10px, 1vw, 10px);
    margin: 0;
    padding: 0;
  }
}

@media (max-width: 600px) {
  .burger {
    display: block;
    cursor: pointer;
  }
  .nav-right {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #272E37;
    width: 200px;
    padding: 10px;
    gap: 10px;
  }
  .nav-right.open {
    display: flex;
  }
  .nav-left .name {
    font-size: clamp(14px, 2vw, 20px);
  }
}
</style>