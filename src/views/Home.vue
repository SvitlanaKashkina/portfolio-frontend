<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// состояние профиля
const profile = ref(null);

// для вывода всего JSON внизу на странице и в консоль
const debugData = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`);

    // выводим данные в консоль
    console.log("Полученный профиль:", response.data);

    // сохраняем в переменную для шаблона
    profile.value = response.data;

    // для наглядного отображения JSON на странице
    debugData.value = JSON.stringify(response.data, null, 2);

  } catch (error) {
    console.error("Ошибка при загрузке профиля:", error);

    // выводим ошибку и её детали на страницу
    debugData.value = `Ошибка при загрузке профиля: ${error.message}`;
  }
});
</script>


<template>
  <div>
    <h1>Home Page</h1>

    <h2>Данные профиля:</h2>
    <div v-if="profile">
      <p><strong>Full Name:</strong> {{ profile.fullName }}</p>
      <p><strong>Role:</strong> {{ profile.role }}</p>
      <p><strong>Short Bio:</strong> {{ profile.shortBio }}</p>
      <p><strong>About Text:</strong> {{ profile.aboutText }}</p>
      <p><strong>Location:</strong> {{ profile.location }}</p>
      <p><strong>Email:</strong> {{ profile.email }}</p>
      <p><strong>GitHub:</strong> <a :href="profile.githubUrl" target="_blank">{{ profile.githubUrl }}</a></p>
      <p><strong>LinkedIn:</strong> <a :href="profile.linkedinUrl" target="_blank">{{ profile.linkedinUrl }}</a></p>
    </div>
    <div v-else>
      <p>Загрузка данных...</p>
    </div>

  </div>
</template>


<style scoped>
div {
  margin: 10px;
}
pre {
  background-color: #f0f0f0;
  padding: 10px;
  overflow-x: auto;
}
</style>
