<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import bgImage from '../assets/background/about.png';
import githubIcon from '../assets/icons/github.png';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { message } from '../components/ErrorBanner.vue' // global Errorbanner

// Component states
const project = ref({});
const loading = ref(true);
const localError = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
const staticUrl = import.meta.env.VITE_STATIC_URL;

// Technology grouping
const groupedTechnologies = computed(() => {
  if (!project.value.technologies) return {};
  return project.value.technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {});
});

const architectureList = computed(() => {
  if (!project.value.architectureDescription) return [];
  return project.value.architectureDescription
    .split(/\.\s+|\.\n+/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s + '.');
});

// Retrieving Project Data
const fetchProject = async () => {
  loading.value = true;
  localError.value = ''; // local error reset

  try {
    const response = await axios.get(`${apiUrl}/projects`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      project.value = response.data[0];
      console.log("Project screenshots:", project.value.screenshots);
    } else {
      console.warn("No project data received");
      localError.value = 'Keine Projektdaten erhalten.';
      message.value = 'Fehler beim Laden der Projektinformationen.';
      setTimeout(() => message.value = '', 5000);
    }
  } catch (error) {
    console.error("Error fetching project data:", error);
    localError.value = 'Fehler beim Laden der Projektdaten.';
    message.value = 'Es ist ein Fehler beim Laden der Projektinformationen aufgetreten.';
    setTimeout(() => message.value = '', 5000);
  } finally {
    loading.value = false;
  }
}

// onMounted
onMounted(() => {
  fetchProject();
});
</script>


<template>
  <main class="project-page" :style="{ backgroundImage: `url(${bgImage})` }">

    <!-- Spinner -->
    <LoadingSpinner :visible="loading" />

    <h1 class="projects-title">My projects</h1>

    <div v-if="!loading">
      <!-- Local error -->
      <div v-if="localError" class="error-text">{{ localError }}</div>

      <div v-else class="container">
        <!-- Left block: text information -->
        <div class="project-info">
          <p class="project-name">Project Name: <span class="project-title">"{{ project.title }}"</span></p>

          <section v-if="project.shortDescription">
            <h2>Project Overview:</h2>
            <p>{{ project.shortDescription }}</p>
          </section>

          <section v-if="project.technologies && project.technologies.length">
            <h2>Tech Stack:</h2>
            <div v-for="(techList, category) in groupedTechnologies" :key="category" class="tech-category">
              <strong>{{ category }}:</strong>
              <span>{{ techList.map(tech => tech.name).join(', ') }}</span>
            </div>
          </section>

          <section v-if="project.features && project.features.length">
            <h2>Key Features:</h2>
            <ul>
              <li v-for="feature in project.features" :key="feature.id">{{ feature.description }}</li>
            </ul>
          </section>

          <section v-if="project.architectureDescription">
            <h2>Architecture / System Design:</h2>
            <ul class="dot-list">
              <li v-for="(item, index) in architectureList" :key="index">{{ item }}</li>
            </ul>
          </section>

          <section v-if="project.roleDescription">
            <h2>Role in the Project:</h2>
            <p>{{ project.roleDescription }}</p>
          </section>

          <section class="status-period">
            <div v-if="project.status" class="status">
              <h2>Status:</h2>
              <p>{{ project.status }}</p>
            </div>
            <div v-if="project.endDate" class="period">
              <h2>Period:</h2>
              <p>{{ new Date(project.endDate).getFullYear() }}</p>
            </div>
          </section>

          <section v-if="project.lessonsLearned">
            <h2>What I Learned:</h2>
            <p class="preformatted">{{ project.lessonsLearned }}</p>
          </section>

          <section v-if="project.githubUrl">
            <h2>Links:</h2>
            <a :href="project.githubUrl" target="_blank" rel="noopener noreferrer">
              <img :src="githubIcon" alt="GitHub" class="icon"/>
            </a>
          </section>
        </div>

        <!-- Right block: screenshots -->
        <div class="project-screenshots" v-if="project.screenshots && project.screenshots.length">
          <img v-for="screenshot in project.screenshots" :key="screenshot.id"
               :src="staticUrl + screenshot.imageUrl"
               :alt="screenshot.altText"
               class="project-screenshot-img" />
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
.project-page {
  padding: 40px 20px;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.projects-title {
  padding: 0;
  margin: 40px 0 0 0;
  text-align: center;
  color: #1FE7FF;
  font-size: 55px;
  font-weight: 800;
  font-family: Arial, sans-serif;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 5px 5px 5px rgba(5,5,5,5);
}
/* container for text and screenshots */
.container {
  display: flex;
  flex-direction: row;
  background-color: #272E37;
  border: 4px solid #1e242b;
  border-radius: 30px 30px 30px 30px;
  padding: 10px;
  margin: 20px 330px 30px 330px;
  gap: 20px;
  font-family: Arial, sans-serif;
}
/* Left block */
.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 0 0 40px;
}
.project-info .project-name {
  font-size: 28px;
  margin: 30px 0 0 15px;
  font-weight: bold;
  color: #0899ec;
  -webkit-text-fill-color: #0899ec;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
.project-info .project-title {
  font-size: 35px;
  font-weight: 600;
  color:#fdfdfd;
  -webkit-text-fill-color: #ffffff;
  -webkit-text-stroke: 0px;
  margin-left: 30px;
}
.project-info h2 {
  margin: 5px 0 0 15px;
  padding: 0;
  font-size: 30px;
  font-weight: bold;
  color: #0899ec;
  -webkit-text-fill-color: #0899ec;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
.project-info p {
  font-size: 20px;
  color: #ffffff;
  font-weight: 500;
  line-height: 1.2;
  margin: 7px 0 0 35px;
  padding: 0;
}
.tech-category {
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0 0 35px;
  line-height: 1.1;

}
.tech-category strong {
  font-size: 20px;
  color: #9ab7ec;
  font-weight: 500;
  -webkit-text-fill-color: #9ab7ec;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
  margin-right: 8px;
  display: inline-block;
  vertical-align: top;
}
.tech-category span {
  font-size: 20px;
  color: #ffffff;
  font-weight: 500;
  margin: 0;
  padding: 0;
  flex: 1 1 0;
  display: inline;
  min-width: 0;
}
.project-info li {
  font-size: 20px;
  color: #ffffff;
  font-weight: 500;
  line-height: 1.2;
  margin: 3px 0 0 15px;
  padding-left: 1rem;
}
.project-info ul {
  padding-left: 1.35rem;
  margin: 5px 0 0 20px;
}
.preformatted {
  white-space: pre-line;
}
.dash-list {
  list-style: none;
  padding-left: 0;
}
.dash-list li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 10px;
  line-height: 1.6;
  color: #ffffff;
}
.dash-list li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: #1FE7FF;
  font-weight: bold;
}
/* Status and period block */
.status-period {
  display: flex;
  gap: 1rem;
}
.status-period .status{
   width: 90%;
}
.status-period .period{
   width: 18%;
}
.project-info .icon {
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  margin: 10px 0 0 20px;
}
.project-info .icon:hover {
  transform: scale(1.2);
  filter: brightness(1.5);
}
/* Right block: screenshots */
.project-screenshots {
  width: 24%;
  display: flex;
  flex-direction: column;
  margin: 70px 50px 30px 30px;
  padding: 0;
  gap: 100px;
}
.project-screenshot-img {
  width: 95%;
  max-height: 490px;
  border-radius: 12px 12px 12px 12px;
  border: 3px solid #3F4958;
  object-fit: fill;
  display: block;
  margin: 0;
  padding: 0;
   box-shadow:
    10px 12px 23px rgba(0, 0, 0, 0.7),
    6px 8px 28px rgba(31, 231, 255, 0.45);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
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
