<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import bgImage from '../assets/background/about.png';
import githubIcon from '../assets/icons/github.png';
import LoadingSpinner from '../components/LoadingSpinner.vue';

// Component states
const project = ref({});
const loading = ref(true);
const localError = ref('');
const apiUrl = import.meta.env.VITE_API_URL;

// Array mit IDs der benötigten Fotos und Ausgabereihenfolge
const desiredScreenshotIds = [27, 28, 29];

const filteredScreenshots = computed(() => {
  if (!project.value.screenshots) return [];
  return project.value.screenshots
    .filter(s => desiredScreenshotIds.includes(s.id))
    .sort((a, b) => desiredScreenshotIds.indexOf(a.id) - desiredScreenshotIds.indexOf(b.id));
});

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
  console.log('FETCH PROJECT CALLED')
  loading.value = true;
  localError.value = ''; // local error reset

  try {
    const response = await axios.get(`${apiUrl}/projects`);
    if (Array.isArray(response.data) && response.data.length > 0) {
      project.value = response.data[0];
      console.log("Project screenshots:", project.value.screenshots);
    } else {
      console.warn("No project data received")
      localError.value = 'Keine Projektdaten erhalten.'
    }
  } catch (error) {
     console.error("Error fetching project data:", error)
     localError.value = 'Fehler beim Laden der Projektdaten.'
  } finally {
    loading.value = false;
  }
}

// onMounted
onMounted(() => {
  console.log('COMPONENT MOUNTED');
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
        <div class="project-screenshots" v-if="filteredScreenshots.length">
          <img v-for="screenshot in filteredScreenshots" :key="screenshot.id"
              :src="screenshot.imageUrl"
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
/* ===== PROJECT PAGE ===== */
.project-page {
  padding: clamp(10px, 2vw, 20px);
  min-height: 100dvh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
/* TITLE */
.projects-title {
  margin: clamp(20px, 3vw, 30px) 0 0 0;
  text-align: center;
  color: #1FE7FF;
  font-size: clamp(28px, 6vw, 55px);
  font-weight: 800;
  font-family: Arial, sans-serif;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 5px 5px 5px rgba(5,5,5,0.5);
}
/* CONTAINER for text and screenshots */
.container {
  display: flex;
  flex-direction: row;
  background-color: #272E37;
  border: 4px solid #1e242b;
  border-radius: clamp(15px, 3vw, 30px);
  padding: clamp(10px, 2vw, 20px);
  margin: clamp(5px, 1vw, 10px) clamp(5px, 15vw, 330px);
  gap: clamp(10px, 3vw, 20px);
  font-family: Arial, sans-serif;
  flex-wrap: wrap;
}
/* LEFT BLOCK */
.project-info {
  flex: 1 1 700px;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 1vw, 14px);
  margin: 0 clamp(2vw, 3vw, 40px) 0 clamp(2vw, 3vw, 40px);
}
/* Project name/title */
.project-info .project-name {
  font-size: clamp(10px, 3vw, 25px);
  margin: clamp(10px, 1vw, 20px) 0 0 0;
  font-weight: bold;
  color: #0899ec;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
.project-info .project-title {
  font-size: clamp(20px, 4vw, 35px);
  font-weight: 600;
  color:#fdfdfd;
  margin-left: clamp(10px, 2vw, 30px);
}
.project-info h2 {
  margin: clamp(5px, 1.5vw, 15px) 0 0 0;
  font-size: clamp(10px, 3vw, 25px);
  font-weight: bold;
  color: #0899ec;
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
/* Text paragraphs */
.project-info p {
  font-size: clamp(14px, 2vw, 20px);
  color: #ffffff;
  font-weight: 500;
  line-height: 1.2;
  margin: clamp(5px, 1.5vw, 15px) 0 0 0;
  padding: 0;
}
/* TECH CATEGORY */
.tech-category {
  display: flex;
  flex-wrap: wrap;
  margin: clamp(5px, 1vw, 10px) 0 0 0;
  line-height: 1.1;
}
.tech-category strong {
  font-size: clamp(14px, 1.5vw, 20px);
  color: #9ab7ec;
  margin-right: clamp(5px, 1vw, 8px);
}
.tech-category span {
  font-size: clamp(14px, 1.5vw, 20px);
  color: #ffffff;
  margin: 0;
  padding: 0;
  flex: 1 1 0;
  display: inline;
}
/* LISTS */
.project-info li {
  font-size: clamp(14px, 1.5vw, 20px);
  color: #ffffff;
  font-weight: 500;
  line-height: 1.2;
  margin: clamp(2px, 0.5vw, 5px) 0 0 0;
  padding-left: 1rem;
}
.project-info ul {
  padding-left: clamp(10px, 2vw, 22px);
  margin: clamp(5px, 1vw, 10px) 0 0 0;
}
/* DASH LIST */
.dash-list li {
  position: relative;
  padding-left: clamp(15px, 2vw, 20px);
  margin-bottom: clamp(5px, 1vw, 10px);
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
/* ICONS */
.project-info .icon {
  width: clamp(40px, 7vw, 70px);
  height: clamp(40px, 7vw, 70px);
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;
  margin: clamp(5px, 1vw, 10px) 0 0 clamp(2px, 0.2vw, 5px);
}
.project-info .icon:hover {
  transform: scale(1.2);
  filter: brightness(1.5);
}
/* STATUS AND PERIOD BLOCK */
.status-period {
  display: flex;
  gap: clamp(10px, 10vw, 100px);
}
.status-period .status {
  width: 70%;
}
.status-period .period {
  width: 20%;
}
/* RIGHT BLOCK: SCREENSHOTS */
.project-screenshots {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  margin: clamp(20px, 3vw, 90px) clamp(10px, 3vw, 50px);
  padding: 0;
  gap: clamp(20px, 17vw, 170px);
}
.project-screenshot-img {
  width: 95%;
  max-height: clamp(200px, 50vh, 490px);
  border-radius: clamp(8px, 2vw, 12px);
  border: 3px solid #3F4958;
  object-fit: fill;
  display: block;
  margin: 0 auto;
  padding: 0;
  box-shadow:
    10px 12px 23px rgba(0, 0, 0, 0.7),
    6px 8px 28px rgba(31, 231, 255, 0.45);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}
/* FOOTER */
footer {
  display: flex;
  justify-content: center;
  padding: clamp(5px, 1vw, 10px) 0 0 0;
  margin: clamp(20px, 3vw, 40px) 0 0 0;
  box-sizing: border-box;
}
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(20px, 5vw, 100px);
  font-size: clamp(12px, 1.2vw, 14px);
  margin: 0;
  padding: 0;
}
/* =========================
   Tablets / small laptops
========================= */
@media (max-width: 1280px) {
.container {
    margin: clamp(15px, 3vw, 20px);
    flex-direction: column;
    gap: clamp(15px, 4vw, 30px);
    padding: clamp(15px, 3vw, 20px);
  }
  .projects-title {
    margin: clamp(10px, 2vw, 20px) 0 0 0;
    font-size: clamp(20px, 4vw, 45px);
  }
  /* CONTAINER for text and screenshots */
  .container {
    padding: clamp(15px, 1vw, 10px);
    margin: clamp(5px, 1vw, 10px) clamp(5px, 15vw, 330px);
    gap: clamp(10px, 2vw, 15px);
  }
  /* LEFT BLOCK */
  .project-info {
    flex: 1 1 800px;
    gap: clamp(10px, 1vw, 14px);
    margin: 0 clamp(2vw, 3vw, 40px) 0 clamp(2vw, 3vw, 40px);
  }
  .project-info .project-title {
    font-size: clamp(10px, 3vw, 35px);
    margin-left: clamp(10px, 2vw, 30px);
  }
  .project-info h2 {
    margin: clamp(5px, 1vw, 10px) 0 0 0;
    font-size: clamp(10px, 1.5vw, 15px);
  }
  /* Text paragraphs */
  .project-info p {
    font-size: clamp(10px, 1vw, 14px);
    line-height: 1.2;
    margin: clamp(5px, 1.5vw, 15px) 0 0 0;
    padding: 0;
  }
  .tech-category strong {
    font-size: clamp(10px, 1vw, 15px);
    margin-right: clamp(5px, 1vw, 8px);
  }
  .project-screenshots {
    margin: clamp(20px, 3vw, 50px) 0;
    gap: clamp(15px, 4vw, 50px);
  }
  .project-info .project-name,
  .project-info .project-title,
  .project-info h2,
  .project-info p,
  .tech-category strong,
  .tech-category span,
  .project-info li,
  .dash-list li {
    font-size: clamp(10px, 1.5vw, 18px);
  }
  .project-info .icon {
    width: clamp(30px, 6vw, 60px);
    height: clamp(30px, 6vw, 60px);
  }
  /* RIGHT BLOCK: SCREENSHOTS */
  .project-screenshots {
    flex: 1 1 100px;
    display: flex;
    flex-direction: row;
    margin: clamp(10px, 3vw, 30px) clamp(10px, 3vw, 50px);
    padding: 0;
    gap: clamp(20px, 7vw, 70px);
  }
  .project-screenshot-img {
    width: 95%;
    max-height: clamp(200px, 50vh, 490px);
    margin: 0 auto;
    padding: 0;
  }
  /* FOOTER */
  footer {
    padding: clamp(5px, 1vw, 10px) 0 0 0;
    margin: clamp(20px, 3vw, 40px) 0 0 0;
  }
  .footer-content {
    font-size: clamp(12px, 1.2vw, 14px);
  }
}
@media (max-width: 1024px) {
  .container {
    margin: clamp(15px, 3vw, 20px);
    flex-direction: column;
    gap: clamp(15px, 4vw, 30px);
    padding: clamp(15px, 3vw, 20px);
  }
  .projects-title {
    margin: clamp(5px, 1.2vw, 10px) 0 0 0;
    font-size: clamp(20px, 3vw, 35px);
  }
  /* CONTAINER for text and screenshots */
  .container {
    padding: clamp(15px, 1vw, 10px);
    margin: clamp(2px, 0.5vw, 5px) clamp(5px, 15vw, 330px);
    gap: clamp(10px, 2vw, 15px);
  }
  /* LEFT BLOCK */
  .project-info {
    flex: 1 1 900px;
    gap: clamp(10px, 1vw, 14px);
    margin: 0 clamp(2vw, 3vw, 40px) 0 clamp(2vw, 3vw, 40px);
  }
  .project-info .project-title {
    margin-left: clamp(10px, 2vw, 30px);
    font-size: clamp(10px, 1.5vw, 18px);
  }
  .project-info h2 {
    margin: clamp(5px, 1vw, 10px) 0 0 0;
  }
  /* Text paragraphs */
  .project-info p {
    line-height: 1.2;
    margin: clamp(5px, 1.5vw, 15px) 0 0 0;
  }
  .tech-category strong {
    font-size: clamp(10px, 1vw, 15px);
    margin-right: clamp(5px, 1vw, 8px);
  }
  .project-screenshots {
    margin: clamp(20px, 3vw, 50px) 0;
    gap: clamp(15px, 4vw, 50px);
  }
  .project-info .project-name,
  .project-info h2,
  .project-info p,
  .tech-category strong,
  .tech-category span,
  .project-info li,
  .dash-list li {
    font-size: clamp(10px, 1.3vw, 16px);
  }
  .project-info .icon {
    width: clamp(30px, 6vw, 60px);
    height: clamp(30px, 6vw, 60px);
  }
  /* RIGHT BLOCK: SCREENSHOTS */
  .project-screenshots {
    flex: 1;
    display: flex;
    flex-direction: row;
    margin: clamp(10px, 3vw, 30px) clamp(10px, 3vw, 50px);
    padding: 0;
    gap: clamp(20px, 7vw, 70px);
  }
  .project-screenshot-img {
    width: 25%;
    max-height: clamp(100px, 29vh, 290px);
    margin: 0 auto;
    padding: 0;
  }
  /* FOOTER */
  footer {
    padding: clamp(5px, 1vw, 10px) 0 0 0;
    margin: clamp(20px, 3vw, 40px) 0 0 0;
  }
  .footer-content {
    font-size: clamp(12px, 1.2vw, 14px);
  }
}

@media (max-width: 820px) {
  .container {
    margin: clamp(15px, 3vw, 20px);
    flex-direction: column;
    gap: clamp(15px, 4vw, 30px);
    padding: clamp(15px, 3vw, 20px);
  }
  .projects-title {
    margin: clamp(5px, 6vw, 60px) 0 0 0;
    font-size: clamp(20px, 3vw, 35px);
  }
  /* CONTAINER for text and screenshots */
  .container {
    padding: clamp(15px, 1vw, 10px);
    margin: clamp(2px, 2vw, 20px) clamp(5px, 15vw, 330px);
    gap: clamp(10px, 2vw, 15px);
  }
  /* LEFT BLOCK */
  .project-info {
    flex: 1 1 900px;
    gap: clamp(10px, 1vw, 14px);
    margin: 0 clamp(2vw, 3vw, 40px) 0 clamp(2vw, 3vw, 40px);
  }
  .project-info .project-title {
    margin-left: clamp(10px, 2vw, 30px);
    font-size: clamp(10px, 2.5vw, 28px);
  }
  .project-info h2 {
    margin: clamp(5px, 1vw, 10px) 0 0 0;
  }
  /* Text paragraphs */
  .project-info p {
    line-height: 1.2;
    margin: clamp(5px, 1.5vw, 15px) 0 0 0;
  }
  .tech-category strong {
    font-size: clamp(10px, 1vw, 15px);
    margin-right: clamp(5px, 1vw, 8px);
  }
  .project-screenshots {
    margin: clamp(20px, 3vw, 50px) 0;
    gap: clamp(15px, 4vw, 50px);
  }
  .project-info .project-name,
  .project-info h2,
  .project-info p,
  .tech-category strong,
  .tech-category span,
  .project-info li,
  .dash-list li {
    font-size: clamp(10px, 2vw, 20px);
  }
  .project-info .icon {
    width: clamp(30px, 6vw, 60px);
    height: clamp(30px, 6vw, 60px);
  }
  /* RIGHT BLOCK: SCREENSHOTS */
  .project-screenshots {
    flex: 1;
    display: flex;
    flex-direction: row;
    margin: clamp(10px, 3vw, 30px) clamp(10px, 3vw, 50px);
    padding: 0;
    gap: clamp(20px, 7vw, 70px);
  }
  .project-screenshot-img {
    width: 25%;
    max-height: clamp(100px, 29vh, 290px);
    margin: 0 auto;
    padding: 0;
  }
  /* FOOTER */
  footer {
    padding: clamp(5px, 1vw, 10px) 0 0 0;
    margin: clamp(20px, 3vw, 40px) 0 0 0;
  }
  .footer-content {
    font-size: clamp(12px, 1.2vw, 14px);
  }
}

@media (max-width: 768px) {
  .container {
    padding: clamp(10px, 5vw, 15px);
    margin: clamp(10px, 3vw, 15px);
  }
  .project-screenshots {
    margin: clamp(15px, 3vw, 30px) 0;
    gap: clamp(10px, 3vw, 30px);
  }
  .project-info .project-name,
  .project-info .project-title,
  .project-info h2,
  .project-info p,
  .tech-category strong,
  .tech-category span,
  .project-info li,
  .dash-list li {
    font-size: clamp(12px, 3vw, 20px);
  }
  .project-info .icon {
    width: clamp(25px, 5vw, 50px);
    height: clamp(25px, 5vw, 50px);
  }
}

@media (max-width: 480px) {
  .container {
    padding: clamp(5px, 4vw, 10px);
    margin: clamp(5px, 1vw, 10px) 0 0 0;
    padding: clamp(15px, 3vw, 20px);
  }
  .projects-title {
    margin: clamp(5px, 11vw, 110px) 0 0 0;
    font-size: clamp(20px, 3vw, 35px);
  }
  .project-screenshots {
    margin: clamp(10px, 2vw, 20px) 0;
    gap: clamp(10px, 2vw, 20px);
  }
  .project-info .project-name,
  .project-info .project-title,
  .project-info h2,
  .project-info p,
  .tech-category strong,
  .tech-category span,
  .project-info li,
  .dash-list li {
    font-size: clamp(10px, 4vw, 18px);
  }
  .project-info .icon {
    width: clamp(20px, 5vw, 40px);
    height: clamp(20px, 5vw, 40px);
  }
}
</style>
