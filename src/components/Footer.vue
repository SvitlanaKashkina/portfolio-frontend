<template>
  <footer>
    <div class="footer-content">
        &copy; 2026 Svitlana Kashkina. All rights reserved.
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(5px, 2vh, 20px) 0;
  box-sizing: border-box;
  background-color: #272E37;
}
footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: clamp(20px, 5vw, 80px);
  right: clamp(20px, 5vw, 80px);
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(20px, 7vw, 70px);
  font-size: clamp(0.7rem, 1.6vw, 0.9rem);
  text-align: center;
}
</style>