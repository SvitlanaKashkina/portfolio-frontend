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
  top: clamp(5px, 2vh, 15px);
  left: 50%;
  transform: translateX(-50%);
  background: #ff4d4f;
  color: white;
  padding: clamp(6px, 1.5vw, 12px) clamp(12px, 4vw, 24px);
  border-radius: 5px;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  font-weight: bold;
  font-size: clamp(12px, 2vw, 16px);
  max-width: 90%;
  text-align: center;
  word-break: break-word;
}
</style>