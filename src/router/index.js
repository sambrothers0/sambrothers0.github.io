import { createRouter } from 'vue-router'
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
    meta: { title: 'Home | Sam Brothers | Software Developer',
      description: 'Sam Brothers is a software developer in Chapel Hill, NC, building front-end, full-stack, and data projects. William & Mary computer science graduate.' }

  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { title: 'About | Sam Brothers | Software Developer',
      description: 'Who Sam Brothers is as a software developer: how he approaches code quality, learning, and building for the people who use the software.' }

  },
  {
    path: '/projects',
    name: 'projects',
    component: ProjectsView,
    meta: { title: 'Projects | Sam Brothers | Software Developer',
      description: 'Software projects by Sam Brothers: web apps, data tools, games, and data structures, with links to the code on GitHub.' }

  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: { title: 'Contact | Sam Brothers | Software Developer',
      description: 'Get in touch with Sam Brothers, software developer in Chapel Hill, NC, by email, LinkedIn, or GitHub.' }
  },
  {
    path: '/resume',
    name: 'resume',
    component: ResumeView,
    meta: { title: 'Resume | Sam Brothers | Software Developer',
      description: 'The resume of Sam Brothers, software developer: experience, projects, skills, and William & Mary degrees in computer science and business analytics.' }
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    meta: { title: 'Notes | Sam Brothers | Software Developer',
      description: 'Notes by Sam Brothers on software development, the job search, games, and art.' }
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

/* A factory rather than one shared router: the browser gets web history, and
   the build-time prerender (src/entry-server.js) gets memory history, a fresh
   router per page it renders. */
export function createSiteRouter (history) {
  const router = createRouter({ history, routes })

  router.beforeEach((to, from, next) => {
    // the prerender has no document; it writes the title into the HTML itself
    if (typeof document !== 'undefined') {
      document.title = to.meta.title || 'Sam Brothers | Software Developer'
      if (from.matched.length) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
    }
    next()
  })

  return router
}
