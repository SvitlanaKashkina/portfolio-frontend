<template>
  <footer>
    <div class="footer-content">
      <span>2026 Svitlana Kashkina</span>
      <span>&copy; All rights reserved</span>
    </div>
  </footer>
</template>

<style scoped>
footer {
  position: relative;
  align-items: center;
  justify-content: center;
  padding:  2px 0 3px 0;
  height: 40px;
  box-sizing: border-box;
  background-color: #272E37;
}
footer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 5rem;
  right: 5rem;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.2);
}
.footer-content {
  display: flex;
  justify-content: center;
  gap: clamp(40px, 8vw, 100px);
  font-size: 0.8rem;
  margin-top: 0.8%;
}
</style>