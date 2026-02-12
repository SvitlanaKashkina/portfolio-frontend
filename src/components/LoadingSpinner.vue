<script setup>
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="spinner-overlay" v-if="visible">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #272E37;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  pointer-events: all;
}
.spinner {
  border: clamp(3px, 0.5vw, 6px) solid #f3f3f3;
  border-top: clamp(3px, 0.5vw, 6px) solid #1FE7FF;
  border-radius: 50%;
  width: clamp(30px, 5vw, 60px);
  height: clamp(30px, 5vw, 60px);
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
