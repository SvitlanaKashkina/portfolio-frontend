<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import bgImage from '../assets/background/about.png';

const techStack = ref([]);
const technicalSkills = ref([]);
const softSkills = ref([]);
const apiUrl = import.meta.env.VITE_API_URL

const fetchSkills = async () => {
  try {
    const response = await axios.get(`${apiUrl}/skills`);
    techStack.value = response.data.techStack;
    technicalSkills.value = response.data.technicalSkills;
    softSkills.value = response.data.softSkills;
  } catch (error) {
    console.error('Ошибка при загрузке навыков:', error);
  }
};

onMounted(() => {
  fetchSkills();
});
</script>


<template>
  <main class="main-content skills-section" :style="{ backgroundImage: `url(${bgImage})` }">
    <h1 class="about-title">Technical & Professional Skills</h1>
    <div class="skills-content">

      <!-- Tech Stack -->
      <h2 class="section-title">Tech Stack</h2>
      <div v-for="category in techStack" :key="category.id" class="category-block">
        <h3 class="category-title">{{ category.name }}:
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
    <footer>
      <div class="footer-content">
        &copy; 2026 Svitlana Kashkina. All rights reserved.
      </div>
    </footer>
  </main>
</template>


<style>
.main-content.skills-section {
  padding: 40px 20px;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.about-title {
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
.skills-content {
  background-color: #272E37;
  border: 4px solid #1e242b;
  border-radius: 3%;
  padding: 15px 0 10px 50px;
  margin: 15px 370px 30px 370px;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
}
.section-title {
  text-align: center;
  font-size: 35px;
  margin: 10px 0 5px 0;
  font-weight: bold;
  color: #0899ec;
  -webkit-text-stroke: 1px rgb(8, 8, 8);
  text-shadow: 5px 5px 5px rgba(5,5,5,0.7);
}
.category-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 25px 0 5px;
  padding: 0 0 0 10px;
  color: #1FE7FF;
}
.category-title {
  font-size: 25px;
  font-weight: 600;
  -webkit-text-stroke: 0.5px rgb(65, 64, 64);
  text-shadow: 3px 3px 3px rgba(3,3,3,0.7);
  margin: 5px 0 2px 0;
  padding: 0px 10px 0 0;
}
.category-title .span {
  margin: 0 10px 10px 0;
  font-size: 23px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
}
.tag {
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 22px;
  color: #f1f6f7;
  -webkit-text-stroke: 0.5px rgb(65, 64, 64);
  text-shadow: 3px 3px 3px rgba(3,3,3,0.7);
}
.skill-items, .soft-skills {
  list-style: disc;
  margin: 8px 0 20px 8px;
  color: #ffffFF;
  font-size: 22px;
  line-height: 1.5;
}
footer {
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 1px;
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