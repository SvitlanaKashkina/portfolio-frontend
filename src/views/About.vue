<script setup>
  import Navbar from '../components/Navbar.vue'
  import Footer from '../components/Footer.vue'
</script>


<template>
  <Navbar />
  <main class="main-content about-section">

    <!-- Основной контейнер: слева текст, справа фото -->
    <div class="about-content debug-border">

      <!-- Заголовок страницы -->
      <h1 class="about-title">About Me</h1>

      <!-- Контейнер для текста и фото -->
      <div class="about-body">

          <!-- Левая часть: текст -->
          <div class="about-text debug-border">
            <h2>Über mich</h2>
            <p>
              Mein Name ist Svitlana Kashkina. Ich bin Java-Softwareentwicklerin mit Schwerpunkt auf Backend- und Fullstack-Technologien. Ich habe bereits erste praktische Erfahrungen in der Entwicklung von Mobile- und Webanwendungen gesammelt. Ich liebe es, reale Probleme durch sauberen Code und effizientes Systemdesign zu lösen. Getrieben von Neugier und Teamarbeit, beteilige ich mich aktiv an technischen Projekten und Weiterbildungen, um meine Fähigkeiten anzuwenden und auszubauen. Mein Ziel ist es, zuverlässige Backend-Lösungen in modernen Anwendungen zu entwickeln.
            </p>

            <h2>Berufserfahrung</h2>
            <p>
              Mein beruflicher Weg begann in einem Sportverein als Assistentin der Geschäftsführung. Später habe ich in mehreren Banken gearbeitet und vielfältige Erfahrungen gesammelt. Nach meiner Ankunft in Deutschland wurden meine Diplome leider nicht anerkannt, sodass ich mich für eine neue berufliche Richtung entschied und die Umschulung zur Fachinformatikerin für Anwendungsentwicklung begann. Während meiner Umschulung absolvierte ich eine neunmonatige Praxis bei der Schlote Holding GmbH und arbeitete parallel an eigenen Projekten, wodurch ich erste praktische Erfahrungen in der Full-Stack-Softwareentwicklung sammeln konnte. Dabei habe ich mit Technologien wie Java, Spring Boot, Hibernate, React Native (Expo), Vue.js, Docker usw. gearbeitet. Diese Erfahrungen haben mir geholfen, den gesamten Entwicklungsprozess von mobilen und Webanwendungen zu verstehen – von der Konzeption über die Implementierung bis hin zum Testing und Deployment.
            </p>

            <h2>Bildung</h2>
            <p>
              In der Ukraine habe ich zwei Studiengänge abgeschlossen: zuerst einen Bachelor in Rechtswissenschaften und anschließend Accounting und Auditing. Mit der Zeit wurde mir jedoch klar, dass dieser Beruf nicht unbedingt das ist, was ich mein ganzes Leben lang machen möchte. Deshalb habe ich mich für eine Umschulung zur Fachinformatikerin für Anwendungsentwicklung entschieden. Während meiner ersten praktischen Erfahrungen, sowohl während der Praxis als auch bei eigenen Projekten, wurde mir bewusst, dass ich die richtige Wahl getroffen habe. Es bereitet mir große Freude, Code zu schreiben und Programme zu entwickeln, und solche Aufgaben in diesem Beruf inspirieren mich jeden Tag.
            </p>

            <h2 class="section-title">Zertifikate</h2>
              <!-- Список сертификатов -->
            <ul class="certificates-list">
                <li>Java – Complete Java Course, Udemy</li>
                <li>Spring Boot – Development Java web applications, Udemy</li>
                <li>Docker & Kubernetes – The complete practical guide, Udemy</li>
                <li>The complete Apache Kafka practical guide, Udemy</li>
                <li>Git und GitHub, LinkedIn</li>
                <li>IntelliJ IDEA Grundkurs, LinkedIn</li>
                <li>Visual Studio Code Grundkurs, LinkedIn</li>
                <li>Fachfrau für Projektmanagement, DEKRA</li>
            </ul>

            <h2>Hobbys und Interessen</h2>
            <p>
              Schon seit meiner Kindheit bin ich sehr körperlich aktiv und neugierig. Ich liebe Sport und Bewegung, deshalb jogge ich regelmäßig und spiele leidenschaftlich gerne Tennis. Ich reise außerdem unglaublich gern. Neue Länder, Kulturen und Menschen kennenzulernen erweitert meinen Horizont und inspiriert mich. Diese Erfahrungen bereichern nicht nur mein Leben, sondern geben mir auch neue Perspektiven und Ideen, die ich in meine Arbeit und meinen Alltag einfließen lasse.
            </p>
          </div>

          <!-- Правая часть: фото -->
          <div class="about-photos debug-border">
          <!-- <img src="@/assets/photo1.jpg" alt="Foto 1" />
            <img src="@/assets/photo2.jpg" alt="Foto 2" /> -->
          </div>
      </div>
    </div>
  </main>

  <Footer />
</template>


<style scoped>
.debug-border {
  border: 2px dashed #ffffff; /* белый пунктир */
}
/* Стили только для About-page, чтобы не ломать глобальные main */
.about-section {
  color: #ffffff;
  padding: 40px 20px;
}
.about-content {
  background-color: #2c3340; /* цвет блока */
  color: #ffffff;
  padding: 0px 20px 0 20px;
  margin: 50px 100px 100px 100px;
  display: flex;
  flex-direction: column; /* дети идут сверху вниз */
  gap: 40px;
}

.about-title {
  padding: 0;
  margin: 15px 0 0 0;
  text-align: center;
  font-size: 2.5rem;
}

.about-body {
  display: flex;       /* горизонтальное расположение текста и фото */
  gap: 40px;
  flex-wrap: wrap;     /* адаптация на маленьких экранах */
}

.about-text {
  flex: 1;
  min-width: 250px;
}

.about-photos {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-photos img {
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  object-fit: cover;
}
</style>
