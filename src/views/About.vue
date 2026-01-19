<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import bgImage from '../assets/background/about.png'
import Foto from '../assets/myFoto/foto.jpg'
import Tenis from '../assets/myFoto/tenis.png'
import Icons from '../assets/myFoto/icons.png'

const aboutSections = ref([])
const certificates = ref([])

// Backend URL via environment variable
const apiUrl = import.meta.env.VITE_API_URL

// Getting data from the backend
const fetchAboutMe = async () => {
  try {
    const response = await axios.get(`${apiUrl}/about`)
    const data = response.data

    aboutSections.value = data.sections || []
    certificates.value = data.certificates || []

    const desiredOrder = ['about', 'experience', 'education', 'hobbies']

    aboutSections.value.sort((a, b) => {
      const aIndex = desiredOrder.indexOf(a.sectionKey)
      const bIndex = desiredOrder.indexOf(b.sectionKey)
      return aIndex - bIndex
    })

  } catch (error) {
    console.error('Error loading About Me:', error)
  }
}

onMounted(() => {
  fetchAboutMe()
})
</script>


<template>
  <Navbar />
  <main class="main-content about-section" :style="{ backgroundImage: `url(${bgImage})` }">

    <!-- Main container for text and photos -->
    <div class="about-content debug-border">

      <h1 class="about-title">About Me</h1>

      <!-- Container for text and photos -->
      <div class="about-body">

          <!-- Leftt block: info -->
          <div class="about-text debug-border">

              <template v-for="section in aboutSections" :key="section.sectionKey">
                <div v-if="section.sectionKey !== 'certificates' && section.sectionKey !== 'hobbies'">
                  <h2>{{ section.title }}</h2>
                  <p v-html="section.content"></p>
                </div>
              </template>

              <!-- Certificate section -->
              <h2>Zertifikate</h2>
              <ul class="certificates-list">
                <li v-for="cert in certificates" :key="cert.id">
                  {{ cert.name }}{{ cert.issuer ? `, ${cert.issuer}` : '' }}
                </li>
              </ul>

              <template v-for="section in aboutSections" :key="section.sectionKey">
                <div v-if="section.sectionKey === 'hobbies'">
                  <h2>{{ section.title }}</h2>
                  <p v-html="section.content"></p>
                </div>
              </template>
          </div>

          <!-- Right block: foto -->
          <div class="about-photos debug-border">
            <img :src="Foto" alt="Foto" class="myFoto" />
            <img :src="Icons" alt="Foto" class="icons" />
            <img :src="Tenis" alt="Foto" class="tenis" />
          </div>
      </div>
    </div>
  </main>

  <Footer />
</template>


<style>
.main-content.about-section {
  padding: 40px 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.about-content {
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
.about-title {
  padding: 0;
  margin: 25px 0 0 0;
  text-align: center;
  color: #1FE7FF;
  font-size: 50px;
}
.about-body {
  display: flex;
  margin: 0;
  padding: 0;
}
.about-text {
  width: 70%;
  min-width: 250px;
  margin: 0 0 0 20px;
  padding: 0 30px 5px 30px;
  font-size: 25px;
}
.about-text h2 {
  color: #1FE7FF;
  font-size: 30px;
  font-weight: 600;
  margin: 0 32px 0 16px;
}
.about-text p {
  color: #ffffff;
  font-size: 20px;
  margin: 10px 25px 35px 16px;
  line-height: 1.6;
}
.about-text ul {
  margin: 12px 0 24px 20px;
  padding: 0;
   color: #ffffff;
}
.about-text li {
  color: #b8c1d1;
  font-size: 20px;
  margin-bottom: 8px;
  margin: 0 0 0 18px;
}
.about-text .certificates-list li {
  color: #ffffff;
  font-size: 20px;
  line-height: 1.6;
}
.about-photos {
  width: 30%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  gap: 20px;
}
.about-photos img {
  width: 100%;
  max-width: 300px;
  object-fit: cover;
}
.about-photos .myFoto {
  border: 3px solid #07c7f7;
  border-radius: 50%;
  width: 80%;
  margin: 5px 0 20px 30px;
}
.about-photos .icons {
  border: 3px solid #07c7f7;
  border-radius: 5%;
  margin: 100px 0 20px 25px;
  width: 350px;
  height: 500px;
}
.about-photos .tenis {
  border: 3px solid #07c7f7;
  border-radius: 5%;
  margin: 100px 0 0 30px;
  width: 350px;
  height: 500px;
}
</style>
