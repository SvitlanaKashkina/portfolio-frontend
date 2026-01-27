import { createApp } from 'vue'
import { message } from './components/ErrorBanner.vue'
import './style.css'
import App from './App.vue'
import router from './router';
import store from './stores'

const app = createApp(App)

// Global Error Handling (messages in German)
app.config.errorHandler = (err, instance, info) => {
  console.error('Fehler im Vue-Komponenten:', instance)
  console.error('Fehler-Info:', info)
  console.error('Tatsächlicher Fehler:', err)

  message.value = 'Es ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu.'
  setTimeout(() => message.value = '', 5000)
}

// Catch unhandled Promise rejections
window.onunhandledrejection = (event) => {
  console.error('Unbehandeltes Promise:', event.reason)
  message.value = 'Fehler beim Ausführen der Anfrage. Bitte versuchen Sie es erneut.'
  setTimeout(() => message.value = '', 5000)
}

// Catch global JS errors
window.onerror = (messageStr, source, lineno, colno, error) => {
  console.error('Globale JS-Fehler:', messageStr, error)
  message.value = 'Es ist ein Fehler auf der Seite aufgetreten. Bitte laden Sie die Seite neu.'
  setTimeout(() => message.value = '', 5000)
}

// Use plugins and mount the app
app.use(router)
app.use(store)
app.mount('#app')