import { createApp } from 'vue'
import App from './App.vue'
import { createSiteRouter } from './router'
import store from './store/index.js'
import './assets/styles/main.css'

/* Shared by the browser entry (main.js) and the build-time prerender
   (entry-server.js); each passes the history that suits it. */
export function createSiteApp (history) {
  const router = createSiteRouter(history)
  const app = createApp(App).use(store).use(router)
  return { app, router }
}
