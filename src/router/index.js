import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import CreationsView from '@/views/CreationsView.vue'
import ContactView from '@/views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home | Sam Brothers | Software Developer' }

  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About | Sam Brothers | Software Developer' }

  },
  {
    path: '/creations',
    name: 'creations',
    component: CreationsView,
    meta: { title: 'Creations | Sam Brothers | Software Developer' }

  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact | Sam Brothers | Software Developer' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'
  next()
})

export default router
