<script setup>
import { ref } from 'vue'
export const message = ref('')
</script>

<template>
  <div v-if="message" class="error-banner">
    ⚠️ {{ message }}
  </div>
</template>

<style scoped>
.error-banner {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4d4f;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
}
</style>