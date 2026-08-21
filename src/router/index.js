import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import ResumeView from '@/views/ResumeView.vue'
import NotesView from '@/views/NotesView.vue'
import NoteView from '@/views/NoteView.vue'
import NotFound from '@/views/NotFound.vue'
import { pages } from '@/content/notes'

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
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    meta: { title: 'Projects | Sam Brothers | Software Developer' }

  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact | Sam Brothers | Software Developer' }
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumeView,
    meta: { title: 'Resume | Sam Brothers | Software Developer' }
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    meta: { title: 'Notes | Sam Brothers | Software Developer' }
  },
  {
    /* Only the markdown notes have a page of their own; the short ones live
       entirely in the list. A slug that is neither renders the 404 rather than
       an empty article, and it keeps the bad URL so the address bar still
       shows what was asked for. NoteView sets the real title once it knows the
       note. */
    path: '/notes/:slug',
    name: 'note',
    component: NoteView,
    meta: { title: 'Notes | Sam Brothers | Software Developer' },
    beforeEnter: to => {
      const exists = pages.some(page => page.slug === to.params.slug)
      return exists ? true : { name: 'NotFound', params: { pathMatch: to.path.slice(1).split('/') } }
    }
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound,
    meta: { title: 'Page not found | Sam Brothers | Software Developer'}
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default Title'
  if (from.matched.length) {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }
  next()
})

export default router
