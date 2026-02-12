<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import bgImage from '../assets/background/about.png';
import LoadingSpinner from '../components/LoadingSpinner.vue';


// Component states
const techStack = ref([]);
const technicalSkills = ref([]);
const softSkills = ref([]);
const loading = ref(true);
const localError = ref(''); // local error for data block

const apiUrl = import.meta.env.VITE_API_URL

// Receiving data
const fetchSkills = async () => {
  console.log('FETCH SKILLS CALLED')
  loading.value = true
  localError.value = '' // local error reset
  try {
    const response = await axios.get(`${apiUrl}/skills`);
    techStack.value = response.data.techStack;
    technicalSkills.value = response.data.technicalSkills;
    softSkills.value = response.data.softSkills;
  } catch (error) {
    console.error('Error loading skills:', error)
    localError.value = 'Fehler beim Laden der Skills.'
  } finally {
    loading.value = false
  }
}

// onMounted
onMounted(() => {
  console.log('COMPONENT MOUNTED');
  fetchSkills()
})
</script>


<template>
  <main class="main-content skills-section" :style="{ backgroundImage: `url(${bgImage})` }">

    <!-- Spinner -->
    <LoadingSpinner :visible="loading" />

    <h1 class="about-title">Technical & Professional Skills</h1>

    <!-- Local error or content -->
    <div v-if="!loading">
      <div v-if="localError" class="error-text">{{ localError }}</div>

      <div v-else class="skills-content">
        <!-- Tech Stack -->
        <h2 class="section-title">Tech Stack</h2>
        <div v-for="category in techStack" :key="category.id" class="category-block">
          <h3 class="category-title">
            {{ category.name }}:
            <span v-for="item in category.items" :key="item.id" class="tag">
              {{ item.name }}
            </span>
          </h3>
        </div>

        <!-- Technical Skills -->
        <h2 class="section-title">Technical Skills</h2>
        <div v-for="category in technicalSkills" :key="category.id" class="category-block">
          <h3 class="category-title">{{ category.name }}</h3>
          <ul class="skill-items">
            <li v-for="item in category.items" :key="item.id">
              {{ item.description }}
            </li>
          </ul>
        </div>

        <!-- Soft Skills -->
        <h2 class="section-title">Soft Skills</h2>
        <ul class="soft-skills">
          <li v-for="skill in softSkills" :key="skill.id">
            {{ skill.name }}
          </li>
        </ul>
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
/* ===== SKIllS PAGE ===== */
.main-content.skills-section {
  padding: clamp(20px, 3vw, 40px);
  min-height: 100dvh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
/* PAGE TITLE */
.about-title {
  padding: 0;
  margin: clamp(20px, 5vw, 40px) 0 0 0;
  text-align: center;
  color: #1FE7FF;
  font-size: clamp(28px, 6vw, 55px);
  font-weight: 800;
  font-family: Arial, sans-serif;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 5px 5px 5px rgba(5,5,5,0.5);
}
/* CONTENT BLOCK */
.skills-content {
  background-color: #272E37;
  border: 4px solid #1e242b;
  border-radius: clamp(10px, 2vw, 30px);
  padding: clamp(10px, 2vw, 15px) clamp(5px, 0.5vw, 10px) clamp(10px, 2vw, 15px) clamp(10px, 2vw, 30px);
  margin: clamp(10px, 2vw, 15px) clamp(5px, 20vw, 550px);
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}
/* SECTION TITLE */
.section-title {
  text-align: center;
  font-size: clamp(20px, 5vw, 35px);
  margin: clamp(5px, 1vw, 10px) 0 clamp(2px, 1vw, 5px) 0;
  font-weight: bold;
  color: #0899ec;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 5px 5px 5px rgba(5,5,5,0.5);
}
/* CATEGORY BLOCK */
.category-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 clamp(2px, 0.5vw, 5px) 0 clamp(2px, 1vw, 5px);
  padding: 0;
  color: #1FE7FF;
  line-height: 1;
}
.category-title {
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 600;
  -webkit-text-stroke: 0.5px rgb(65, 64, 64);
  text-shadow: 3px 3px 3px rgba(3,3,3,0.7);
  margin: clamp(2px, 0.5vw, 5px) 0 clamp(1px, 0.5vw, 2px) 0;
  padding: 0 clamp(5px, 1vw, 10px) 0 0;
}
.category-title .span {
  margin: 0 clamp(2px, 1vw, 10px) clamp(2px, 1vw, 10px) 0;
  font-size: clamp(14px, 2.5vw, 23px);
}
/* TAGS */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(5px, 1vw, 8px);
  width: 100%;
}
.tag {
  padding: clamp(3px, 0.5vw, 5px) clamp(8px, 1.5vw, 12px);
  border-radius: clamp(10px, 2vw, 15px);
  font-size: clamp(14px, 2vw, 22px);
  color: #f1f6f7;
  -webkit-text-stroke: 0.5px rgb(65, 64, 64);
  text-shadow: 3px 3px 3px rgba(3,3,3,0.7);
}
/* LISTS */
.skill-items,
.soft-skills {
  list-style: disc;
  margin: clamp(5px, 1vw, 8px) 0 clamp(10px, 1vw, 10px) clamp(5px, 1vw, 8px);
  color: #ffffff;
  font-size: clamp(14px, 2vw, 22px);
  line-height: 1.5;
}
/* FOOTER */
footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 1px;
  box-sizing: border-box;
}
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(20px, 4vw, 60px);
  font-size: clamp(10px, 1.2vw, 14px);
  margin: 0;
  padding: 0;
}
/* ========================= */
/* MEDIA QUERIES FOR TABLETS AND PHONES */
@media (max-width: 1280px) {
  /* ===== SKIllS PAGE ===== */
  .main-content.skills-section {
    padding: clamp(10px, 2vw, 20px) 0 clamp(10px, 2vw, 20px) 0;
  }
  /* PAGE TITLE */
  .about-title {
    margin: clamp(10px, 3vw, 30px) 0 0 0;
    text-align: center;
    color: #1FE7FF;
    font-size: clamp(18px, 4vw, 35px);
  }
  /* CONTENT BLOCK */
  .skills-content {
    padding: clamp(5px, 0.5vw, 5px) clamp(5px, 6vw, 60px);
    margin: clamp(5px, 0.5vw, 5px) clamp(5px, 20vw, 500px);
  }
  /* SECTION TITLE */
  .section-title {
    font-size: clamp(10px, 3vw, 25px);
    margin: clamp(2px, 0.5vw, 5px) 0 clamp(2px, 1vw, 5px) 0;
  }
  /* CATEGORY BLOCK */
  .category-block {
    margin: 0 clamp(2px, 0.5vw, 5px) 0 clamp(2px, 1vw, 5px);
  }
  .category-title {
    font-size: clamp(10px, 2vw, 18px);
    margin: clamp(2px, 0.5vw, 5px) 0 clamp(1px, 0.5vw, 2px) 0;
    padding: 0 clamp(5px, 1vw, 10px) 0 0;
  }
  .category-title .span {
    margin: 0 clamp(2px, 1vw, 10px) clamp(2px, 1vw, 10px) 0;
    font-size: clamp(10px, 2vw, 18px);
  }
  .tag {
    padding: clamp(3px, 0.5vw, 5px) clamp(8px, 1.5vw, 12px);
    border-radius: clamp(10px, 2vw, 15px);
    font-size: clamp(10px, 1.3vw, 20px);
  }
  /* LISTS */
  .skill-items,
  .soft-skills {
    margin: clamp(5px, 1vw, 8px) 0 clamp(10px, 1vw, 10px) clamp(5px, 1vw, 8px);
    font-size: clamp(10px, 1.5vw, 18px);
    line-height: 1.3;
  }
  /* FOOTER */
  .footer-content {
    gap: clamp(20px, 3vw, 40px);
    font-size: clamp(10px, 1.2vw, 14px);
  }
}

@media (max-width: 1024px) {
  .main-content.skills-section {
    padding: clamp(10px, 5vw, 50px) 0 clamp(10px, 2vw, 20px) 0;
  }
  .skills-content {
    margin: clamp(10px, 5vw, 15px) clamp(10px, 15vw, 150px);
  }
  .category-title {
    font-size: clamp(14px, 3vw, 22px);
  }
  .tag {
    font-size: clamp(12px, 2.5vw, 20px);
    padding: clamp(2px, 1vw, 4px) clamp(6px, 2vw, 10px);
  }
  .skill-items,
  .soft-skills {
    font-size: clamp(12px, 2.5vw, 20px);
  }
}

@media (max-width: 768px) {
  .skills-content {
    margin: clamp(8px, 4vw, 12px) clamp(8px, 5vw, 42px);
    padding: clamp(5px, 3vw, 12px);
  }
  .about-title {
    font-size: clamp(20px, 5vw, 40px);
  }
  .section-title {
    font-size: clamp(18px, 4vw, 30px);
  }
  .category-title {
    font-size: clamp(14px, 3.5vw, 20px);
  }
  .tag {
    font-size: clamp(12px, 3vw, 18px);
  }
  .skill-items,
  .soft-skills {
    font-size: clamp(12px, 3vw, 18px);
  }
}

@media (max-width: 480px) {
  .skills-content {
    margin: clamp(8px, 4vw, 12px) clamp(8px, 5vw, 42px);
    padding: clamp(3px, 2vw, 8px);
  }
  .about-title {
    margin: clamp(8px, 8vw, 82px) 0 0 0;
    font-size: clamp(16px, 6vw, 28px);
  }
  .section-title {
    font-size: clamp(14px, 5vw, 25px);
  }
  .category-title {
    font-size: clamp(12px, 4vw, 20px);
  }
  .tag {
    font-size: clamp(10px, 3.9vw, 15px);
    padding: clamp(2px, 1vw, 4px);
  }
  .skill-items,
  .soft-skills {
    font-size: clamp(10px, 4vw, 16px);
  }
}
@media (max-width: 390px) {
  .skills-content {
    margin: clamp(8px, 4vw, 12px) clamp(8px, 5vw, 42px);
    padding: clamp(3px, 2vw, 8px);
  }
  .about-title {
    margin: clamp(8px, 8vw, 82px) 0 0 0;
    font-size: clamp(16px, 6vw, 28px);
  }
  .section-title {
    font-size: clamp(14px, 5vw, 25px);
  }
  .category-title {
    font-size: clamp(12px, 4vw, 20px);
  }
  .tag {
    font-size: clamp(10px, 3.8vw, 13px);
    padding: clamp(2px, 1vw, 4px);
  }
  .skill-items,
  .soft-skills {
    font-size: clamp(10px, 4vw, 16px);
  }
}
</style>