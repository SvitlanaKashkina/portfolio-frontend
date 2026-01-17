<template>
  <nav class="navbar">
    <div class="nav-left">
      <a href="#home" class="name">Svitlana Kashkina</a>
    </div>
    <ul class="nav-right">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/skills">Skills</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  position: relative;
}
.nav-left .name {
  text-decoration: none;
  color: white;
  font-size: 23px;
  font-weight: bold;
  margin: 0 0 0 35px;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 30px;
  list-style: none;
  margin: 0 25px 0 0;
  padding: 0;
}
.nav-right a {
  text-decoration: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 0 15px;
  margin: 0;
  line-height: 1;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.nav-right a:hover {
  background-color: rgba(31, 231, 255, 0.15);
  color: #1FE7FF;
}
.nav-right li:not(:last-child)::after {
  content: "";
  height: 25px;
  width: 1px;
  background-color: #00f6ff;
  display: inline-block;
  margin-left: 30px;
}
.navbar::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 2cm;
  right: 2cm;
  height: 2px;
  background-color: #00f6ff;
  border-radius: 2px;
}
</style>