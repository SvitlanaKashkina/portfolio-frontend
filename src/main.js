import { createApp } from 'vue'
import ErrorBanner from './components/ErrorBanner.vue'
import './style.css'
import App from './App.vue'
import router from './router';

const app = createApp(App)

// Create a link to a message from a banner.
const { message } = ErrorBanner.__isScriptSetup ? ErrorBanner.__setupState : { message: null }

// global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue error:', err)
  if (message) {
    message.value = 'Ein Fehler ist aufgetreten. Bitte lade die Seite neu.'
    setTimeout(() => message.value = '', 5000)
  }
}

window.onunhandledrejection = (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  if (message) {
    message.value = 'Fehler beim Ausführen der Anfrage. Bitte versuchen Sie es erneut.'
    setTimeout(() => message.value = '', 5000)
  }
}

window.onerror = (msg, source, lineno, colno, error) => {
  console.error('Global JS error:', msg, error)
  if (message) {
    message.value = 'Es ist ein Fehler auf der Seite aufgetreten. Bitte laden Sie die Seite neu.'
    setTimeout(() => message.value = '', 5000)
  }
}

app.use(router)
app.mount('#app')