import { createWebHistory } from 'vue-router'
import { createSiteApp } from './app'

/* The page arrives with markup already in #app, rendered at build time by
   scripts/prerender.js so crawlers and link previews see real content. A
   plain mount (not hydration) replaces it with the live app, so nothing in the
   components has to render identically on the server. */
const { app, router } = createSiteApp(createWebHistory())

router.isReady().then(() => app.mount('#app'))
