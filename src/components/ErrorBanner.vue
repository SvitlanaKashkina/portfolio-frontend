<script setup>
import { ref } from 'vue'

const message = ref('')

defineExpose({ message })
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
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  font-weight: bold;
  font-size: 14px;
}
</style>