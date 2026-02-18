<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import bgImage from '../assets/background/about.png'
import LoadingSpinner from '../components/LoadingSpinner.vue'

// Component states
const aboutSections = ref([])
const certificates = ref([])
const loading = ref(true)
const localError = ref('') // local error for data block
const aboutPhotos = ref([]);
const cvUrl = ref('')

const apiUrl = import.meta.env.VITE_API_URL
console.log('API URL:', apiUrl)
console.log(import.meta.env.VITE_API_URL)

// Receiving data
const fetchAboutMe = async () => {
  console.log('FETCH ABOUT CALLED')
  loading.value = true
  localError.value = '' // local error reset

  try {
    const response = await axios.get(`${apiUrl}/about`)
    const data = response.data

    console.log('RAW response:', response)
    console.log('Response data:', response.data)
    console.log('Type of data:', typeof response.data)

    aboutSections.value = data.sections || []
    certificates.value = data.certificates || []

    const desiredOrder = ['about', 'experience', 'education', 'hobbies']
    aboutSections.value.sort((a, b) => desiredOrder.indexOf(a.sectionKey) - desiredOrder.indexOf(b.sectionKey))

    // Filter photos for About Me page
    aboutPhotos.value = (data.photos || []).filter(p => [31,32,33].includes(p.id))

    // Set CV file URL (ID 35)
    const cvFileObj = (data.photos || []).find(p => p.id === 35)
    cvUrl.value = cvFileObj ? cvFileObj.imageUrl : ''

  } catch (error) {
    console.error('Error loading About Me:', error)
    localError.value = 'Fehler beim Laden der About-Daten.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  console.log('COMPONENT MOUNTED');
  fetchAboutMe()
})

// Upload CV
function downloadCV() {
  if (!cvUrl.value) return
  const link = document.createElement('a')
  link.href = cvUrl.value
  link.download = 'Svitlana_Kashkina_CV.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Function for photo classes
const getPhotoClass = (index) => {
  switch (index) {
    case 0: return "myFoto";
    case 1: return "icons";
    case 2: return "tenis";
    default: return "";
  }
}
</script>


<template>
  <main class="main-content about-section" :style="{ backgroundImage: `url(${bgImage})` }">
    <!-- Spinner -->
    <LoadingSpinner :visible="loading" />

    <!-- Content or local error -->
    <div v-if="!loading">
      <div v-if="localError" class="error-text">{{ localError }}</div>

      <div v-else class="about-content">
        <h1 class="about-title">About Me</h1>
        <!-- Container for two blocks -->
        <div class="about-body">
          <!-- Left block -->
          <div class="about-text">
            <template v-for="section in aboutSections" :key="section.sectionKey">
              <div v-if="section.sectionKey !== 'certificates' && section.sectionKey !== 'hobbies'">
                <h2>{{ section.title }}</h2>
                <p v-html="section.content"></p>
              </div>
            </template>

            <!-- Certificate section -->
            <h2>Certificates</h2>
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

            <!-- Download-CV -->
            <div class="cv-container" v-if="cvUrl">
              <button @click="downloadCV" class="cv-button">📄 Download CV</button>
            </div>
          </div>

          <!-- Right block -->
          <div class="about-photos" v-if="aboutPhotos.length">
            <img
              v-for="(photo, index) in aboutPhotos"
              :key="photo.id"
              :src="photo.imageUrl"
              :alt="photo.altText"
              :class="['regular-photo', getPhotoClass(index)]"
            />
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="footer-content">
        &copy; 2026 Svitlana Kashkina. All rights reserved.
      </div>
    </footer>
  </main>
</template>

<style>
/* ========== Main Section ========== */
.main-content.about-section {
  min-height: calc(100vh - 80px);
  padding: clamp(20px, 5vw, 40px);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
/* === About Container  == */
.about-content {
  background-color: #272E37;
  border: 4px solid #1e242b;
  border-radius: clamp(8px, 2vw, 20px);
  padding: 0;
  max-width: 1200px;
  width: 75%;
  margin: clamp(30px,6vw,70px) auto 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}
.about-content > :first-child {
  margin-top: 0;
}
.about-title {
  margin: 0;
  padding: 0;
  text-align: center;
  color: #1FE7FF;
  font-size: clamp(6px, 5vw, 30px);
  -webkit-text-stroke: 1px rgb(8,8,8);
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
/* ==== Container for two blocks ==== */
.about-body {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(5px, 0.5vw, 5px);
}
/* Left block */
.about-text {
  flex: 1 1 clamp(250px, 60%, 700px);
  padding: 0 clamp(2px, 4vw, 40px);
  font-size: clamp(16px, 1.8vw, 25px);
}
.about-text h2 {
  color: #1FE7FF;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 600;
  margin-top: clamp(5px, 1.5vw, 25px);
  margin-bottom: 0;
  padding: 0;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 3px 3px 5px rgba(5,5,5,0.7);
}
.about-text p {
  color: #ffffff;
  font-size: clamp(14px, 1.6vw, 20px);
  margin: clamp(2px, 1vw, 10px) 0;
  line-height: 1.6;
  text-shadow: 2px 2px 3px rgba(3,3,3,0.7);
}
.about-text ul {
  margin: clamp(5px, 0.8vw, 10px) 0;
  padding-left: 1.5rem;
  color: #ffffff;
}
.about-text li {
  color: #b8c1d1;
  font-size: clamp(14px, 1.5vw, 20px);
}
.about-text .certificates-list li {
  color: #ffffff;
  font-size: clamp(14px, 1.5vw, 20px);
  line-height: 1.5;
}
/* CV button */
.cv-container {
  display: flex;
  justify-content: center;
  margin: clamp(10px, 2vw, 20px) 0;
}
.cv-button {
  padding: clamp(6px, 2vw, 12px) clamp(12px, 3vw, 24px);
  margin-left: clamp(12px, 40vw, 400px);
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: bold;
  color: #272E37;
  background-color: #1FE7FF;
  border: 4px solid #3F4958;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cv-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(30,231,255,0.6);
}
/* Right block - photos */
.about-photos {
  flex: 1 1 clamp(200px, 30%, 400px);
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 25vw, 250px);
  align-items: center;
  margin: clamp(5px, 10vw, 80px) clamp(5px, 0.5vw, 5px);
}
.about-photos .regular-photo {
  width: 100%;
  height: 300px;
  aspect-ratio: 3 / 4;
  max-width: 300px;
  object-fit: cover;
  border: 3px solid #07c7f7;
  border-radius: clamp(8px, 2vw, 20px);
}
.about-photos .myFoto {
  border: 3px solid #07c7f7;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border-radius: 50%;
  width: 80%;
  margin: clamp(8px, 2vw, 20px);
}
/* Footer */
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(20px, 8vw, 100px);
  font-size: clamp(14px, 1.4vw, 16px);
  margin: 0 0 clamp(2px, 0.5vw, 5px) 0;
  padding: 0 0 clamp(2px, 0.5vw, 5px) 0;
}
/* ================= Media Queries ================= */
@media (max-width: 1280px) {
  .main-content.about-section {
    min-height: calc(100vh - 80px);
    padding: clamp(5px, 1.5vw, 15px);
  }
/* === About Container  == */
  .about-content {
    margin: clamp(30px,6vw,60px) auto 0 auto;
  }
  .about-title {
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: clamp(6px, 4.5vw, 25px);
  }
  .about-body {
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .about-text {
    padding: 0 clamp(10px, 4vw, 25px);
  }
  .about-text h2 {
    font-size: clamp(1rem, 2.5vw, 2rem);
    margin-top: clamp(2px, 0.5vw, 5px);
  }
  .about-text p {
    font-size: clamp(14px, 1.6vw, 20px);
    margin: clamp(2px, 1vw, 10px) 0;
    line-height: 1.6;
  }
  .cv-container {
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .cv-button {
    padding: clamp(6px, 2vw, 12px) clamp(12px, 3vw, 24px);
    margin-left: clamp(12px, 3vw, 30px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  .about-photos {
    gap: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1vw, 15px) auto;
  }
  .about-photos img {
    max-width: 80%;
  }
  .about-photos .myFoto {
    border-radius: 43%;
    width: 100%;
  }
}
@media (max-width: 1024px) {
  .main-content.about-section {
    min-height: calc(100vh - 80px);
    padding: clamp(5px, 1.5vw, 15px);
  }
/* === About Container  == */
  .about-content {
    margin: clamp(10px,4vw,40px) auto 0 auto;
  }
  .about-title {
    font-size: clamp(6px, 2vw, 20px);
  }
  .about-body {
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .about-text {
    padding: 0 clamp(10px, 4vw, 25px);
  }
  .about-text h2 {
    font-size: clamp(1rem, 2.5vw, 2rem);
    margin-top: clamp(2px, 0.5vw, 5px);
  }
  .about-text p {
    font-size: clamp(14px, 1.6vw, 20px);
    margin: clamp(2px, 1vw, 10px) 0;
    line-height: 1.6;
  }
  .cv-container {
    margin: clamp(2px, 0.5vw, 5px) 0;
  }
  .cv-button {
    padding: clamp(6px, 2vw, 12px) clamp(12px, 3vw, 24px);
    margin-left: clamp(12px, 3vw, 30px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  .about-photos {
    gap: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1vw, 10px) auto;
  }
  .about-photos img {
    max-width: 50%;
  }
  .about-photos .myFoto {
    border-radius: 60%;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .main-content.about-section {
    min-height: calc(100vh - 80px);
    padding: clamp(5px, 2vw, 20px);
  }
/* === About Container  == */
  .about-content {
    margin: clamp(30px,8vw,80px) auto 0 auto;
  }
  .about-title {
    font-size: clamp(6px, 2vw, 20px);
  }
  .about-body {
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .about-text {
    padding: 0 clamp(10px, 4vw, 25px);
  }
  .about-text h2 {
    font-size: clamp(1rem, 2.5vw, 2rem);
    margin-top: clamp(2px, 0.5vw, 5px);
  }
  .about-text p {
    font-size: clamp(14px, 1.6vw, 20px);
    margin: clamp(2px, 1vw, 10px) 0;
    line-height: 1.6;
  }
  .cv-container {
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .cv-button {
    padding: clamp(6px, 2vw, 12px) clamp(12px, 3vw, 24px);
    margin-left: clamp(12px, 3vw, 30px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  .about-photos {
    gap: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1vw, 15px) auto;
  }
  .about-photos img {
    max-width: 70%;
  }
  .about-photos .myFoto {
    border-radius: 43%;
    width: 100%;
  }
}

@media (max-width: 600px) {
  .main-content.about-section {
    min-height: calc(100vh - 80px);
    padding: clamp(5px, 1vw, 10px) 0 clamp(5px, 5vw, 50px) 0;
  }
  .about-content {
    margin: clamp(30px, 13vw, 130px) auto 0 auto;
    width: 90%;
  }
  .about-title {
    font-size: clamp(10px, 2vw, 15px);
    margin: 0;
    padding: 0;
  }
  .about-text h2 {
    font-size: clamp(1.4rem, 4vw, 1.8rem);
  }
  .about-text p,
  .about-text li {
    font-size: clamp(12px, 3vw, 16px);
  }
  .cv-button {
    font-size: clamp(12px, 3vw, 16px);
    padding: clamp(6px, 2vw, 10px) clamp(12px, 3vw, 20px);
  }
  .about-photos {
    gap: clamp(10px, 5vw, 50px);
  }
  .about-photos img {
    width: 50%;
    height: 50%;
  }
  .about-photos .myFoto {
    width: 100%;
    height: 100%;
  }
}
</style>