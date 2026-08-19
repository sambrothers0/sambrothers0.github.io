<template>
    <div id="nav-bar">
        <button @click="navigateHome" class="nav-button"
            :class="{ active: activePath === '/' }">
            Home
        </button>
        <button @click="navigateAbout" class="nav-button"
            :class="{ active: activePath === '/about' }">
            About
        </button>
        <button @click="navigateProjects" class="nav-button"
            :class="{ active: activePath === '/projects' }">
            Projects
        </button>
        <button @click="navigateContact" class="nav-button"
            :class="{ active: activePath === '/contact' }">
            Contact
        </button>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'NaviagationBar',
  methods: {
    navigateHome () {
      this.$router.push('/')
    },
    navigateAbout () {
      this.$router.push('/about')
    },
    navigateProjects () {
      this.$router.push('/projects')
    },
    navigateContact () {
      this.$router.push('/contact')
    }
  },
  computed: {
    activePath () {
      const known = ['/', '/about', '/projects', '/contact']
      return known.includes(this.route.path) ? this.route.path : '/'
    }
  },
  setup () {
    const route = useRoute()

    return {
      route
    }
  }
})
</script>

<style scoped lang="scss">
#nav-bar {
  border-radius: var(--radius-pill);
  /* the banner paints the pill's scrim + blur onto a ::before layer; the
     stacking context keeps that layer behind the buttons without letting it
     escape underneath the banner's own backing */
  position: relative;
  z-index: 0;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  color: var(--bar-text);
  height: 50%;
  margin: 0.4vw;
  padding: 0 1.4vw;
  white-space: nowrap;
  background-color: transparent;
  cursor: pointer;
  border-radius: var(--radius-pill);
  transition: background-color var(--dur-med) ease,
              border-color var(--dur-med) ease;
  font-size: clamp(0.8rem, 2vh, 1.05rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  font-family: 'Niramit', sans-serif;
}
/* the bar is inverted against the page, so its accent rung is too.
   the border ring belongs to the active tab alone — hover never
   touches it, so pointing at a tab can't be mistaken for being on it */
.nav-button.active {
  border-color: var(--bar-accent);
}
.nav-button:hover {
  background-color: var(--bar-accent-soft);
}
</style>
