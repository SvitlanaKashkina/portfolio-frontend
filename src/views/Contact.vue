<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import bgImage from '../assets/background/about.png';
import githubIcon from '../assets/icons/github.png';
import linkedinIcon from '../assets/icons/linkedin.png';
import LoadingSpinner from '../components/LoadingSpinner.vue';

// Component states
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  phone: '',
  consent: false
});

const successMessage = ref('');
const localError = ref(''); // Local error
const loading = ref(false);

const homeData = ref({
  linkedinUrl: "https://www.linkedin.com/in/svitlana-kashkina-12a0922b4/",
  githubUrl: "https://github.com/SvitlanaKashkina"
});

// Clearing the form
function clearForm() {
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  form.phone = '';
  form.consent = false;
}

// Submitting a form
const submitForm = async () => {
  console.log('SUBMIT FORM CALLED')
  loading.value = true;
  localError.value = ''; // local error reset

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, form);
    successMessage.value = 'Your message has been sent successfully!';
    localError.value = '';
    clearForm();
  } catch (error) {
    console.error('Error sending message:', error);

    // Local error
    localError.value = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.';

    successMessage.value = '';
  } finally {
    loading.value = false;
  }
};

// Opening a map
function openMap() {
  try {
    const lat = 52.1507694;
    const lng = 9.9511194;
    const newWindow = window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    if (!newWindow) throw new Error('Popup blocked by browser');
  } catch (error) {
    console.error('Error opening map:', error)
    localError.value = 'Fehler beim Öffnen der Karte.'
  }
}
</script>


<template>
    <main class="main-content contact-section" :style="{ backgroundImage: `url(${bgImage})` }">

      <LoadingSpinner :visible="loading" />

      <div v-if="!loading" class="contact-container">

        <!-- Left form -->
        <div class="contact-form-container">
          <h2>Contact Form</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" v-model="form.name" id="name" placeholder="Your Name" required/>
            </div>

            <div class="form-group">
              <label for="email">E-Mail *</label>
              <input type="email" v-model="form.email" id="email" placeholder="Your Email" required />
            </div>

            <div class="form-group">
              <label for="subject">Subject *</label>
              <input type="text" v-model="form.subject" id="subject" placeholder="Subject" required/>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea v-model="form.message" id="message" placeholder="Your Message" required></textarea>
            </div>

            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="text" v-model="form.phone" id="phone" placeholder="Your Phone Number (optional)" />
            </div>

            <div class="form-group consent">
              <input type="checkbox" v-model="form.consent" id="consent" required />
              <label for="consent">I agree to the processing of my personal data *</label>
            </div>

            <button type="submit">Send</button>
          </form>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <div v-if="localError" class="error-message">
            {{ localError }}
          </div>
        </div>

        <!-- Right block -->
        <div class="contact-info-block">

            <div
              class="location-card"
              @click="openMap"
            >
              <h2 class="title">Location</h2>
              <div class="icon">📍</div>
              <p class="coordinates">52.1507694°N, 9.9511194°E</p>
              <p class="city">Hildesheim</p>
            </div>

            <div class="connect-block">
              <p>Connect:</p>
              <div class="social-links">
                <a :href="homeData.linkedinUrl" target="_blank" rel="noopener noreferrer">
                  <img :src="linkedinIcon" alt="LinkedIn" />
                </a>
                <a :href="homeData.githubUrl" target="_blank" rel="noopener noreferrer">
                  <img :src="githubIcon" alt="GitHub" />
                </a>
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


<style scoped>
/* ============================= */
/* MAIN SECTION */
.main-content.contact-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: clamp(100px, 100vw, 107px) 0 clamp(10px, 5vw, 45px) 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
/* ============================= */
/* CONTAINER */
.contact-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  gap: clamp(20px, 5vw, 60px);
}
/* ============================= */
/* LEFT BLOCK */
.contact-form-container {
  flex: 1 1 500px;
  max-width: 630px;
  width: 100%;
  padding: clamp(2px, 0.5vw, 5px) clamp(5px, 4vw, 40px);
  margin-top: clamp(20px, 4vw, 45px);
  background-color: #3F4958;
  border: clamp(2px, 0.3vw, 4px) solid #272E37;
  border-radius: clamp(14px, 2vw, 22px);
  box-shadow: 0 1.5vw 3vw rgba(0, 0, 0, 0.25);
  color: #1FE7FF;
  box-sizing: border-box;
}
/* ============================= */
/* TITLE */
h2 {
  margin: clamp(5px, 1vw, 10px) 0 0 0;
  text-align: center;
  font-size: clamp(24px, 4vw, 42px);
  color: #1FE7FF;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 4px 4px 8px rgba(5,5,5,0.6);
}
/* ============================= */
/* FORM GROUP */
.form-group {
  display: flex;
  flex-direction: column;
  gap: clamp(1px, 0.3vw, 3px);
  margin-top: clamp(3px, 1vw, 10px);
  font-size: clamp(14px, 1.5vw, 20px);
  color: #1FE7FF;
  text-shadow: 2px 2px 5px rgba(5,5,5,0.5);
}
/* ============================= */
/* INPUTS */
input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: clamp(3px, 0.5vw, 8px);
  margin: 0;
  border-radius: clamp(6px, 0.8vw, 10px);
  border: clamp(1px, 0.2vw, 3px) solid #272E37;
  font-size: clamp(14px, 1.2vw, 17px);
  color: #080808;
  box-sizing: border-box;
}
/* TEXTAREA */
textarea {
  min-height: clamp(80px, 12vh, 150px);
  resize: vertical;
  font-family: Arial, sans-serif;
}
/* ============================= */
/* CONSENT */
.consent {
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
  font-size: clamp(13px, 1.2vw, 15px);
  flex-direction: row;
}
/* ============================= */
/* BUTTON */
button {
  width: 70%;
  padding: clamp(5px, 1.3vw, 13px);
  margin: clamp(5px, 1.5vw, 15px) clamp(5px, 8vw, 80px);
  background-color: #007bff;
  color: white;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 600;
  border: none;
  border-radius: clamp(8px, 1vw, 14px);
  cursor: pointer;
  transition: 0.3s ease;
}
button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}
/* ============================= */
/* SUCCESS & ERROR */
.success-message,
.error-message {
  margin: clamp(5px, 1vw, 10px) clamp(12px, 5vw, 60px);
  font-size: clamp(14px, 1.5vw, 20px);
  font-weight: 600;
  line-height: 1.3;
}
.success-message {
  color: #00ff99;
}
.error-message {
  color: #ff4d4d;
}
/* ========================= */
/* RIGHT BLOCK */
/* ========================= */
.contact-info-block {
  display: flex;
  flex-direction: column;
  gap: clamp(15px, 3vw, 30px);
  margin: clamp(20px, 5vw, 70px) 0 clamp(20px, 5vw, 50px) clamp(20px, 5vw, 60px);
  padding: clamp(15px, 3vw, 25px);
  background-color: #3F4958;
  border: clamp(2px, 0.4vw, 4px) solid #272E37;
  border-radius: clamp(12px, 2vw, 20px);
  box-shadow: 0 0 clamp(10px, 2vw, 20px) rgba(0, 0, 0, 0.2);
  color: #1FE7FF;
  width: 100%;
  max-width: clamp(280px, 35vw, 420px);
  box-sizing: border-box;
}
/* ========================= */
/* LOCATION CARD */
/* ========================= */
.location-card {
  padding: clamp(10px, 2vw, 20px);
  border-radius: clamp(10px, 2vw, 16px);
  border: 2px solid #868788;
  background: #606e81;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
  user-select: none;
}
.location-card:hover {
  background: #cfd4da;
  transform: translateY(-3px);
}
/* ========================= */
/* TEXT ELEMENTS */
/* ========================= */
.icon {
  font-size: clamp(20px, 3vw, 30px);
  margin: clamp(5px, 1vw, 10px) 0;
}
.title {
  font-size: clamp(20px, 3.5vw, 40px);
  font-weight: 700;
  margin: clamp(5px, 1vw, 10px) 0;
  text-shadow: 4px 4px 6px rgba(5,5,5,0.6);
}
.coordinates {
  font-size: clamp(14px, 1.5vw, 18px);
  margin-top: clamp(10px, 2vw, 20px);
  color: #0c0c0c;
  text-shadow: 3px 3px 6px rgba(3,3,3,0.6);
}
.city {
  font-size: clamp(18px, 3vw, 35px);
  font-weight: 500;
  margin: clamp(10px, 2vw, 20px) 0;
  text-shadow: 4px 4px 6px rgba(5,5,5,0.6);
}
/* ======================== */
/* CONNECT BLOCK */
/* ========================= */
.connect-block {
  width: 85%;
  padding: clamp(15px, 1.5vw, 15px) clamp(15px, 2vw, 25px) clamp(15px, 3vw, 35px) clamp(15px, 2vw, 25px);
  border-radius: clamp(10px, 2vw, 16px);
  border: 2px solid #868788;
  background: #606e81;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  transition: all 0.3s ease;
}
.connect-block p {
  font-size: clamp(18px, 3vw, 40px);
  font-weight: 700;
  margin-bottom: clamp(15px, 3vw, 30px);
  color: #1FE7FF;
  text-shadow: 4px 4px 6px rgba(5,5,5,0.6);
}
/* ========================= */
/* SOCIAL LINKS */
/* ========================= */
.social-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(15px, 5vw, 60px);
}
.social-links img {
  width: clamp(30px, 6vw, 70px);
  height: auto;
  transition: transform 0.2s;
}
.social-links img:hover {
  transform: scale(1.1);
}
/* ========================= */
/* FOOTER */
/* ========================= */
.footer-content {
  display: flex;
  justify-content: center;
  font-size: clamp(12px, 1.2vw, 14px);
  margin-top: auto;
  padding: clamp(5px, 1vw, 10px) 0;
  text-align: center;
}
/* ============================= */
/* 📱 MOBILE STACK */
/* 📱 Tablet */
@media (max-width: 1280px) {
  .main-content.contact-section {
    padding: clamp(60px, 80vw, 80px) 0 clamp(10px, 3vw, 35px) 0;
  }
  /* ============================= */
  /* CONTAINER */
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    gap: clamp(20px, 3vw, 30px);
  }
  /* ============================= */
  /* LEFT BLOCK */
  .contact-form-container {
    max-width: 530px;
    padding: clamp(2px, 0.5vw, 5px) clamp(5px, 4vw, 40px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  /* ============================= */
  /* TITLE */
  h2 {
    margin: clamp(5px, 1vw, 10px) 0 0 0;
    font-size: clamp(14px, 3vw, 32px);
  }
  /* ============================= */
  /* FORM GROUP */
  .form-group {
    gap: clamp(1px, 0.3vw, 3px);
    margin-top: clamp(3px, 1vw, 10px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  /* ============================= */
  /* INPUTS */
  input[type="text"],
  input[type="email"],
  textarea {
    padding: clamp(3px, 0.5vw, 8px);
    margin: 0;
    font-size: clamp(14px, 1.2vw, 17px);
  }
  /* TEXTAREA */
  textarea {
    min-height: clamp(80px, 12vh, 150px);
  }
  /* ============================= */
  /* CONSENT */
  .consent {
    font-size: clamp(13px, 1.2vw, 15px);
  }
  /* ============================= */
  /* BUTTON */
  button {
    width: 70%;
    padding: clamp(5px, 1.3vw, 13px);
    margin: clamp(5px, 1.5vw, 15px) clamp(5px, 8vw, 80px);
    font-size: clamp(16px, 2vw, 22px);
  }
  /* ============================= */
  /* SUCCESS & ERROR */
  .success-message,
  .error-message {
    margin: clamp(5px, 1vw, 10px) clamp(12px, 5vw, 60px);
    font-size: clamp(14px, 1.5vw, 20px);
    font-weight: 600;
    line-height: 1.3;
  }
  .success-message {
    color: #00ff99;
  }
  .error-message {
    color: #ff4d4d;
  }
  /* ========================= */
  /* RIGHT BLOCK */
  /* ========================= */
  .contact-info-block {
    gap: clamp(15px, 3vw, 30px);
    margin: clamp(20px, 1.8vw, 30px) 0 clamp(20px, 3vw, 30px) clamp(20px, 5vw, 60px);
    padding: clamp(15px, 3vw, 25px);
    width: 70%;
  }
  /* ========================= */
  /* LOCATION CARD */
  /* ========================= */
  .location-card {
    padding: clamp(10px, 2vw, 20px);
  }
  /* ========================= */
  /* TEXT ELEMENTS */
  /* ========================= */
  .icon {
    font-size: clamp(20px, 3vw, 30px);
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .title {
    font-size: clamp(20px, 3.5vw, 40px);
    font-weight: 700;
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .coordinates {
    font-size: clamp(14px, 1.5vw, 18px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  .city {
    font-size: clamp(18px, 3vw, 35px);
    margin: clamp(10px, 2vw, 20px) 0;
  }
  /* ======================== */
  /* CONNECT BLOCK */
  /* ========================= */
  .connect-block {
    width: 85%;
    padding: clamp(15px, 1.5vw, 15px) clamp(15px, 2vw, 25px) clamp(15px, 3vw, 35px) clamp(15px, 2vw, 25px);
  }
  .connect-block p {
    font-size: clamp(18px, 3vw, 40px);
    margin-bottom: clamp(15px, 3vw, 30px);
  }
  /* ========================= */
  /* SOCIAL LINKS */
  /* ========================= */
  .social-links {
    gap: clamp(15px, 5vw, 60px);
  }
  .social-links img {
    width: clamp(30px, 6vw, 70px);
    height: auto;
  }
}

@media (max-width: 1024px) {
  .main-content.contact-section {
    padding: clamp(10px, 3vw, 30px) 0 clamp(10px, 4vw, 40px) 0;
  }
  /* ============================= */
  /* CONTAINER */
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    gap: clamp(5px, 2vw, 20px);
  }
  /* ============================= */
  /* LEFT BLOCK */
  .contact-form-container {
    max-width: 400px;
    padding: clamp(2px, 0.3vw, 3px) clamp(5px, 3vw, 30px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  /* ============================= */
  /* TITLE */
  h2 {
    margin: clamp(2px, 0.3vw, 3px) 0 0 0;
    font-size: clamp(14px, 2.5vw, 25px);
  }
  /* ============================= */
  /* FORM GROUP */
  .form-group {
    gap: clamp(1px, 0.3vw, 3px);
    margin-top: clamp(3px, 1vw, 10px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  /* ============================= */
  /* INPUTS */
  input[type="text"],
  input[type="email"],
  textarea {
    padding: clamp(3px, 0.5vw, 8px);
    margin: 0;
    font-size: clamp(14px, 1.2vw, 17px);
  }
  /* TEXTAREA */
  textarea {
    min-height: clamp(20px, 7vh, 70px);
  }
  /* ============================= */
  /* CONSENT */
  .consent {
    font-size: clamp(13px, 1.2vw, 15px);
  }
  /* ============================= */
  /* BUTTON */
  button {
    width: 70%;
    padding: clamp(5px, 0.6vw, 6px);
    margin: clamp(5px, 1.5vw, 15px) clamp(5px, 5vw, 60px);
    font-size: clamp(16px, 2vw, 22px);
  }
  /* ========================= */
  /* RIGHT BLOCK */
  /* ========================= */
  .contact-info-block {
    gap: clamp(15px, 3vw, 30px);
    margin: clamp(20px, 1.8vw, 30px) 0 clamp(2px, 0.5vw, 5px) clamp(20px, 5vw, 60px);
    padding: clamp(5px, 2vw, 15px);
    width: 60%;
    max-width: clamp(100px, 28vw, 280px);
  }
  /* ========================= */
  /* LOCATION CARD */
  /* ========================= */
  .location-card {
    padding: clamp(3px, 1vw, 10px);
  }
  /* ========================= */
  /* TEXT ELEMENTS */
  /* ========================= */
  .icon {
    font-size: clamp(20px, 3vw, 30px);
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .title {
    font-size: clamp(10px, 3vw, 30px);
    font-weight: 700;
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .coordinates {
    font-size: clamp(14px, 1.5vw, 18px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  .city {
    font-size: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1.5vw, 15px) 0 clamp(2px, 0.5vw, 5px) 0;
  }
  /* ======================== */
  /* CONNECT BLOCK */
  /* ========================= */
  .connect-block {
    width: 80%;
    padding: clamp(5px, 1vw, 10px) clamp(15px, 2vw, 25px) clamp(25px, 1vw, 15px) clamp(15px, 2vw, 25px);
  }
  .connect-block p {
    font-size: clamp(18px, 3vw, 40px);
    margin-bottom: clamp(15px, 3vw, 30px);
  }
  /* ========================= */
  /* SOCIAL LINKS */
  /* ========================= */
  .social-links {
    gap: clamp(15px, 5vw, 60px);
  }
  .social-links img {
    width: clamp(30px, 6vw, 70px);
    height: auto;
  }
  .footer-content {
    margin-top: aut0;
    padding: clamp(2px, 0.5vw, 5px) 0;
  }
}
@media (max-width: 820px) {
  .main-content.contact-section {
    padding: clamp(10px, 9vw, 100px) 0 clamp(10px, 11vw, 120px) 0;
  }
  /* ============================= */
  /* CONTAINER */
  .contact-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    gap: clamp(5px, 2vw, 20px);
  }
  /* ============================= */
  /* LEFT BLOCK */
  .contact-form-container {
    max-width: 450px;
    padding: clamp(2px, 0.3vw, 3px) clamp(5px, 3vw, 30px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  /* ============================= */
  /* TITLE */
  h2 {
    margin: clamp(2px, 0.3vw, 3px) 0 0 0;
    font-size: clamp(14px, 2.5vw, 25px);
  }
  /* ============================= */
  /* FORM GROUP */
  .form-group {
    gap: clamp(1px, 0.3vw, 3px);
    margin-top: clamp(3px, 1vw, 10px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  /* ============================= */
  /* INPUTS */
  input[type="text"],
  input[type="email"],
  textarea {
    padding: clamp(3px, 0.5vw, 8px);
    margin: 0;
    font-size: clamp(14px, 1.2vw, 17px);
  }
  /* TEXTAREA */
  textarea {
    min-height: clamp(20px, 7vh, 70px);
  }
  /* ============================= */
  /* CONSENT */
  .consent {
    font-size: clamp(13px, 1.2vw, 15px);
  }
  /* ============================= */
  /* BUTTON */
  button {
    width: 70%;
    padding: clamp(5px, 0.6vw, 6px);
    margin: clamp(5px, 1.5vw, 15px) clamp(5px, 6vw, 70px);
    font-size: clamp(16px, 2vw, 22px);
  }
  /* ========================= */
  /* RIGHT BLOCK */
  /* ========================= */
  .contact-info-block {
    gap: clamp(15px, 3vw, 30px);
    margin: clamp(20px, 1.8vw, 30px) 0 clamp(2px, 0.5vw, 5px) clamp(20px, 2vw, 30px);
    padding: clamp(5px, 2vw, 15px);
    width: 70%;
    max-width: clamp(100px, 28vw, 280px);
  }
  /* ========================= */
  /* LOCATION CARD */
  /* ========================= */
  .location-card {
    padding: clamp(3px, 1vw, 10px);
  }
  /* ========================= */
  /* TEXT ELEMENTS */
  /* ========================= */
  .icon {
    font-size: clamp(20px, 3vw, 30px);
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .title {
    font-size: clamp(10px, 3vw, 30px);
    font-weight: 700;
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .coordinates {
    font-size: clamp(14px, 1.5vw, 18px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  .city {
    font-size: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1.5vw, 15px) 0 clamp(2px, 0.5vw, 5px) 0;
  }
  /* ======================== */
  /* CONNECT BLOCK */
  /* ========================= */
  .connect-block {
    width: 80%;
    padding: clamp(5px, 1vw, 10px) clamp(15px, 2vw, 25px) clamp(25px, 1vw, 15px) clamp(15px, 2vw, 25px);
  }
  .connect-block p {
    font-size: clamp(18px, 3vw, 40px);
    margin-bottom: clamp(15px, 3vw, 30px);
  }
  /* ========================= */
  /* SOCIAL LINKS */
  /* ========================= */
  .social-links {
    gap: clamp(15px, 5vw, 60px);
  }
  .social-links img {
    width: clamp(30px, 6vw, 70px);
    height: auto;
  }
  .footer-content {
    margin-top: aut0;
    padding: clamp(2px, 0.5vw, 5px) 0;
  }
}
/* ============================= */
/* 📱 Mobile */
@media (max-width: 768px) {
  .main-content.contact-section {
    padding: clamp(10px, 9vw, 100px) 0 clamp(10px, 11vw, 120px) 0;
  }
  /* ============================= */
  /* CONTAINER */
  .contact-container {
    max-width: 1200px;
    max-height: 825px;
    margin: 0 auto;
    padding: 0;
    gap: clamp(5px, 2vw, 20px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  /* ============================= */
  /* LEFT BLOCK */
  .contact-form-container {
    max-width: 450px;
    padding: clamp(2px, 0.3vw, 3px) clamp(5px, 3vw, 30px);
    margin-top: clamp(10px, 2vw, 20px);
    display: block;
    height: auto;
  }
  /* ============================= */
  /* TITLE */
  h2 {
    margin: clamp(2px, 0.3vw, 3px) 0 0 0;
    font-size: clamp(14px, 2.5vw, 25px);
  }
  /* ============================= */
  /* FORM GROUP */
  .form-group {
    gap: clamp(1px, 0.3vw, 3px);
    margin-top: clamp(3px, 1vw, 10px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  /* ============================= */
  /* INPUTS */
  input[type="text"],
  input[type="email"],
  textarea {
    padding: clamp(3px, 0.5vw, 8px);
    margin: 0;
    font-size: clamp(14px, 1.2vw, 17px);
  }
  /* TEXTAREA */
  textarea {
    min-height: clamp(20px, 5vh, 70px);
  }
  /* ============================= */
  /* CONSENT */
  .consent {
    font-size: clamp(13px, 1.2vw, 15px);
  }
  /* ============================= */
  /* BUTTON */
  button {
    width: 70%;
    padding: clamp(5px, 0.6vw, 6px);
    margin: clamp(5px, 1.5vw, 15px) clamp(5px, 6vw, 70px);
    font-size: clamp(16px, 2vw, 22px);
  }
  /* ========================= */
  /* RIGHT BLOCK */
  /* ========================= */
  .contact-info-block {
    gap: clamp(15px, 3vw, 30px);
    margin: clamp(20px, 1.8vw, 30px) 0 clamp(2px, 0.5vw, 5px) clamp(20px, 2vw, 30px);
    padding: clamp(5px, 2vw, 15px);
    width: 70%;
    max-width: clamp(100px, 28vw, 280px);
  }
  /* ========================= */
  /* LOCATION CARD */
  /* ========================= */
  .location-card {
    padding: clamp(3px, 1vw, 10px);
  }
  /* ========================= */
  /* TEXT ELEMENTS */
  /* ========================= */
  .icon {
    font-size: clamp(20px, 3vw, 30px);
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .title {
    font-size: clamp(10px, 3vw, 30px);
    font-weight: 700;
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .coordinates {
    font-size: clamp(14px, 1.5vw, 18px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  .city {
    font-size: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1.5vw, 15px) 0 clamp(2px, 0.5vw, 5px) 0;
  }
  /* ======================== */
  /* CONNECT BLOCK */
  /* ========================= */
  .connect-block {
    width: 80%;
    padding: clamp(5px, 1vw, 10px) clamp(15px, 2vw, 25px) clamp(25px, 1vw, 15px) clamp(15px, 2vw, 25px);
  }
  .connect-block p {
    font-size: clamp(18px, 3vw, 40px);
    margin-bottom: clamp(15px, 3vw, 30px);
  }
  /* ========================= */
  /* SOCIAL LINKS */
  /* ========================= */
  .social-links {
    gap: clamp(15px, 5vw, 60px);
  }
  .social-links img {
    width: clamp(30px, 6vw, 70px);
    height: auto;
  }
  .footer-content {
    margin-top: aut0;
    padding: clamp(2px, 0.5vw, 5px) 0;
  }
}

@media (max-width: 600px) {
  .main-content.contact-section {
    padding: clamp(10px, 36vw, 360px) 0 clamp(10px, 37vw, 370px) 0;
  }
  /* ============================= */
  /* CONTAINER */
  .contact-container {
    max-width: 800px;
    max-height: 590px;
    margin: 0 auto;
    padding: 0;
    gap: clamp(5px, 4vw, 40px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  /* ============================= */
  /* LEFT BLOCK */
  .contact-form-container {
    max-width: 330px;
    padding: clamp(2px, 0.3vw, 3px) clamp(5px, 3vw, 30px);
    margin: clamp(5px, 1vw, 10px) auto;
    display: block;
    height: auto;
  }
  /* ============================= */
  /* TITLE */
  h2 {
    margin: clamp(2px, 0.3vw, 3px) 0 0 0;
    font-size: clamp(14px, 2.5vw, 25px);
  }
  /* ============================= */
  /* FORM GROUP */
  .form-group {
    gap: clamp(1px, 0.3vw, 3px);
    margin-top: clamp(3px, 1vw, 10px);
    font-size: clamp(14px, 1.5vw, 20px);
  }
  /* ============================= */
  /* INPUTS */
  input[type="text"],
  input[type="email"],
  textarea {
    padding: clamp(3px, 0.5vw, 8px);
    margin: 0;
    font-size: clamp(14px, 1.2vw, 17px);
  }
  /* TEXTAREA */
  textarea {
    min-height: clamp(20px, 5vh, 70px);
  }
  /* ============================= */
  /* CONSENT */
  .consent {
    font-size: clamp(13px, 1.2vw, 15px);
  }
  /* ============================= */
  /* BUTTON */
  button {
    width: 70%;
    padding: clamp(5px, 0.6vw, 6px);
    margin: clamp(5px, 1.5vw, 15px) clamp(5px, 10vw, 100px);
    font-size: clamp(10px, 1.5vw, 15px);
  }
  /* ========================= */
  /* RIGHT BLOCK */
  /* ========================= */
  .contact-info-block {
    gap: clamp(15px, 3vw, 30px);
    margin: clamp(20px, 1.8vw, 30px) 0 clamp(2px, 0.5vw, 5px) clamp(20px, 16vw, 100px);
    padding: clamp(5px, 2vw, 15px);
    width: 100%;
    max-width: clamp(100px, 68vw, 680px);
    flex-direction: row;
  }
  /* ========================= */
  /* LOCATION CARD */
  /* ========================= */
  .location-card {
    padding: clamp(3px, 1vw, 10px);
    margin: 0  clamp(5px, 2vw, 20px) 0 0;
    width: 100%;
  }
  /* ========================= */
  /* TEXT ELEMENTS */
  /* ========================= */
  .icon {
    font-size: clamp(20px, 3vw, 30px);
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .title {
    font-size: clamp(10px, 3vw, 30px);
    font-weight: 700;
    margin: clamp(5px, 1vw, 10px) 0;
  }
  .coordinates {
    font-size: clamp(14px, 1.5vw, 18px);
    margin-top: clamp(10px, 2vw, 20px);
  }
  .city {
    font-size: clamp(10px, 2vw, 20px);
    margin: clamp(5px, 1.5vw, 15px) 0 clamp(2px, 0.5vw, 5px) 0;
  }
  /* ======================== */
  /* CONNECT BLOCK */
  /* ========================= */
  .connect-block {
    width: 80%;
    padding: clamp(5px, 1vw, 10px) clamp(15px, 2vw, 25px) clamp(25px, 1vw, 15px) clamp(15px, 2vw, 25px);
  }
  .connect-block p {
    font-size: clamp(18px, 3vw, 40px);
    margin-bottom: clamp(15px, 3vw, 30px);
  }
  /* ========================= */
  /* SOCIAL LINKS */
  /* ========================= */
  .social-links {
    gap: clamp(15px, 5vw, 60px);
  }
  .social-links img {
    width: clamp(30px, 6vw, 70px);
    height: auto;
  }
  .footer-content {
    margin-top: clamp(2px, 8vw, 80px);
    padding: clamp(2px, 0.5vw, 5px) 0;
  }
}
</style>