<template>
    <div id="nav-bar">
        <button @click="navigateHome" class="nav-button" id="bar-home-button">
            Home
        </button>
        <button @click="navigateAbout" class="nav-button" id="bar-about-button">
            About
        </button>
        <button @click="navigateCreations" class="nav-button" id="bar-creations-button">
            Creations
        </button>
        <button @click="navigateContact" class="nav-button" id="bar-contact-button">
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
    checkAppearance () {
      this.isDarkMode ? this.darkMode() : this.lightMode()
    },
    lightMode () {
      document.getElementById('bar-home-button').style.color = 'var(--light-color)'
      document.getElementById('bar-about-button').style.color = 'var(--light-color)'
      document.getElementById('bar-creations-button').style.color = 'var(--light-color)'
      document.getElementById('bar-contact-button').style.color = 'var(--light-color)'
    },
    darkMode () {
      document.getElementById('bar-home-button').style.color = 'var(--dark-color)'
      document.getElementById('bar-about-button').style.color = 'var(--dark-color)'
      document.getElementById('bar-creations-button').style.color = 'var(--dark-color)'
      document.getElementById('bar-contact-button').style.color = 'var(--dark-color)'
    },
    updateNavBar () {
      var highlighted = this.currentButton // set all to transparent, then set current button
      document.getElementById('bar-home-button').style.border = 'transparent'
      document.getElementById('bar-about-button').style.border = 'transparent'
      document.getElementById('bar-creations-button').style.border = 'transparent'
      document.getElementById('bar-contact-button').style.border = 'transparent'
      highlighted.style.border = '2px solid var(--indigo-color)'
    },
    navigateHome () {
      this.$router.push('/')
    },
    navigateAbout () {
      this.$router.push('/about')
    },
    navigateCreations () {
      this.$router.push('/creations')
    },
    navigateContact () {
      this.$router.push('/contact')
    }
  },
  computed: {
    isDarkMode () {
      return this.$store.getters.isDarkModeOn
    },
    currentButton () { // return currently highlighted button
      if (this.route.path === '/') {
        return document.getElementById('bar-home-button')
      } else if (this.route.path === '/about') {
        return document.getElementById('bar-about-button')
      } else if (this.route.path === '/creations') {
        return document.getElementById('bar-creations-button')
      } else if (this.route.path === '/contact') {
        return document.getElementById('bar-contact-button')
      } else if (this.route.path === '/resume') {
        return document.getElementById('bar-contact-button')
      } else {
        return document.getElementById('bar-home-button')
      }
    }
  },
  watch: {
    isDarkMode (newVal) {
      newVal ? this.darkMode() : this.lightMode()
    }
  },
  mounted () {
    this.checkAppearance()
    this.updateNavBar()
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
  border-radius: 50px;
  display: flex;
  height: 100%;
  width: 0vw;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.nav-button {
  display: flex;
  justify-content: center;
  align-items: center;
  border: transparent;
  height: 50%;
  margin: 1vw;
  padding: 1vw;
  box-sizing: border-box;
  background-color: transparent;
  cursor: pointer;
  border-radius: 40px;
  transition: color 0.3s ease, background-color 0.3s ease;
  font-size: 2vh;
  font-weight: 700;
  font-family: 'Niramit', sans-serif;
}
.nav-button:hover {
  background-color: #3a419877;  //indigo color but transparent
}
</style>
