<script setup>
  import { ref, onMounted, watch } from 'vue'
  import axios from 'axios'
  import LoadingSpinner from '../components/LoadingSpinner.vue'
  import githubIcon from '../assets/icons/github.png'
  import linkedinIcon from '../assets/icons/linkedin.png'
  import emailIcon from '../assets/icons/email.png'
  import Footer from '../components/Footer.vue';

  const heroVideo = ref(null)
  const loading = ref(true)
  const localError = ref('')
  const videoSrc = ref('')

  const homeData = ref({
    fullName: '',
    roleTitle: '',
    roleType: '',
    shortBio: '',
    githubUrl: '',
    linkedinUrl: '',
    videos: []
  })

  const apiUrl = import.meta.env.VITE_API_URL
  console.log('API URL:', apiUrl)
  console.log(import.meta.env.VITE_API_URL)

  const onVideoReady = () => {
    if (!heroVideo.value) return

    heroVideo.value.playbackRate = 0.3
    heroVideo.value.play().catch(() => {})
  }

  const fetchHomeData = async () => {
    console.log('FETCH HOME CALLED')
    console.log('API URL:', apiUrl)
    loading.value = true
    localError.value = ''

    try {
      const response = await axios.get(`${apiUrl}/home`)
      console.log('RAW response:', response)
      console.log('Response data:', response.data)
      console.log('Type of data:', typeof response.data)

      homeData.value = response.data
      console.log('homeData after assign:', homeData.value)

      videoSrc.value = homeData.value.videos?.[0]?.imageUrl || '';
    } catch (error) {
      console.error('Error loading Home data:', error)
      localError.value = 'Es ist ein Fehler aufgetreten beim Laden der Home-Seite.'
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    console.log('COMPONENT MOUNTED');
    fetchHomeData()
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
        <div class="photo-block" v-if="videoSrc">
          <video
            ref="heroVideo"
            v-if="videoSrc"
            :src="videoSrc"
            autoplay
            muted
            loop
            playsinline
            @loadedmetadata="onVideoReady"
          ></video>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>


<style >
/* =========================
   General background
========================= */
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #272E37;
  color: #1FE7FF;
  font-family: Arial, sans-serif;
}

/* =========================
   Home container
========================= */
.content {
  flex: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
  gap: clamp(24px, 4vw, 40px);
}

/* =========================
   Two blocks wrapper
========================= */
.text-photo-container {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: clamp(22px, 5vw, 60px);
  flex-wrap: wrap;
  margin-top: clamp(1px, 14vh, 180px);
  margin-bottom: 0%;
}

/* =========================
   Left block (TEXT)
========================= */
.text-block {
  flex: 1 1 400px;
  max-width: 1000px;
  padding: clamp(5px, 3vw, 24px);
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: clamp(1px, 5vh, 70px);
  margin-bottom: 0%;
  margin-right: 0%;
}

/* Main title */
.text-block p:first-of-type {
  font-size: clamp(2.4rem, 4.5vw, 4.5rem);
  font-weight: bold;
  text-align: center;
  margin: 0;
  color: #1FE7FF;
}

/* Subtitle */
.text-block p:nth-of-type(2) {
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  text-align: center;
  margin: clamp(6px, 2vw, 16px) 0;
  color: #1FE7FF;
}

/* Description */
.text-block p:nth-of-type(3) {
  font-size: clamp(1rem, 1.6vw, 1.6rem);
  line-height: 1.6;
  text-align: center;
  margin: clamp(5px, 5vw, 70px) auto;
  padding: 0 clamp(5px, 4vw, 65px);
  max-width: 800px;
}

/* =========================
   Icons
========================= */
.social-icons {
  display: flex;
  justify-content: center;
  gap: clamp(14px, 4vw, 40px);
  margin-top: clamp(5px, 5vw, 40px);
}

.social-icons img {
  width: clamp(30px, 6vw, 60px);
  height: clamp(30px, 6vw, 60px);
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.social-icons img:hover {
  transform: scale(1.2);
  filter: brightness(1.5);
}

/* =========================
   Right block (PHOTO / VIDEO)
========================= */
.photo-block {
  flex: 1 1 280px;
  max-width: 440px;
  min-width: 0;
  width: 100%;
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  margin: clamp(1px, 6vh, 100px) auto 0 auto;
  margin-right: clamp(1px, 5vw, 40px);
  border: 3px solid #00f6ff;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.35),
    0 4px 8px rgba(0, 0, 0, 0.25);
}

.photo-block img,
.photo-block video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* =========================
   Tablets / small laptops
========================= */
@media (max-width: 1280px) {
  .text-photo-container {
    margin-top: clamp(1px, 7vh, 70px);
    margin-bottom: 0;
    gap: clamp(10px, 1vw, 10px);
    flex-direction: column;
  }
  .text-block {
    margin-top: clamp(1px, 1vh,10px);
    margin-bottom: 0;
    margin-right: clamp(1px, 15vw, 150px);
  }
    /* Main title */
  .text-block p:first-of-type {
    font-size: clamp(2rem, 4vw, 4.5rem);
  }
  /* Subtitle */
  .text-block p:nth-of-type(2) {
    font-size: clamp(1.8rem, 3vw, 3rem);
  }
  /* Description */
  .text-block p:nth-of-type(3) {
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    margin: clamp(5px, 3vw, 30px) auto;
  }
  .social-icons {
    margin-top: clamp(5px, 1vw, 10px);
  }
  .photo-block {
    margin: 0 clamp(1px, 40vw, 400px);;
    margin-right: clamp(1px, 37vw, 370px);
    max-width: 400px;
    max-height: 250px;
  }
}

@media (max-width: 1024px) {
  .text-photo-container {
    margin-top: clamp(1px, 7vh, 70px);
    margin-bottom: 0;
    gap: clamp(10px, 1vw, 10px);
    flex-direction: column;
    padding: 0;
  }
  .text-block {
    flex: 1;
    margin: clamp(1px, 2vh,20px) auto;
    padding: clamp(1px, 1.5vh, 15px) 0;
  }
    /* Main title */
  .text-block p:first-of-type {
    font-size: clamp(2rem, 3vw, 4rem);
    margin: 0;
  }
  /* Subtitle */
  .text-block p:nth-of-type(2) {
    font-size: clamp(1.8rem, 2vw, 2.5rem);
    margin: 0;
  }
  /* Description */
  .text-block p:nth-of-type(3) {
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    margin: clamp(5px, 1vw, 10px) auto;
  }
  .social-icons {
    margin-top: clamp(5px, 1vw, 10px);
    margin-bottom: 0;
  }
  .photo-block {
    margin: 0 auto;
    max-width: 370px;
    max-height: 200px;
  }
}

@media (max-width: 768px) {
  .text-photo-container {
    margin-top: clamp(1px, 7vh, 70px);
    margin-bottom: 0;
    gap: clamp(10px, 1vw, 10px);
    flex-direction: column;
    padding: 0;
  }
  .text-block {
    flex: 1;
    margin: clamp(1px, 2vh,20px) auto;
    padding: clamp(1px, 1.5vh, 15px) 0;
  }
    /* Main title */
  .text-block p:first-of-type {
    font-size: clamp(2rem, 3vw, 4rem);
    margin: clamp(5px, 1vw, 10px) auto;
  }
  /* Subtitle */
  .text-block p:nth-of-type(2) {
    font-size: clamp(1.8rem, 2vw, 2.5rem);
    margin: clamp(5px, 3vw, 30px) auto;
  }
  /* Description */
  .text-block p:nth-of-type(3) {
    font-size: clamp(1rem, 1.5vw, 1.5rem);
    margin: clamp(5px, 3vw, 30px) auto;
  }
  .social-icons {
    margin-top: clamp(5px, 2vw, 20px);
    margin-bottom: 0;
  }
  .photo-block {
    margin: 0 auto;
    max-width: 400px;
    max-height: 250px;
  }
}

/* =========================
   Small screens
========================= */
@media (max-width: 600px) {
  .text-photo-container {
    margin-top: clamp(1px, 7vh, 70px);
    margin-bottom: 0;
    gap: clamp(10px, 1vw, 10px);
    flex-direction: column;
    padding: 0;
  }
  .text-block {
    flex: 1;
    margin: clamp(1px, 1.5vh, 15px) auto;
    padding: clamp(1px, 1.5vh, 15px) 0;
  }
    /* Main title */
  .text-block p:first-of-type {
    font-size: clamp(2rem, 2.5vw, 2.5rem);
    margin: clamp(5px, 2vw, 20px) auto;
  }
  /* Subtitle */
  .text-block p:nth-of-type(2) {
    font-size: clamp(1.8rem, 1vw, 1rem);
    margin: clamp(5px, 1.5vw, 15px) auto;
  }
  /* Description */
  .text-block p:nth-of-type(3) {
    font-size: clamp(1rem, 1vw, 1rem);
    margin: clamp(5px, 3vw, 30px) auto;
  }
  .social-icons {
    margin-top: clamp(5px, 2vw, 20px);
    margin-bottom: 0;
  }
  .photo-block {
    margin: 0 auto;
    max-width: 260px;
    max-height: 190px;
  }
}
</style>