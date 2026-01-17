<script setup>
import { ref, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import myVideo from '../assets/video/my-video.mp4'
import github from '@/assets/icons/github.png'
import linkedin from '@/assets/icons/linkedin.png'
import email from '@/assets/icons/email.png'

const videoSrc = myVideo
const heroVideo = ref(null)

onMounted(() => {
  heroVideo.value.playbackRate = 0.3
})
</script>


<template>
  <div class="home-page">
    <Navbar />

    <div class="content" id="home">
      <div class="text-photo-container">

        <!-- Left block -->
        <div class="text-block">
          <p>Java Softwareentwicklerin</p>
          <p>Backend & Fullstack</p>
          <p>Java, Spring Boot, Vue und JavaScript sind für mich nicht nur Werkzeuge, sondern ein fester Bestandteil meines Lebens und meiner Art zu denken. Mit ihrer Hilfe setze ich Ideen gerne in funktionierende Anwendungen um.</p>

          <!-- Icons -->
          <div class="social-icons">
            <a href="https://www.linkedin.com/in/svitlana-kashkina-12a0922b4/" target="_blank" rel="noopener noreferrer">
              <img :src="linkedin" alt="LinkedIn" />
            </a>
            <a href="https://github.com/SvitlanaKashkina" target="_blank" rel="noopener noreferrer">
               <img :src="github" alt="GitHub" />
            </a>
            <a href="/contact">
              <img :src="email" alt="Email" />
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


<style scoped>
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
}
.photo-block img,
.photo-block video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>