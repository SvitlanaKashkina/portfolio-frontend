<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Footer from '../components/Footer.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import myVideo from '../assets/video/my-video.mp4'
import githubIcon from '../assets/icons/github.png'
import linkedinIcon from '../assets/icons/linkedin.png'
import emailIcon from '../assets/icons/email.png'
import { message } from '../components/ErrorBanner.vue' // global error

const videoSrc = myVideo
const heroVideo = ref(null)
const loading = ref(true)
const localError = ref('') // local error for div

const homeData = ref({
  fullName: '',
  roleTitle: '',
  roleType: '',
  shortBio: '',
  githubUrl: '',
  linkedinUrl: ''
})

const apiUrl = import.meta.env.VITE_API_URL

// Receiving data
const fetchHomeData = async () => {
  loading.value = true
  localError.value = '' // resetting the local error

  try {
    const response = await axios.get(`${apiUrl}/home`)
    homeData.value = response.data

  } catch (error) {
    console.error('Error loading Home data:', error)
    localError.value = 'Fehler beim Laden der Home-Daten.' // local message
    // global error via ErrorBanner
    message.value = 'Es ist ein Fehler aufgetreten beim Laden der Home-Seite.'
    setTimeout(() => message.value = '', 5000)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  heroVideo.value.playbackRate = 0.3
  fetchHomeData() // errors will be caught by a local try-catch and a global ErrorBanner
})
</script>


<template>
  <div class="home-page">
    <!-- Spinner -->
    <LoadingSpinner :visible="loading" />

    <!-- Content -->
    <div v-if="!loading" class="content" id="home">

      <!-- If there is a local error, we show it instead of the content -->
      <div v-if="localError" class="error-text">{{ localError }}</div>

      <div v-else class="text-photo-container">
        <!-- Left block -->
        <div class="text-block">
          <p>{{ homeData.roleTitle }}</p>
          <p>{{ homeData.roleType }}</p>
          <p>{{ homeData.shortBio }}</p>

          <!-- Icons -->
          <div class="social-icons">
            <a :href="homeData.linkedinUrl" target="_blank" rel="noopener noreferrer">
              <img :src="linkedinIcon" alt="LinkedIn" />
            </a>
            <a :href="homeData.githubUrl" target="_blank" rel="noopener noreferrer">
              <img :src="githubIcon" alt="GitHub" />
            </a>
            <a href="/contact">
              <img :src="emailIcon" alt="Email" />
            </a>
          </div>
        </div>

        <!-- Right block -->
        <div class="photo-block">
          <video
            ref="heroVideo"
            :src="videoSrc"
            autoplay
            muted
            loop
            playsinline
          ></video>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>


<style >
/* General background and text */
.home-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #272E37;
  color: #1FE7FF;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}
/* Container Home */
#home {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  color: white;
  margin: 80px 0 0 0;
  padding: 40px;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  gap: 40px;
  flex-wrap: wrap;
}
/* Container for two blocks */
#home .text-photo-container {
  display: flex;
  width: 100%;
  gap: 60px;
  flex-wrap: wrap;

}
/* Left block */
.text-block {
  flex: 1;
  justify-content: space-between;
  height: 100%;
  width: calc(66.66% - 20px);
  min-width: 250px;
  padding: 20px;
  margin: 100px 50px 15px 150px;
}
.text-block p:first-of-type {
  font-size: 4.8rem;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 15px 0 15px 0;
  color: #1FE7FF;
}

.text-block p:nth-of-type(2) {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 3.5rem;
  margin: 15px 0 15px 0;
  color: #1FE7FF;
}

.text-block p:nth-of-type(3) {
  font-size: 1.3rem;
  text-align: center;
  line-height: 1.5;
  margin: 55px 45px 80px 45px;
  padding: 0 65px 0 65px;
}
/* Icons */
.social-icons {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 20px;
}
.social-icons img {
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}
.social-icons img:hover {
  transform: scale(1.2);
  filter: brightness(1.5);
}
/* Right block */
.photo-block {
  width: 470px;
  height: 640px;
  max-width: 30%;
  margin: 30px 80px 0 0;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  border: 3px solid #00f6ff;
  border-radius: 10px;
  padding: 3px;
  box-sizing: border-box;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.photo-block img,
.photo-block video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>