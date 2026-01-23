<script setup>
    import { reactive, ref } from 'vue';
    import axios from 'axios';
    import bgImage from '../assets/background/about.png'
    import githubIcon from '../assets/icons/github.png'
    import linkedinIcon from '../assets/icons/linkedin.png'

    const form = reactive({
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
      consent: false
    });

    const successMessage = ref('');
    const errorMessage = ref('');

    // form submission method
    const submitForm = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, form);
        successMessage.value = 'Ihre Nachricht wurde erfolgreich gesendet!';
        errorMessage.value = '';

        clearForm();
      } catch (error) {
        errorMessage.value = 'Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.';
        successMessage.value = '';
      }
    };

    function clearForm() {
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
      form.phone = '';
      form.consent = false;
    }
    const homeData = ref({
      linkedinUrl: "https://www.linkedin.com/in/svitlana-kashkina-12a0922b4/",
      githubUrl: "https://github.com/SvitlanaKashkina"
    });

    function openMap() {
      const lat = 52.1507694;
      const lng = 9.9511194;
      // Open Google Maps in a new tab
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
    }
</script>


<template>
    <main class="main-content contact-section" :style="{ backgroundImage: `url(${bgImage})` }">

      <div class="contact-container">

        <!-- Left form -->
        <div class="contact-form-container">
          <h2>Kontaktformular</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">Name *</label>
              <input type="text" v-model="form.name" id="name" placeholder="Ihr Name" required/>
            </div>

            <div class="form-group">
              <label for="email">E-Mail *</label>
              <input type="email" v-model="form.email" id="email" placeholder="Ihre E-Mail" required />
            </div>

            <div class="form-group">
              <label for="subject">Betreff *</label>
              <input type="text" v-model="form.subject" id="subject" placeholder="Betreff" required/>
            </div>

            <div class="form-group">
              <label for="message">Nachricht *</label>
              <textarea v-model="form.message" id="message" placeholder="Ihre Nachricht" required></textarea>
            </div>

            <div class="form-group">
              <label for="phone">Telefon</label>
              <input type="text" v-model="form.phone" id="phone" placeholder="Ihre Telefonnummer (optional)" />
            </div>

            <div class="form-group consent">
              <input type="checkbox" v-model="form.consent" id="consent" required />
              <label for="consent">Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß DSGVO zu *</label>
            </div>

            <button type="submit">Senden</button>
          </form>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
        </div>

        <!-- Right block -->
        <div class="contact-info-block">
          <!-- Карта -->
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
.main-content.contact-section {
  min-height: calc(100vh - 80px);
  padding: 40px 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: flex-end;
}
/* Container for right and left blocks */
.contact-container {
  display: flex;
  margin: 25px 300px 0 300px;
  font-family: Arial, sans-serif;
}
/* left block */
.contact-form-container {
  flex: 2;
  margin: 70px 80px 0 80px;
  padding: 10px 50px 35px 50px;
  background-color: #3F4958;
  border: 4px solid #272E37;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #1FE7FF;
}
h2 {
  margin: 10px 0 20px 0 ;
  text-align: center;
  font-size: 40px;
  color: #1FE7FF;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
.form-group {
  margin: 13px 0 4px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  color: #1FE7FF;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}

input[type="text"]{
  border: 1px solid rgb(51, 51, 51);
  padding: 0.5rem;
  border-radius: 0.30rem;
  border: 2px solid #272E37;
  font-size: 15px;
  color: #080808;
}
input[type="email"] {
  border: 1px solid rgb(51, 51, 51);
  padding: 0.5rem;
  border-radius: 0.30rem;
  border: 2px solid #272E37;
  font-size: 15px;
  color: #080808;
}
textarea {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  height: 100px;
  font-family: Arial, sans-serif;
  font-size: 15px;
  resize: vertical;
}
.consent {
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  margin: 20px 0 30px 0;
}
button {
  width: 100%;
  padding: 0.7rem;
  background-color: #007bff;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.success-message {
  margin: 15px 0 0 20px;
  color: green;
  font-size: 20px;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  line-height: 1.2;
  font-family: 'Arial', 'Helvetica', sans-serif;
}
.error-message {
  margin: 15px 0 0 20px;
  color: red;
  font-size: 25px;
  font-weight: 600;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  line-height: 1.2;
  font-family: 'Arial', 'Helvetica', sans-serif;
}
 /* Right block*/
.contact-info-block {
  display: flex;
  flex-direction: column;
  margin: 110px 50px 0 80px;
  padding: 20px;
  background-color: #3F4958;
  border: 4px solid #272E37;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #1FE7FF;
  width: fit-content;
  height: fit-content;
}
.location-card {
  flex: 1;
  margin: 30px;
  padding: 10px 20px 0 20px;
  border-radius: 12px;
  border: 2px solid #868788;
  background: #606e81;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  color: #1FE7FF;
  cursor: pointer;
  transition: background 0.3s;
  user-select: none;
}
.location-card:hover {
  background: #cfd4da;
  transform: translateY(-3px);
}
.icon {
  font-size: 30px;
  margin: 8px 0 8px 0;
}
.title {
  font-size: 40px;
  font-weight: 700;
  margin: 4px 0 4px 0;
  font-weight: 700;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
.coordinates {
  font-size: 18px;
  color: #0c0c0c;
  margin: 20px 0 0 0;
  text-shadow: 6px 6px 6px rgba(3,3,3,0.7);
}
.city {
  font-size: 35px;
  font-weight: 500;
  color: #1FE7FF;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
  margin: 20px 0 20px 0;
}
.connect-block {
  width: 250px;
  margin: 20px 30px 20px 30px;
  padding: 10px 20px 20px 20px;
  border-radius: 12px;
  border: 2px solid #868788;
  background: #606e81;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  text-align: center;
  cursor: pointer;
  transition: background 0.3s;
  user-select: none;
}
.connect-block p {
  font-size: 40px;
  font-weight: 700;
  color: #1FE7FF;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  margin: 10px 0 30px 0;
  padding: 0;
}
.social-links {
  display: flex;
  gap: 3rem;
  justify-content: flex-start;
   padding: 0 0 0 35px;
}
.social-links img {
  width: 70px;
  height: 70px;
  transition: transform 0.2s;
}
.social-links img:hover {
  transform: scale(1.1);
}
footer {
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 5px 0 0 0;
  margin: 40px 0 0 0;
  box-sizing: border-box;

}
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(40px, 8vw, 100px);
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
}
</style>